"""Museum and collection APIs the crawler can fetch from, and a log of each crawl.

A CrawlSource is configured in the admin: which kind of API it is (crawler/adapters.py
knows how to read each kind), where it lives, and what to ask it for. Running one
stages what it finds as private catalog items in the Crawled items queue.
"""

from django.core.exceptions import ValidationError
from django.db import models

KINDS = [
    ("vam", "V&A collections API"),
    ("cooper_hewitt", "Cooper Hewitt API"),
    ("iiif_collection", "IIIF collection"),
    ("json_api", "Other JSON API (field mapping)"),
]

# How a source's records are marked in item.ingest_method.
INGEST_METHOD = {
    "vam": "crawler_vam_api",
    "cooper_hewitt": "crawler_cooper_hewitt_api",
    "iiif_collection": "crawler_iiif",
    "json_api": "crawler_json_api",
}

MAPPING_HELP = """Only for "Other JSON API". Tells the crawler where things are in the API's
answer, as paths of keys separated by dots (a number picks an item from a list, e.g.
images.0.url). Example:
{
  "records": "data.items",
  "fields": {"id": "objectID", "title": "title", "date": "objectDate",
             "summary": "description", "image": "primaryImage",
             "thumbnail": "primaryImageSmall", "page_url": "objectURL",
             "place": "country", "maker": "artistDisplayName",
             "object_type": "objectName", "materials": "medium"},
  "pagination": {"style": "page", "param": "page", "start": 1,
                 "size_param": "limit", "size": 50, "max_pages": 20}
}
"id" and "title" are required. "records" is where the list of records sits; leave it
out if the answer is itself the list. Pagination style is "page"
(page numbers), "offset" (item offsets), "next" (a link to the next page, at the path
given as "next") or "none". If each record needs its own request for full details, add
"detail_url" with {id} where the record's ID goes, e.g.
"https://api.example.org/objects/{id}"; the field paths then apply to that answer. If the
search answer holds the ID somewhere else, give that path as "detail_id" ("" when the
search answer is just a list of IDs)."""


class CrawlSource(models.Model):
    name = models.CharField(
        max_length=200,
        unique=True,
        help_text="Shown in the admin and recorded on each record it creates.",
    )
    kind = models.CharField(
        "API type", max_length=30, choices=KINDS, help_text="How to read this API."
    )
    enabled = models.BooleanField(
        default=True, help_text="Untick to hide the Run button."
    )
    holding_institution = models.CharField(
        max_length=300,
        help_text="The museum or library that holds the objects. Records are matched on "
        "this plus the object's ID, so re-crawling updates them instead of duplicating.",
    )
    short_name = models.CharField(
        max_length=60,
        help_text='Added after record titles, e.g. "V&A" gives "Handkerchief (V&A O123)".',
    )
    url = models.URLField(
        "API or collection URL",
        max_length=1000,
        help_text="V&A and Cooper Hewitt: the API's search address. IIIF: the collection's "
        "address (it lists manifests). Other JSON API: the search address.",
    )
    params = models.JSONField(
        "Query settings",
        default=dict,
        blank=True,
        help_text='Extra query parameters as JSON, e.g. {"id_category": "THES381162"} for '
        'the V&A project tag or {"q": "madras handkerchief"} for a search.',
    )
    api_key_setting = models.CharField(
        max_length=100,
        blank=True,
        help_text="If the API needs a key: the name of the server setting that holds it "
        "(e.g. COOPER_HEWITT_API_KEY). The key itself is never stored here.",
    )
    api_key_param = models.CharField(
        max_length=100,
        blank=True,
        help_text="The query parameter the key goes in (e.g. access_token or api_key).",
    )
    mapping = models.JSONField(
        "Field mapping", default=dict, blank=True, help_text=MAPPING_HELP
    )
    rights_statement = models.TextField(
        blank=True,
        help_text="Given to new records from this source. Images only show publicly on "
        "records with a rights statement.",
    )

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name

    @property
    def ingest_method(self):
        return INGEST_METHOD[self.kind]

    def clean(self):
        if self.kind == "json_api":
            fields = (self.mapping or {}).get("fields", {})
            missing = [f"fields.{k}" for k in ("id", "title") if not fields.get(k)]
            if missing:
                raise ValidationError(
                    {"mapping": f"The field mapping needs: {', '.join(missing)}."}
                )
        if (
            bool(self.api_key_setting) != bool(self.api_key_param)
            and self.kind == "json_api"
        ):
            raise ValidationError(
                {
                    "api_key_param": "Give both the key's setting name and its parameter, or neither."
                }
            )


class CrawlRun(models.Model):
    STATUSES = [
        ("running", "Running"),
        ("finished", "Finished"),
        ("failed", "Failed"),
        ("interrupted", "Interrupted"),
    ]

    source = models.ForeignKey(CrawlSource, models.CASCADE, related_name="runs")
    status = models.CharField(max_length=20, choices=STATUSES, default="running")
    started_by = models.CharField(max_length=150, blank=True)
    started_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  # heartbeat while running
    finished_at = models.DateTimeField(null=True, blank=True)
    created = models.PositiveIntegerField(default=0)
    refreshed = models.PositiveIntegerField(default=0)
    errors = models.PositiveIntegerField(default=0)
    message = models.TextField(blank=True)

    class Meta:
        ordering = ["-started_at"]

    def __str__(self):
        return f"{self.source} · {self.started_at:%Y-%m-%d %H:%M} · {self.get_status_display()}"
