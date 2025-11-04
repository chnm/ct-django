# crawler/services.py
import logging
import os
from urllib.parse import urlparse

import backoff
import requests
from django.conf import settings
from django.core.files.base import ContentFile
from ratelimit import limits, sleep_and_retry

from .models import StagedMuseumItem

logger = logging.getLogger(__name__)


class MuseumAPIClient:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update(
            {
                "User-Agent": "threadbare/0.1",
                "Accept": "application/json",
            }
        )

    @sleep_and_retry
    @limits(calls=100, period=60)
    @backoff.on_exception(
        backoff.expo, (requests.exceptions.RequestException), max_tries=10
    )
    def fetch_cooper_hewitt(self):
        logger.info("Starting Cooper-Hewitt fetch process...")

        # Log the URL construction
        url = (
            "https://api.collection.cooperhewitt.org/rest/"
            "?method=cooperhewitt.exhibitions.getObjects"
            f"&access_token={settings.COOPER_HEWITT_API_KEY}"
            "&query=Connecting%20Threads"
        )
        logger.info(
            f"Making request to Cooper-Hewitt API at: {url.replace(settings.COOPER_HEWITT_API_KEY, '[REDACTED]')}"
        )

        try:
            # Log the request start
            logger.info("Sending request to Cooper-Hewitt API...")
            response = self.session.get(url)
            logger.info(f"Received response with status code: {response.status_code}")

            # Check response status
            response.raise_for_status()

            # Parse JSON response
            logger.info("Parsing JSON response...")
            data = response.json()
            total_items = len(data.get("objects", []))
            logger.info(f"Found {total_items} items in response")

            items_created = 0
            items_updated = 0
            items_errored = 0

            # Process each item
            logger.info("Beginning to process items...")
            for index, item in enumerate(data.get("objects", []), 1):
                try:
                    logger.debug(
                        f"Processing item {index}/{total_items} (ID: {item.get('id')})"
                    )

                    # Get image URLs
                    images = item.get("images", [])
                    thumbnail_url = ""
                    if images:
                        # Get the first image's thumbnail (size 'sq' is usually thumbnail)
                        first_image = images[0]
                        if "sq" in first_image:
                            thumbnail_url = first_image["sq"]["url"]
                        elif "z" in first_image:
                            thumbnail_url = first_image["z"]["url"]
                    
                    # Prepare image download
                    image_file = None
                    if thumbnail_url:
                        filename = f"{item.get('id', 'unknown')}.jpg"
                        image_file = self.download_image(thumbnail_url, filename)

                    # Prepare the default values
                    defaults = {
                        "title": item.get("title", ""),
                        "date": item.get("date", ""),
                        "description": item.get("description", ""),
                        "item_type": item.get("type", ""),
                        "medium": item.get("medium", ""),
                        "url": item.get("url", ""),
                        "country": item.get("country", ""),
                        "archive": "Cooper-Hewitt, Smithsonian Design Museum",
                        "manifest": "",  # Cooper-Hewitt doesn't seem to have IIIF manifests
                        "thumbnail": thumbnail_url,
                        "api_response": item,
                        "is_reviewed": False,
                        "published": False,
                    }

                    # Use update_or_create to either update existing or create new
                    staged_item, created = StagedMuseumItem.objects.update_or_create(
                        id=item.get("id"), defaults=defaults
                    )

                    # Save the image if we have one
                    if image_file:
                        try:
                            staged_item.image.save(image_file.name, image_file, save=False)
                            logger.info(f"Successfully saved image for {item.get('id')}")
                        except Exception as e:
                            logger.error(f"Failed to save image for {item.get('id')}: {str(e)}")

                    # Update review notes after we know if it was created or updated
                    staged_item.review_notes = (
                        "Initial fetch from API" if created else "Data updated from API"
                    )
                    staged_item.save()

                    if created:
                        items_created += 1
                        logger.info(f"Created new item: {item.get('id')} - {item.get('title', 'No title')}")
                    else:
                        items_updated += 1
                        logger.info(
                            f"Updated existing item: {item.get('id')} - {item.get('title', 'No title')}"
                        )

                except Exception as e:
                    items_errored += 1
                    logger.error(
                        f"Error processing item {item.get('id', 'unknown ID')}: {str(e)}"
                    )
                    continue

            # Log final summary
            logger.info("Cooper-Hewitt fetch complete:")
            logger.info(f"- Items created: {items_created}")
            logger.info(f"- Items updated: {items_updated}")
            logger.info(f"- Items errored: {items_errored}")
            logger.info(f"- Total processed: {items_created + items_updated}")

            return items_created, items_updated

        except requests.exceptions.RequestException as e:
            logger.error(f"HTTP Request failed: {str(e)}")
            raise
        except ValueError as e:
            logger.error(f"JSON parsing failed: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error during fetch: {str(e)}")
            raise

    def download_image(self, image_url, filename):
        """
        Download an image from a URL and return a Django ContentFile
        """
        try:
            logger.info(f"Downloading image from: {image_url}")
            response = self.session.get(image_url, timeout=30)
            response.raise_for_status()
            
            # Create a ContentFile from the image data
            return ContentFile(response.content, name=filename)
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to download image {image_url}: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error downloading image {image_url}: {str(e)}")
            return None

    @sleep_and_retry
    @limits(calls=100, period=60)
    @backoff.on_exception(
        backoff.expo, (requests.exceptions.RequestException), max_tries=10
    )
    def fetch_vam(self):
        logger.info("Starting V&A Museum fetch process...")

        # Construct the URL with parameters
        base_url = "https://api.vam.ac.uk/v2/objects/search"
        params = {
            "id_category": "THES381162", #ConnThreads project tag
            "order_sort": "asc",
            "page": 1,
            "page_size": 100,
        }
        logger.info(f"Making request to V&A API at: {base_url} with params: {params}")

        try:
            # Log the request start
            logger.info("Sending request to V&A API...")
            response = self.session.get(base_url, params=params)
            logger.info(f"Received response with status code: {response.status_code}")

            # Check response status
            response.raise_for_status()

            # Parse JSON response
            logger.info("Parsing JSON response...")
            data = response.json()
            total_items = len(data.get("records", []))
            logger.info(f"Found {total_items} items in response")

            items_created = 0
            items_updated = 0
            items_errored = 0

            # Process each item
            logger.info("Beginning to process items...")
            for index, record in enumerate(data.get("records", []), 1):
                try:
                    logger.debug(
                        f"Processing item {index}/{total_items} (ID: {record.get('systemNumber')})"
                    )

                    # Extract fields safely with get() to handle potential missing data
                    object_type = (
                        record.get("clusters", {})
                        .get("object_type", {})
                        .get("terms", [{}])[0]
                        .get("value", "")
                        if record.get("clusters")
                        else ""
                    )

                    material = (
                        record.get("clusters", {})
                        .get("material", {})
                        .get("terms", [{}])[0]
                        .get("value", "")
                        if record.get("clusters")
                        else ""
                    )

                    place = (
                        record.get("clusters", {})
                        .get("place", {})
                        .get("terms", [{}])[0]
                        .get("value", "")
                        if record.get("clusters")
                        else ""
                    )

                    # Construct V&A collections item page URL
                    url = f"https://collections.vam.ac.uk/item/{record['systemNumber']}/"
                    
                    # Get manifest and thumbnail URLs
                    manifest_url = record.get("_images", {}).get("_iiif_presentation_url", "")
                    thumbnail_url = record.get("_images", {}).get("_primary_thumbnail", "")
                    
                    # Prepare image download
                    image_file = None
                    if thumbnail_url:
                        # Use the thumbnail URL directly as it's more reliable
                        filename = f"{record['systemNumber']}.jpg"
                        image_file = self.download_image(thumbnail_url, filename)
                    
                    # Prepare the default values
                    defaults = {
                        "title": record.get("_primaryTitle", ""),
                        "date": record.get("_primaryDate", ""),
                        "item_type": object_type,
                        "medium": material,
                        "url": url,
                        "country": place,
                        "archive": "Victoria and Albert Museum",
                        "manifest": manifest_url,
                        "thumbnail": thumbnail_url,
                        "api_response": record,
                        "is_reviewed": False,
                        "published": False,
                    }

                    # Use update_or_create to either update existing or create new
                    staged_item, created = StagedMuseumItem.objects.update_or_create(
                        id=record["systemNumber"], defaults=defaults
                    )

                    # Save the image if we have one
                    if image_file:
                        try:
                            staged_item.image.save(image_file.name, image_file, save=False)
                            logger.info(f"Successfully saved image for {record['systemNumber']}")
                        except Exception as e:
                            logger.error(f"Failed to save image for {record['systemNumber']}: {str(e)}")

                    # Update review notes after we know if it was created or updated
                    staged_item.review_notes = (
                        "Initial fetch from API" if created else "Data updated from API"
                    )
                    staged_item.save()

                    if created:
                        items_created += 1
                        logger.info(
                            f"Created new item: {record['systemNumber']} - {defaults['title']}"
                        )
                    else:
                        items_updated += 1
                        logger.info(
                            f"Updated existing item: {record['systemNumber']} - {defaults['title']}"
                        )

                except Exception as e:
                    items_errored += 1
                    logger.error(
                        f"Error processing item {record.get('systemNumber', 'unknown ID')}: {str(e)}"
                    )
                    continue

            # Log final summary
            logger.info("V&A fetch complete:")
            logger.info(f"- Items created: {items_created}")
            logger.info(f"- Items updated: {items_updated}")
            logger.info(f"- Items errored: {items_errored}")
            logger.info(f"- Total processed: {items_created + items_updated}")

            return items_created, items_updated

        except requests.exceptions.RequestException as e:
            logger.error(f"HTTP Request failed: {str(e)}")
            raise
        except ValueError as e:
            logger.error(f"JSON parsing failed: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error during fetch: {str(e)}")
            raise
