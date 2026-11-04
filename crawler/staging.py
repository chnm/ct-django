"""Turn a fetched museum object into a staged catalog item.

The API clients in services.py build a Fetched per object; stage() writes it.
Re-crawls refresh crawler-owned fields only while an item is still staged and
unreviewed; after review or publication they only fill fields that are empty,
so curators' edits are never overwritten.
"""

import json
import re
from dataclasses import dataclass, field
from datetime import datetime

from django.db import transaction
from django.utils import timezone

from catalog.models import (
    Agent,
    DataIssue,
    Item,
    ItemAgent,
    ItemPlace,
    Media,
    ObjectDetail,
    Place,
    PlaceAlias,
    SourcePayload,
)

SOURCES = {
    "vam": {
        "institution": "Victoria and Albert Museum",
        "system": "V&A API",
        "ingest": "crawler_vam_api",
        "short": "V&A",
        "rights": "Image © Victoria and Albert Museum, London. V&A terms allow "
        "non-commercial use; check before publishing.",
    },
    "cooper_hewitt": {
        "institution": "Cooper Hewitt, Smithsonian Design Museum",
        "system": "Cooper Hewitt API",
        "ingest": "crawler_cooper_hewitt_api",
        "short": "Cooper Hewitt",
        "rights": "Image courtesy of Cooper Hewitt, Smithsonian Design Museum; "
        "check rights before publishing.",
    },
}

ITEM_FIELDS = ["title", "summary", "source_url", "date_start", "date_end",
               "date_precision", "date_as_recorded"]  # fmt: skip
DETAIL_FIELDS = ["object_type", "materials_techniques", "physical_description",
                 "dimensions_text", "accession_number", "credit_line",
                 "marks_inscriptions", "object_history", "collection_code"]  # fmt: skip


@dataclass
class Fetched:
    source: str  # key of SOURCES
    identifier: str  # the museum's own number (V&A system number)
    payload: dict  # raw API record, stored verbatim
    title: str = ""
    summary: str = ""
    source_url: str = ""
    date_text: str = ""
    date_start: int | None = None
    date_end: int | None = None
    place: str = ""
    maker: str = ""
    image_url: str = ""
    thumbnail_url: str = ""
    manifest_url: str = ""
    source_updated: datetime | None = None
    detail: dict = field(default_factory=dict)  # DETAIL_FIELDS


# Museum placeholders for "no maker recorded"; not worth a review issue.
NO_MAKER = {"unknown", "unidentified", "anonymous", "unknown maker"}

_CENTURY = re.compile(r"(\d{1,2})(?:st|nd|rd|th)\s+century", re.I)
_RANGE = re.compile(r"(\d{4})\s*[-–]\s*(\d{1,4})\b")
_DECADE = re.compile(r"(\d{3})0s")
_YEAR = re.compile(r"\d{4}")


def parse_date(text, start=None, end=None):
    """(start, end, precision) from a museum date string, preferring years the API already gives."""
    text = (text or "").strip()
    circa = bool(re.match(r"(ca?\.|circa|about)\s*", text, re.I))
    if start is None:
        if m := _CENTURY.search(text):
            start = (int(m[1]) - 1) * 100
            end = start + 99
        elif m := _RANGE.search(text):
            start, end = int(m[1]), int(m[1][: 4 - len(m[2])] + m[2])
        elif m := _DECADE.search(text):
            start, end = int(m[1] + "0"), int(m[1] + "9")
        elif m := _YEAR.search(text):
            start = end = int(m[0])
        else:
            return None, None, None
    end = start if end is None else end
    if _CENTURY.search(text):
        precision = "century"
    elif _DECADE.search(text):
        precision = "decade"
    elif start == end:
        precision = "circa" if circa else "year"
    else:
        precision = "circa_range" if circa else "range"
    return start, end, precision


def _resolve_place(name):
    alias = (
        PlaceAlias.objects.filter(alias=name.strip().lower())
        .select_related("place")
        .first()
    )
    if alias:
        return alias.place
    return Place.objects.filter(name_preferred__iexact=name.strip()).first()


def _issue(item, issue_type, field, detail, action):
    DataIssue.objects.get_or_create(
        item=item, issue_type=issue_type, detail=detail,
        defaults=dict(legacy_id=item.legacy_id, severity="medium", field=field,
                      suggested_action=action, status="open"),
    )  # fmt: skip


def _set(obj, name, value, editable):
    """Write value when the crawler still owns the row, or the field is empty."""
    if value in (None, ""):
        return
    if editable or getattr(obj, name) in (None, ""):
        setattr(obj, name, value)


@transaction.atomic
def stage(fetched, download=None):
    """Create or refresh the catalog item for one fetched object. Returns (item, created).

    download(url, name) -> storage key, used for the image the first time only.
    """
    src = SOURCES[fetched.source]
    item = Item.objects.filter(
        holding_institution=src["institution"], source_identifier=fetched.identifier
    ).first()
    created = item is None
    if created:
        item = Item(
            item_type="object", record_status="staged", is_public=False,
            is_context_record=False, title_status="draft", evidence_level="primary",
            date_basis="object_date", date_certainty="stated",
            holding_institution=src["institution"], source_identifier=fetched.identifier,
            rights_statement=src["rights"], ingest_method=src["ingest"], created_by="crawler",
            review_status="unreviewed", review_notes="Initial fetch from API",
            legacy_system=src["system"], legacy_id=fetched.identifier, ingested_at=timezone.now(),
        )  # fmt: skip
    editable = created or (
        item.record_status == "staged" and item.review_status == "unreviewed"
    )

    start, end, precision = parse_date(
        fetched.date_text, fetched.date_start, fetched.date_end
    )
    values = dict(
        title=fetched.title,
        summary=fetched.summary,
        source_url=fetched.source_url,
        date_as_recorded=fetched.date_text,
        date_start=start,
        date_end=end,
        date_precision=precision,
    )
    for name in ITEM_FIELDS:
        _set(item, name, values[name], editable)
    item.updated_at = fetched.source_updated or item.updated_at
    item.save()

    detail, _ = ObjectDetail.objects.get_or_create(item=item)
    for name in DETAIL_FIELDS:
        _set(detail, name, fetched.detail.get(name), editable)
    detail.save()

    for media_type, url in [
        ("thumbnail", fetched.thumbnail_url),
        ("iiif_manifest", fetched.manifest_url),
    ]:
        if url:
            Media.objects.update_or_create(
                item=item,
                media_type=media_type,
                defaults={"external_url": url, "is_primary": False},
            )
    if (
        fetched.image_url
        and download
        and not item.media_set.filter(media_type="image").exists()
    ):
        key = download(fetched.image_url, f"staged_items/{fetched.identifier}.jpg")
        if key:
            Media.objects.create(
                item=item, media_type="image", storage_key=key, is_primary=True
            )

    text = json.dumps(fetched.payload, sort_keys=True, ensure_ascii=False)
    latest = item.sourcepayload_set.order_by("-fetched_at", "-payload_id").first()
    if latest is None or latest.payload_text != text:
        SourcePayload.objects.create(
            item=item,
            source_system=src["system"],
            payload_text=text,
            fetched_at=timezone.now(),
        )

    if fetched.place and not item.itemplace_set.filter(role="made").exists():
        place = _resolve_place(fetched.place)
        if place:
            ItemPlace.objects.create(
                item=item, place=place, role="made", activity="production",
                precision="area" if place.map_level == "area" else "place",
                certainty="certain", sequence=1, verbatim=fetched.place,
            )  # fmt: skip
        else:
            _issue(item, "place_unresolved", "item_place",
                   f"{src['short']} place {fetched.place!r} matches no place or alias.",
                   "Link the record to a place, or add the spelling as a place alias.")  # fmt: skip

    maker_known = fetched.maker and fetched.maker.strip().lower() not in NO_MAKER
    if maker_known and not item.itemagent_set.filter(role="maker").exists():
        agent = Agent.objects.filter(
            name_preferred__iexact=fetched.maker.strip()
        ).first()
        if agent:
            ItemAgent.objects.create(item=item, agent=agent, role="maker", is_primary=True,
                                     verbatim=fetched.maker)  # fmt: skip
        else:
            _issue(item, "agent_review", "item_agent",
                   f"{src['short']} maker {fetched.maker!r} matches no person or organisation.",
                   "Link the record to an agent, or add one.")  # fmt: skip

    return item, created
