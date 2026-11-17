"""One function per API type: read a CrawlSource's API and yield a Fetched per object.

Each takes (source, client) and yields lazily, so a run stages records as they
arrive and a preview can stop after a few.
"""

import json
from urllib.parse import quote

from catalog.linking import LinkedSource, _text, read_manifest

from .services import api_key, cooper_hewitt_fetched, query, vam_fetched
from .staging import Fetched

VAM_OBJECT = "https://api.vam.ac.uk/v2/object/{}"
MAX_PAGES = 50  # safety stop for any paginated API


class Skipped:
    """Yielded instead of a record the adapter could not read, so the crawl carries on."""

    def __init__(self, reason):
        self.identifier, self.reason = "?", reason


MAX_COLLECTIONS = 50  # safety stop for nested IIIF collections


def vam_records(source, client):
    page = 1
    while True:
        data = client.get_json(
            source.url, query(source, order_sort="asc", page=page, page_size=100)
        )
        for hit in data.get("records", []):
            full = client.get_json(VAM_OBJECT.format(quote(hit["systemNumber"]))).get(
                "record", {}
            )
            yield vam_fetched(hit, full, source)
        if page >= min(data.get("info", {}).get("pages", 1), MAX_PAGES):
            return
        page += 1


CH_FIELDS = ("id collectionsOnlineId summary title name date medium description "
             "classification geography multimedia identifier")  # fmt: skip


def cooper_hewitt_records(source, client):
    """Everything matching the source's "query" (GraphQL object arguments, e.g.
    department:"Textiles"); with no query, refresh the objects already crawled."""
    selection = (source.params or {}).get("query", "").strip()
    if selection:
        page = 0
        while page < MAX_PAGES:
            data = client.graphql(
                source.url,
                f"{{ object({selection}, size:100, page:{page}) {{ {CH_FIELDS} }} }}",
            )
            for record in data["data"]["object"] or []:
                yield cooper_hewitt_fetched(record, source)
            page += 1
            if page >= data.get("extensions", {}).get("pagination", {}).get(
                "number_of_pages", 0
            ):
                return
        return
    from catalog.models import Item

    ids = list(Item.objects.filter(holding_institution=source.holding_institution)
               .values_list("source_identifier", flat=True))  # fmt: skip
    for start in range(0, len(ids), 50):
        aliases = " ".join(
            f'o{n}: object({"id" if pk.startswith("object-") else "collectionsOnlineId"}:{json.dumps(pk)}) {{ {CH_FIELDS} }}'
            for n, pk in enumerate(ids[start : start + 50])
        )
        for hits in client.graphql(source.url, f"{{ {aliases} }}")["data"].values():
            for record in hits or []:
                yield cooper_hewitt_fetched(record, source)


# --- IIIF collections ------------------------------------------------------


def _ref(entry):
    return entry.get("id") or entry.get("@id") if isinstance(entry, dict) else entry


def _is_manifest(data):
    kind = str(data.get("type") or data.get("@type") or "")
    return kind.endswith("Manifest") or "sequences" in data


def _members(collection):
    """(is_collection, url) for each entry of a v2 or v3 IIIF collection."""
    for entry in collection.get("items", []) + collection.get("members", []):
        kind = str(entry.get("type") or entry.get("@type") or "")
        yield kind.endswith("Collection"), _ref(entry)
    for entry in collection.get("collections", []):
        yield True, _ref(entry)
    for entry in collection.get("manifests", []):
        yield False, _ref(entry)


def _metadata(manifest, *words):
    """A manifest metadata value whose label contains one of words (e.g. "date")."""
    for row in manifest.get("metadata", []):
        label = _text(row.get("label")).lower()
        if any(word in label for word in words):
            return _text(row.get("value"))
    return ""


def iiif_fetched(url, manifest, source):
    linked = read_manifest(LinkedSource(url=url), manifest)
    identifier = linked.manifest_url or url
    return Fetched(
        source=source,
        identifier=identifier,
        payload=manifest,
        title=linked.title or identifier,
        summary=linked.summary,
        source_url=linked.source_url,
        date_text=_metadata(manifest, "date"),
        place=_metadata(manifest, "place", "origin"),
        maker=_metadata(manifest, "maker", "artist", "creator"),
        image_url=linked.image_url,
        thumbnail_url=linked.thumbnail_url,
        manifest_url=linked.manifest_url,
        rights=linked.rights,
        store_image=False,  # shown from the holder's IIIF server
        detail={"object_type": _metadata(manifest, "object type", "type"),
                "materials_techniques": _metadata(manifest, "material", "medium")},
    )  # fmt: skip


def iiif_records(source, client):
    start = client.get_json(source.url)
    if _is_manifest(start):  # a single manifest works too
        yield iiif_fetched(source.url, start, source)
        return
    queue, seen = [start], {source.url}
    while queue:
        collection = queue.pop(0)
        for is_collection, ref in _members(collection):
            if not ref or ref in seen:
                continue
            seen.add(ref)
            if is_collection:
                if len(seen) <= MAX_COLLECTIONS:
                    queue.append(client.get_json(ref))
            else:
                yield iiif_fetched(ref, client.get_json(ref), source)


# --- Other JSON APIs, read through the admin's field mapping ---------------


def dig(data, path):
    """Follow a dotted path ("images.0.url") through dicts and lists; None if absent.
    An empty path means the whole answer (for APIs that return a bare list)."""
    if not path:
        return data
    for part in path.split("."):
        if isinstance(data, list) and part.isdigit():
            data = data[int(part)] if int(part) < len(data) else None
        elif isinstance(data, dict):
            data = data.get(part)
        else:
            return None
        if data is None:
            return None
    return data


def as_text(value):
    if isinstance(value, list):
        return "; ".join(t for t in (as_text(v) for v in value) if t)
    if value is None or isinstance(value, dict):
        return ""
    return str(value).strip()


def json_fetched(record, source):
    fields = source.mapping["fields"]

    def get(name):
        return as_text(dig(record, fields[name])) if fields.get(name) else ""

    identifier = get("id")
    if not identifier:
        raise ValueError(f"A record has nothing at the ID path {fields['id']!r}.")
    return Fetched(
        source=source,
        identifier=identifier,
        payload=record,
        title=f"{get('title') or identifier} ({source.short_name} {identifier})",
        summary=get("summary"),
        source_url=get("page_url"),
        date_text=get("date"),
        place=get("place"),
        maker=get("maker"),
        image_url=get("image"),
        thumbnail_url=get("thumbnail") or get("image"),
        rights=get("rights"),
        store_image=False,  # linked where it lives, like "Add from link"
        detail={
            "object_type": get("object_type"),
            "materials_techniques": get("materials"),
        },
    )


def json_records(source, client):
    mapping = source.mapping
    paging = mapping.get("pagination") or {}
    style = paging.get("style", "none")
    params = query(source)
    if paging.get("size_param") and paging.get("size"):
        params[paging["size_param"]] = paging["size"]
    position = paging.get("start", 1 if style == "page" else 0)
    url = source.url
    for _ in range(min(paging.get("max_pages", MAX_PAGES), MAX_PAGES)):
        if style in ("page", "offset"):
            params[paging.get("param") or style] = position
        data = client.get_json(url, params)
        records = dig(data, mapping.get("records", "")) or []
        for record in records:
            if mapping.get("detail_url"):
                # The search answer may hold the ID somewhere else than the full record does
                # (or be the bare ID itself, path ""); "detail_id" says where.
                record_id = as_text(
                    dig(record, mapping.get("detail_id", mapping["fields"]["id"]))
                )
                record = client.get_json(
                    mapping["detail_url"].format(id=quote(record_id)), query(source)
                )
            try:
                yield json_fetched(record, source)
            except ValueError as e:
                yield Skipped(str(e))
        if not records or style == "none":
            return
        if style == "page":
            position += 1
        elif style == "offset":
            position += len(records)
        elif style == "next":
            url = as_text(dig(data, paging.get("next", "")))
            if not url:
                return
            # The next link carries the query; only the key has to be added again.
            params = (
                {source.api_key_param: api_key(source)} if source.api_key_param else {}
            )


ADAPTERS = {
    "vam": vam_records,
    "cooper_hewitt": cooper_hewitt_records,
    "iiif_collection": iiif_records,
    "json_api": json_records,
}
