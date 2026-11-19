"""Fetch museum objects tagged for Connecting Threads and stage them in the catalog."""

import logging
from datetime import UTC, datetime

import backoff
import requests
from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from ratelimit import limits, sleep_and_retry

from .staging import Fetched, stage

logger = logging.getLogger(__name__)

VAM_SEARCH = "https://api.vam.ac.uk/v2/objects/search"
VAM_OBJECT = "https://api.vam.ac.uk/v2/object/{}"
VAM_TAG = "THES381162"  # Connecting Threads project tag
VAM_IMAGE_SIZE = "full/!1000,1000/0/default.jpg"  # IIIF: fit within 1000px


def _year(iso):
    return int(iso[:4]) if iso and iso[:4].isdigit() else None


def _texts(entries, key="text"):
    return ", ".join(e[key] for e in entries if e.get(key))


def vam_fetched(hit, full):
    """Build a Fetched from a V&A search hit and its full object record."""
    number = hit["systemNumber"]
    images = hit.get("_images") or {}
    production = (full.get("productionDates") or [{}])[0].get("date") or {}
    date_text = production.get("text") or hit.get("_primaryDate", "")
    place = hit.get("_primaryPlace") or (
        (full.get("placesOfOrigin") or [{}])[0].get("place", {}).get("text", "")
    )
    object_type = full.get("objectType") or hit.get("objectType", "")
    titles = [t["title"] for t in full.get("titles", []) if t.get("title")]
    title = (
        titles[0]
        if titles
        else ", ".join(p for p in [object_type, place, date_text] if p)
    )
    dimensions = "; ".join(
        f"{d['dimension']} {d['value']} {d['unit']}".strip()
        for d in full.get("dimensions", [])
        if d.get("value")
    )
    modified = full.get("recordModificationDate")
    return Fetched(
        source="vam",
        identifier=number,
        payload=full or hit,
        title=f"{title} (V&A {number})",
        summary=(
            full.get("briefDescription") or full.get("summaryDescription") or ""
        ).strip(),
        source_url=f"https://collections.vam.ac.uk/item/{number}/",
        date_text=date_text,
        date_start=_year(production.get("earliest")),
        date_end=_year(production.get("latest")),
        place=place,
        maker=(hit.get("_primaryMaker") or {}).get("name", ""),
        image_url=(
            (images["_iiif_image_base_url"] + VAM_IMAGE_SIZE)
            if images.get("_iiif_image_base_url")
            else images.get("_primary_thumbnail", "")
        ),
        thumbnail_url=images.get("_primary_thumbnail", ""),
        manifest_url=images.get("_iiif_presentation_url", ""),
        source_updated=(
            datetime.fromisoformat(modified).replace(tzinfo=UTC) if modified else None
        ),
        detail={
            "object_type": object_type,
            "materials_techniques": full.get("materialsAndTechniques")
            or "; ".join(x for x in [_texts(full.get("materials", [])),
                                     _texts(full.get("techniques", []))] if x),  # fmt: skip
            "physical_description": full.get("physicalDescription", ""),
            "dimensions_text": dimensions,
            "accession_number": full.get("accessionNumber")
            or hit.get("accessionNumber", ""),
            "credit_line": full.get("creditLine", ""),
            "marks_inscriptions": "; ".join(
                m["content"]
                for m in full.get("marksAndInscriptions", [])
                if m.get("content")
            ),
            "object_history": full.get("objectHistory", ""),
        },
    )


def cooper_hewitt_fetched(obj):
    images = obj.get("images") or [{}]
    first = images[0]

    def url(*sizes):
        return next((first[s]["url"] for s in sizes if s in first), "")

    return Fetched(
        source="cooper_hewitt",
        identifier=str(obj["id"]),
        payload=obj,
        title=f"{obj.get('title') or obj.get('type', '')} (Cooper Hewitt {obj['id']})",
        summary=(
            obj.get("description")
            or obj.get("gallery_text")
            or obj.get("label_text")
            or ""
        ).strip(),
        source_url=obj.get("url", ""),
        date_text=obj.get("date", ""),
        place=obj.get("woe:country_name", ""),
        image_url=url("b", "z", "n"),
        thumbnail_url=url("sq", "z"),
        detail={
            "object_type": obj.get("type", ""),
            "materials_techniques": obj.get("medium", ""),
        },
    )


class MuseumAPIClient:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update(
            {
                "User-Agent": "connecting-threads-crawler/1.0",
                "Accept": "application/json",
            }
        )

    @sleep_and_retry
    @limits(calls=100, period=60)
    @backoff.on_exception(
        backoff.expo, requests.exceptions.RequestException, max_tries=5
    )
    def _get(self, url, **params):
        response = self.session.get(url, params=params or None, timeout=30)
        response.raise_for_status()
        return response

    def download_image(self, url, name):
        """Save an image to media storage; returns the storage key, or None on failure."""
        try:
            return default_storage.save(name, ContentFile(self._get(url).content))
        except requests.exceptions.RequestException as e:
            logger.error("Failed to download image %s: %s", url, e)
            return None

    def _stage_all(self, fetched_items):
        created = updated = errored = 0
        for fetched in fetched_items:
            try:
                _, new = stage(fetched, download=self.download_image)
                created += new
                updated += not new
            except Exception:
                errored += 1
                logger.exception(
                    "Could not stage %s %s", fetched.source, fetched.identifier
                )
        logger.info(
            "Staged: %s created, %s updated, %s errors", created, updated, errored
        )
        return created, updated

    def _vam_records(self):
        page = 1
        while True:
            data = self._get(VAM_SEARCH, id_category=VAM_TAG, order_sort="asc",
                             page=page, page_size=100).json()  # fmt: skip
            for hit in data.get("records", []):
                try:
                    full = (
                        self._get(VAM_OBJECT.format(hit["systemNumber"]))
                        .json()
                        .get("record", {})
                    )
                except requests.exceptions.RequestException as e:
                    logger.warning("No full record for %s: %s", hit["systemNumber"], e)
                    full = {}
                yield vam_fetched(hit, full)
            if page >= data.get("info", {}).get("pages", 1):
                return
            page += 1

    def fetch_vam(self):
        logger.info("Fetching V&A objects tagged %s", VAM_TAG)
        return self._stage_all(self._vam_records())

    def fetch_cooper_hewitt(self):
        logger.info("Fetching Cooper Hewitt objects")
        data = self._get(
            "https://api.collection.cooperhewitt.org/rest/",
            method="cooperhewitt.exhibitions.getObjects",
            access_token=settings.COOPER_HEWITT_API_KEY,
            query="Connecting Threads",
        ).json()
        return self._stage_all(
            cooper_hewitt_fetched(o) for o in data.get("objects", [])
        )
