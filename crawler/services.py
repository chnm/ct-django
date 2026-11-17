"""HTTP access for crawls, and the V&A and Cooper Hewitt record builders."""

import json
import logging
import os
from datetime import UTC, datetime
from urllib.parse import urlencode

import backoff
import requests
from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from ratelimit import limits, sleep_and_retry

from catalog.linking import LinkError, _check_public, fetch

from .staging import Fetched

logger = logging.getLogger(__name__)

VAM_IMAGE_SIZE = "full/!1000,1000/0/default.jpg"  # IIIF: fit within 1000px
MAX_JSON_BYTES = 20 * 1024 * 1024  # long IIIF manifests run to megabytes


def api_key(source):
    """The source's API key from server settings or the environment; never stored in the database."""
    if not source.api_key_setting:
        return None
    key = getattr(settings, source.api_key_setting, None) or os.environ.get(
        source.api_key_setting
    )
    if not key:
        raise LinkError(
            f"The server setting {source.api_key_setting} is empty; ask the sysadmin to set it."
        )
    return key


def query(source, **extra):
    """The source's query settings plus its API key and any per-request values."""
    params = {**(source.params or {}), **extra}
    if source.api_key_param and (key := api_key(source)):
        params[source.api_key_param] = key
    return params


class MuseumAPIClient:
    def __init__(self):
        self.session = requests.Session()

    @sleep_and_retry
    @limits(calls=100, period=60)
    @backoff.on_exception(backoff.expo, LinkError, max_tries=3)
    def get_json(self, url, params=None):
        """GET JSON from an admin-configured URL, with the same guards as "Add from link"."""
        if params:
            url = f"{url}{'&' if '?' in url else '?'}{urlencode(params, doseq=True)}"
        _, _, body = fetch(url, self.session, max_bytes=MAX_JSON_BYTES)
        if body is None:
            raise LinkError("That address returned an image, not data.")
        try:
            return json.loads(body)
        except ValueError:
            raise LinkError("That address did not return JSON.") from None

    @sleep_and_retry
    @limits(calls=1, period=2)  # Cooper Hewitt's unkeyed limit is 1/s and 30/min
    @backoff.on_exception(
        backoff.expo, requests.exceptions.RequestException, max_tries=5
    )
    def graphql(self, url, query_text):
        _check_public(url)
        response = self.session.post(url, json={"query": query_text}, timeout=60)
        response.raise_for_status()
        data = response.json()
        if data.get("errors"):
            raise LinkError(f"The API answered: {data['errors'][0].get('message')}")
        return data

    def download_image(self, url, name):
        """Save an image to media storage; returns the storage key, or None on failure."""
        try:
            # shortcut: the URL comes from the museum's own API answer, not the admin, so
            # only its first hop is checked; route through linking.fetch if that changes.
            _check_public(url)
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            return default_storage.save(name, ContentFile(response.content))
        except (requests.exceptions.RequestException, LinkError) as e:
            logger.error("Failed to download image %s: %s", url, e)
            return None


def _year(iso):
    return int(iso[:4]) if iso and iso[:4].isdigit() else None


def _texts(entries, key="text"):
    return ", ".join(e[key] for e in entries if e.get(key))


def vam_fetched(hit, full, source):
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
        source=source,
        identifier=number,
        payload=full or hit,
        title=f"{title} ({source.short_name} {number})",
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


def _values(items):
    """Cooper Hewitt GraphQL fields are lists of {value: ...} or plain strings."""
    out = []
    for x in items or []:
        v = x.get("value") if isinstance(x, dict) else x
        if v:
            out.append(str(v))
    return out


def cooper_hewitt_fetched(record, source):
    """Map a Cooper Hewitt GraphQL object record (api.cooperhewitt.org, see #62)."""

    def first(items):
        return next(iter(_values(items)), "")

    summary = record.get("summary") or {}
    geo = record.get("geography") if isinstance(record.get("geography"), dict) else {}
    media = (record.get("multimedia") or [{}])[0] or {}
    classification = (record.get("classification") or [{}])[0] or {}
    accession = next((i["value"] for i in record.get("identifier") or []
                      if i.get("type") == "accession number"), "")  # fmt: skip
    thumbnail = (media.get("preview") or {}).get("url", "")
    identifier = record.get("collectionsOnlineId") or record.get("id")
    title = (
        summary.get("title") or first(record.get("title")) or first(record.get("name"))
    )
    return Fetched(
        source=source,
        identifier=str(identifier),
        payload=record,
        title=f"{title or identifier} ({source.short_name} {identifier})",
        summary="\n\n".join(_values(record.get("description"))),
        source_url=f"https://www.si.edu/object/chndm_{accession}" if accession else "",
        date_text=first(record.get("date")),
        place=(geo.get("country") or {}).get("value") or geo.get("name") or "",
        image_url=(media.get("large") or {}).get("url") or thumbnail,
        thumbnail_url=thumbnail,
        detail={
            "object_type": (classification.get("summary") or {}).get("title")
            or first(record.get("name")),
            "materials_techniques": ", ".join(_values(record.get("medium"))),
            "accession_number": accession,
        },
    )
