# crawler/services.py
import logging

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

    CH_API = "https://api.cooperhewitt.org/"
    CH_FIELDS = (
        "id collectionsOnlineId summary title name date medium description "
        "classification geography multimedia identifier"
    )

    @sleep_and_retry
    @limits(
        calls=1, period=2
    )  # ponytail: unkeyed limit is 1/s and 30/min; relax once we hold an access key
    @backoff.on_exception(
        backoff.expo, (requests.exceptions.RequestException), max_tries=5
    )
    def _ch_query(self, query):
        response = self.session.post(self.CH_API, json={"query": query}, timeout=60)
        response.raise_for_status()
        data = response.json()
        if data.get("errors"):
            raise ValueError(f"Cooper Hewitt API: {data['errors'][0].get('message')}")
        return data

    def _ch_records(self):
        """Yield object records: every match of COOPER_HEWITT_QUERY, or, when
        that is unset, a refresh of the Cooper Hewitt items already staged."""
        if settings.COOPER_HEWITT_QUERY:
            page = 0
            while True:
                data = self._ch_query(
                    f"{{ object({settings.COOPER_HEWITT_QUERY}, size:100, page:{page}) "
                    f"{{ {self.CH_FIELDS} }} }}"
                )
                yield from data["data"]["object"]
                page += 1
                if page >= data["extensions"]["pagination"]["number_of_pages"]:
                    return
        ids = list(
            StagedMuseumItem.objects.filter(archive__startswith="Cooper").values_list(
                "id", flat=True
            )
        )
        for start in range(0, len(ids), 50):
            aliases = " ".join(
                f'o{n}: object({"id" if pk.startswith("object-") else "collectionsOnlineId"}:"{pk}") '
                f"{{ {self.CH_FIELDS} }}"
                for n, pk in enumerate(ids[start : start + 50])
            )
            for hits in self._ch_query(f"{{ {aliases} }}")["data"].values():
                yield from hits

    @staticmethod
    def _ch_defaults(record):
        """Map a GraphQL object record onto StagedMuseumItem fields."""

        def values(items):
            out = []
            for x in items or []:
                v = x.get("value") if isinstance(x, dict) else x
                if v:
                    out.append(str(v))
            return out

        def first(items):
            return next(iter(values(items)), "")

        summary = record.get("summary") or {}
        geo = record.get("geography")
        geo = geo if isinstance(geo, dict) else {}
        media = (record.get("multimedia") or [{}])[0] or {}
        classification = (record.get("classification") or [{}])[0] or {}
        accession = next(
            (
                i["value"]
                for i in record.get("identifier") or []
                if i.get("type") == "accession number"
            ),
            "",
        )
        thumbnail = (media.get("preview") or {}).get("url", "")
        return {
            "title": summary.get("title")
            or first(record.get("title"))
            or first(record.get("name")),
            "date": first(record.get("date")),
            "description": "\n\n".join(values(record.get("description"))),
            "item_type": (
                (classification.get("summary") or {}).get("title")
                or first(record.get("name"))
            )[:100],
            "medium": ", ".join(values(record.get("medium")))[:100],
            "url": f"https://www.si.edu/object/chndm_{accession}" if accession else "",
            "country": (
                (geo.get("country") or {}).get("value") or geo.get("name") or ""
            )[:100],
            "archive": "Cooper-Hewitt, Smithsonian Design Museum",
            "manifest": "",
            "thumbnail": thumbnail,
            "image_url": (media.get("large") or {}).get("url") or thumbnail,
            "api_response": record,
            "is_reviewed": False,
            "published": False,
        }

    def fetch_cooper_hewitt(self):
        logger.info("Starting Cooper-Hewitt fetch process...")
        items_created = items_updated = items_errored = 0

        for record in self._ch_records():
            pk = record.get("collectionsOnlineId") or record.get("id")
            try:
                defaults = self._ch_defaults(record)
                image_url = defaults.pop("image_url")
                image_file = (
                    self.download_image(image_url, f"{pk}.jpg") if image_url else None
                )

                staged_item, created = StagedMuseumItem.objects.update_or_create(
                    id=pk, defaults=defaults
                )
                if image_file:
                    staged_item.image.save(image_file.name, image_file, save=False)
                staged_item.review_notes = (
                    "Initial fetch from API" if created else "Data updated from API"
                )
                staged_item.save()

                if created:
                    items_created += 1
                else:
                    items_updated += 1
                logger.info(
                    f"{'Created' if created else 'Updated'} {pk} - {defaults['title']}"
                )
            except Exception as e:
                items_errored += 1
                logger.error(f"Error processing Cooper-Hewitt item {pk}: {e!s}")

        logger.info(
            f"Cooper-Hewitt fetch complete. Created: {items_created}, "
            f"Updated: {items_updated}, Errors: {items_errored}"
        )
        return items_created, items_updated

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
            logger.error(f"Failed to download image {image_url}: {e!s}")
            return None
        except Exception as e:
            logger.error(f"Unexpected error downloading image {image_url}: {e!s}")
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
            "id_category": "THES381162",  # ConnThreads project tag
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

                    # Search hits carry no clusters/description; pull the full
                    # object record for physicalDescription and materials.
                    try:
                        full = (
                            self.session.get(
                                f"https://api.vam.ac.uk/v2/object/{record['systemNumber']}"
                            )
                            .json()
                            .get("record", {})
                        )
                    except Exception as e:
                        logger.warning(
                            f"Could not fetch full record for {record.get('systemNumber')}: {e!s}"
                        )
                        full = {}

                    object_type = record.get("objectType", "")
                    material = ", ".join(
                        m["text"] for m in full.get("materials", []) if m.get("text")
                    )
                    place = record.get("_primaryPlace", "")

                    # Construct V&A collections item page URL
                    url = (
                        f"https://collections.vam.ac.uk/item/{record['systemNumber']}/"
                    )

                    # Get manifest and thumbnail URLs
                    manifest_url = record.get("_images", {}).get(
                        "_iiif_presentation_url", ""
                    )
                    thumbnail_url = record.get("_images", {}).get(
                        "_primary_thumbnail", ""
                    )

                    # Prepare image download
                    image_file = None
                    if thumbnail_url:
                        # Use the thumbnail URL directly as it's more reliable
                        filename = f"{record['systemNumber']}.jpg"
                        image_file = self.download_image(thumbnail_url, filename)

                    # Prepare the default values
                    defaults = {
                        "title": record.get("_primaryTitle") or object_type,
                        "date": record.get("_primaryDate", ""),
                        "description": full.get("physicalDescription")
                        or full.get("briefDescription", ""),
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
                            staged_item.image.save(
                                image_file.name, image_file, save=False
                            )
                            logger.info(
                                f"Successfully saved image for {record['systemNumber']}"
                            )
                        except Exception as e:
                            logger.error(
                                f"Failed to save image for {record['systemNumber']}: {e!s}"
                            )

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
                        f"Error processing item {record.get('systemNumber', 'unknown ID')}: {e!s}"
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
            logger.error(f"HTTP Request failed: {e!s}")
            raise
        except ValueError as e:
            logger.error(f"JSON parsing failed: {e!s}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error during fetch: {e!s}")
            raise
