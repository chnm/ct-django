"""Connecting Threads catalogue, generated once from the Data Dictionary in
CT_restructured_database_revised.xlsx (revision 2026-11-03). This file is now the master; edit it directly.
"""

from django.db import models

ID_HELP = " Leave blank on a new row to get the next free ID."


class NextId:
    """Fill a blank text primary key with the next number after the highest existing one (PL-137 -> PL-138)."""

    ID_PREFIX = ""
    ID_WIDTH = 3

    def save(self, *args, **kwargs):
        if not self.pk:
            # shortcut: two editors adding at the same instant can collide (save fails, retry works); add a lock if that happens
            ids = (
                type(self)
                .objects.filter(pk__startswith=self.ID_PREFIX)
                .values_list("pk", flat=True)
            )
            n = max(
                (
                    int(i[len(self.ID_PREFIX) :])
                    for i in ids
                    if i[len(self.ID_PREFIX) :].isdigit()
                ),
                default=0,
            )
            self.pk = f"{self.ID_PREFIX}{n + 1:0{self.ID_WIDTH}d}"
        super().save(*args, **kwargs)


def format_date(start, end, precision, certainty):
    """The date_display wording the build package used, from the year fields."""
    if start is None or precision is None:
        return None
    end = start if end is None else end
    if precision == "year":
        text = str(end)
    elif precision == "circa":
        text = f"ca. {end}"
    elif precision == "decade":
        text = f"{start}s"
    elif precision == "century":
        c = start // 100 + 1
        suffix = (
            "th"
            if 10 <= c % 100 <= 20
            else {1: "st", 2: "nd", 3: "rd"}.get(c % 10, "th")
        )
        text = f"{c}{suffix} century"
    elif precision == "range":
        text = f"{start}-{end}"
    else:  # circa_range
        text = f"ca. {start}-{end}"
    return f"{text} (inferred)" if certainty == "inferred" else text


class Place(NextId, models.Model):
    ID_PREFIX, ID_WIDTH = "PL-", 3

    place_id = models.TextField(
        primary_key=True, blank=True, help_text="PL-001 format." + ID_HELP
    )
    name_preferred = models.TextField(
        help_text="Name used in the project. Period name where the project's sources use one (Madras)."
    )
    name_modern = models.TextField(
        null=True,
        blank=True,
        help_text="Modern name where different (Chennai). Use for joining to GeoNames or Getty TGN.",
    )
    place_type = models.TextField(
        choices=[
            ("city", "city"),
            ("port", "port"),
            ("town", "town"),
            ("fort", "fort"),
            ("island", "island"),
            ("country", "country"),
            ("region", "region"),
            ("colony_or_polity", "colony_or_polity"),
            ("macro_region", "macro_region"),
            ("unresolved", "unresolved"),
        ],
        help_text="Kind of place. macro_region = the project's broad Area values (India, Caribbean...). unresolved = the source value is too vague to identify; kept so nothing is lost.",
    )
    macro_region = models.TextField(
        null=True,
        blank=True,
        help_text="The project's broad Area: India, Britain, Europe (excluding Britain), Caribbean, Americas (US included), Africa, Southeast Asia, Asia.",
    )
    country_modern = models.TextField(
        null=True, blank=True, help_text="Modern country, where meaningful."
    )
    latitude = models.FloatField(
        null=True,
        blank=True,
        help_text="Decimal degrees. Only set for point-like places (cities, towns, islands). Approximate.",
    )
    longitude = models.FloatField(null=True, blank=True, help_text="Decimal degrees.")
    coord_status = models.TextField(
        choices=[
            ("approximate", "approximate"),
            ("uncertain", "uncertain"),
            ("needs_geocoding", "needs_geocoding"),
            ("not_applicable", "not_applicable"),
        ],
        help_text="approximate = entered from general knowledge, verify against GeoNames or TGN before publication; needs_geocoding = point-like but not filled; not_applicable = region or country, map as a polygon instead. uncertain = a position was entered but the identification of the place itself is in doubt (added 2026-11-03).",
    )
    geonames_id = models.TextField(
        null=True, blank=True, help_text="GeoNames ID. Empty: to fill."
    )
    tgn_id = models.TextField(
        null=True, blank=True, help_text="Getty TGN ID. Empty: to fill."
    )
    notes = models.TextField(
        null=True,
        blank=True,
        help_text="Curation notes, for example doubtful identifications.",
    )
    broader_place = models.ForeignKey(
        "self",
        models.SET_NULL,
        db_column="broader_place_id",
        null=True,
        blank=True,
        related_name="place_as_broader_place",
        help_text="The place this one sits inside (Fort St. George -> Madras -> Madras Presidency -> India). Lets point data roll up to regions.",
    )
    map_level = models.TextField(
        choices=[("point", "point"), ("area", "area"), ("unmapped", "unmapped")],
        help_text="point = drawn at latitude/longitude; area = drawn as a shape from place_geometry; unmapped = no location yet.",
    )

    class Meta:
        db_table = "place"

    def __str__(self):
        return str(self.name_preferred or self.pk)


class PlaceGeometry(models.Model):
    place = models.OneToOneField(
        "Place",
        models.CASCADE,
        db_column="place_id",
        primary_key=True,
        help_text="The place.",
    )
    geometry_type = models.TextField(
        null=True,
        blank=True,
        choices=[
            ("point", "point"),
            ("bounding_box", "bounding_box"),
            ("polygon", "polygon"),
        ],
        help_text="Kind of shape. bounding_box is a rough first pass.",
    )
    label_latitude = models.FloatField(
        null=True,
        blank=True,
        help_text="Where to put the label or marker for the place.",
    )
    label_longitude = models.FloatField(null=True, blank=True, help_text="As above.")
    bbox_west = models.FloatField(
        null=True, blank=True, help_text="Bounding box, decimal degrees."
    )
    bbox_south = models.FloatField(null=True, blank=True)
    bbox_east = models.FloatField(null=True, blank=True)
    bbox_north = models.FloatField(null=True, blank=True)
    geojson = models.TextField(
        null=True,
        blank=True,
        help_text="The shape as GeoJSON, ready for Leaflet, Mapbox or QGIS.",
    )
    geometry_source = models.TextField(
        null=True, blank=True, help_text="Where the shape comes from."
    )
    status = models.TextField(
        null=True, blank=True, help_text="draft until replaced with checked boundaries."
    )

    class Meta:
        db_table = "place_geometry"

    def __str__(self):
        return str(self.pk)


class PlaceAlias(models.Model):
    alias = models.TextField(help_text="Variant as found (lower-cased, trimmed).")
    place = models.ForeignKey(
        "Place",
        models.CASCADE,
        db_column="place_id",
        help_text="The place it resolves to.",
    )
    alias_type = models.TextField(
        choices=[
            ("preferred", "preferred"),
            ("variant_spelling", "variant_spelling"),
            ("historical_name", "historical_name"),
            ("modern_name", "modern_name"),
            ("narrower_value_folded", "narrower_value_folded"),
            ("other_language", "other_language"),
            ("as_recorded", "as_recorded"),
            ("colloquial", "colloquial"),
            ("partial_overlap", "partial_overlap"),
            ("abbreviation", "abbreviation"),
        ],
        help_text="Why the alias exists. Same list as Place_Alternates in the keyword workbook.",
    )

    class Meta:
        db_table = "place_alias"
        constraints = [
            models.UniqueConstraint(
                fields=["alias", "place"], name="place_alias_alias_place_id_uniq"
            )
        ]

    def __str__(self):
        return str(self.alias or self.pk)


class Agent(NextId, models.Model):
    ID_PREFIX, ID_WIDTH = "AG-", 3

    agent_id = models.TextField(
        primary_key=True, blank=True, help_text="AG-001 format." + ID_HELP
    )
    name_preferred = models.TextField(help_text="Preferred form of the name.")
    agent_type = models.TextField(
        choices=[
            ("person", "person"),
            ("organization", "organization"),
            ("other", "other"),
            ("unresolved", "unresolved"),
        ],
        help_text="other = not really an agent (for example 'Public Auction'); unresolved = the source string could not be split safely.",
    )
    life_dates = models.TextField(
        null=True,
        blank=True,
        help_text="Life dates as text, when the source gave them.",
    )
    name_variants = models.TextField(
        null=True,
        blank=True,
        help_text="Other forms found in the source, separated by ' | '.",
    )
    notes = models.TextField(null=True, blank=True, help_text="Curation notes.")

    class Meta:
        db_table = "agent"

    def __str__(self):
        return str(self.name_preferred or self.pk)


class Term(NextId, models.Model):
    ID_PREFIX, ID_WIDTH = "TM-", 4

    term_id = models.TextField(
        primary_key=True, blank=True, help_text="TM-0001 format." + ID_HELP
    )
    vocabulary = models.TextField(
        choices=[
            ("textile_type", "textile_type"),
            ("textile_form", "textile_form"),
            ("textile_pattern", "textile_pattern"),
            ("textile_colour", "textile_colour"),
            ("textile_term_as_recorded", "textile_term_as_recorded"),
            ("garment_category", "garment_category"),
            ("textile_attribute", "textile_attribute"),
            ("theme", "theme"),
            ("social_group", "social_group"),
            ("topic", "topic"),
            ("circulation_stage", "circulation_stage"),
            ("source_format", "source_format"),
            ("source_genre", "source_genre"),
            ("keyword", "keyword"),
        ],
        help_text="Which list the term belongs to. textile_type = named cloth types (Madras, Pulicat, Guinea, Gingham...). textile_form = Handkerchief / Other Piece Goods / Cloth / Garment / Furnishing. textile_pattern = Plain / Striped / Checked / Floral / Figural / Various. textile_colour = colours named. textile_term_as_recorded and textile_attribute are retired (2026-10-02); their terms stay with status retired. keyword = the 53-keyword list from the keyword workbook (loaded 2026-11-03); term_group holds the facet, notes the KW-id and broader term. theme = the old keyword list, kept for reference.",
    )
    label = models.TextField(help_text="The term.")
    variant_labels = models.TextField(
        null=True,
        blank=True,
        help_text="Spellings merged into this term, separated by '; '.",
    )
    external_uri = models.TextField(
        null=True,
        blank=True,
        help_text="Getty AAT or other authority URI. Empty: to fill.",
    )
    notes = models.TextField(null=True, blank=True, help_text="Curation notes.")
    status = models.TextField(
        choices=[("active", "active"), ("retired", "retired")],
        help_text="retired = no longer assigned; kept so old IDs still resolve.",
    )
    term_group = models.TextField(
        null=True,
        blank=True,
        help_text="For textile_type: Madras-family handkerchief, Other Indian handkerchief, Other Indian cloth, Indian or European, European cloth, West African cloth, Other Asian cloth.",
    )
    madras_family = models.BooleanField(
        null=True,
        blank=True,
        help_text="For textile_type: 1 = Madras-family handkerchief. 'Other textiles' filter = textile_type with madras_family = 0. Replaces the old 'Other' value.",
    )
    scope_note = models.TextField(
        null=True, blank=True, help_text="Short definition (gloss)."
    )
    scope_note_source = models.TextField(
        null=True, blank=True, help_text="Where the scope note comes from."
    )

    class Meta:
        db_table = "term"

    def __str__(self):
        return str(self.label or self.pk)


class TermAlias(models.Model):
    alias = models.TextField(help_text="Spelling as found in the records.")
    alias_normalized = models.TextField(help_text="Lower-cased alias, for matching.")
    term = models.ForeignKey(
        "Term", models.CASCADE, db_column="term_id", help_text="The standard term."
    )
    label = models.TextField(help_text="Standard term label (for reading).")
    vocabulary = models.TextField(
        choices=[
            ("textile_type", "textile_type"),
            ("textile_pattern", "textile_pattern"),
        ],
        help_text="Which vocabulary.",
    )
    language = models.TextField(
        null=True,
        blank=True,
        help_text="ISO 639-1 codes (639-3 where there is no 2-letter code), separated by '; ' (e.g. 'en; fr; es').",
    )
    note = models.TextField(null=True, blank=True, help_text="Notes on the spelling.")

    class Meta:
        db_table = "term_alias"
        constraints = [
            models.UniqueConstraint(
                fields=["alias", "term"], name="term_alias_alias_term_id_uniq"
            )
        ]

    def __str__(self):
        return str(self.label or self.pk)


class Source(NextId, models.Model):
    ID_PREFIX, ID_WIDTH = "SRC-", 4

    source_id = models.TextField(
        primary_key=True, blank=True, help_text="SRC-0001 format." + ID_HELP
    )
    citation = models.TextField(
        null=True,
        blank=True,
        help_text="The citation as written in the first record that uses it.",
    )
    holding_institution = models.TextField(
        null=True,
        blank=True,
        help_text="Most common holding institution among its records.",
    )
    archive_code = models.TextField(
        null=True, blank=True, help_text="Archive code as entered."
    )
    evidence_level = models.TextField(
        null=True, blank=True, help_text="Most common evidence level among its records."
    )
    source_url = models.TextField(
        null=True, blank=True, help_text="Link, where one of its records has one."
    )
    notes = models.TextField(null=True, blank=True, help_text="Notes.")

    class Meta:
        db_table = "source"

    def __str__(self):
        return str(self.pk)


class Item(NextId, models.Model):
    ID_PREFIX, ID_WIDTH = "CT-", 5

    item_id = models.TextField(
        primary_key=True,
        blank=True,
        help_text="Stable ID in CT-00001 format. Type-neutral on purpose: if a record is later retyped (for example document to visual_work) its ID does not change."
        + ID_HELP,
    )
    item_type = models.TextField(
        choices=[
            ("document", "document"),
            ("object", "object"),
            ("visual_work", "visual_work"),
        ],
        help_text="What kind of thing the record describes. document = text-based source; object = physical thing (textile, garment, model); visual_work = a depiction (painting, watercolour, print, map, fashion plate).",
    )
    record_status = models.TextField(
        choices=[
            ("staged", "staged"),
            ("internal", "internal"),
            ("published", "published"),
            ("merged", "merged"),
        ],
        help_text="staged = fetched from a museum API, not yet reviewed; internal = in the database but not public; published = public. Replaces the separate StagedMuseumItem table: promoting an item is a status change, not a copy to another table. merged = folded into another record (2026-10-02); see merged_into. Exclude from counts, maps and the public site; redirect the old ID.",
    )
    is_public = models.BooleanField(
        help_text="1 if the record may appear on the public site."
    )
    title = models.TextField(
        null=True,
        blank=True,
        help_text="Short title for pages, search results and map pop-ups. Drafts written 2026-11-03 to the pattern 'Kind: textile, place, date' (see title_status).",
    )
    title_status = models.TextField(
        null=True,
        blank=True,
        choices=[("draft", "draft"), ("final", "final")],
        help_text="draft = title generated 2026-11-03 from the record fields (Kind: textile, place, date); change to final once checked.",
    )
    summary = models.TextField(
        null=True,
        blank=True,
        help_text="Short prose description of the record, in project voice. From 'Summary of Record'.",
    )
    date_display = models.TextField(
        null=True,
        blank=True,
        help_text="Display date, generated from date_start, date_end and date_precision by one rule (see Format_Standards): 1792; ca. 1855; 1790s; 1791-1802; ca. 1855-1879; 18th century; ' (inferred)' added when date_certainty is inferred. The source's own wording is in date_as_recorded.",
    )
    date_start = models.IntegerField(
        null=True,
        blank=True,
        help_text="Earliest year the date could mean. Use for sorting, timelines, and filtering. See date_basis for what the date refers to.",
    )
    date_end = models.IntegerField(
        null=True,
        blank=True,
        help_text="Latest year the date could mean. Equal to date_start for a single year.",
    )
    date_precision = models.TextField(
        null=True,
        blank=True,
        choices=[
            ("year", "year"),
            ("circa", "circa"),
            ("decade", "decade"),
            ("range", "range"),
            ("circa_range", "circa_range"),
            ("century", "century"),
        ],
        help_text="How exact the date is. decade added 2026-10-02.",
    )
    date_basis = models.TextField(
        null=True,
        blank=True,
        choices=[
            ("document_or_event", "document_or_event"),
            ("period_described", "period_described"),
            ("publication_year", "publication_year"),
            ("object_date", "object_date"),
            ("unspecified", "unspecified"),
        ],
        help_text="What the date refers to. document_or_event = date of a primary source or the event it records; period_described = period a secondary source discusses; publication_year = the year is when a secondary source was published, and the period it describes has not been entered (date_start/date_end are left empty so it cannot pollute a timeline); object_date = production date of an object; unspecified = unclear.",
    )
    is_context_record = models.BooleanField(
        help_text="1 if the record gives background and has no textile attached (source value 'No textiles attached (context record)'). Filter these out of textile counts."
    )
    evidence_level = models.TextField(
        null=True,
        blank=True,
        choices=[
            ("primary", "primary"),
            ("primary_cited", "primary_cited"),
            ("secondary", "secondary"),
            ("oral_history", "oral_history"),
            ("unspecified", "unspecified"),
        ],
        help_text="primary = original source; primary_cited = primary source known only through a citation in another work; secondary = scholarship; oral_history = oral history. Museum objects are primary.",
    )
    holding_institution = models.TextField(
        null=True,
        blank=True,
        help_text="Archive, museum, or library that holds the original. PP expanded to Parliamentary Archives, UK (2026-11-03); MCC still a code. The code itself stays in document_detail.archive_code.",
    )
    source_identifier = models.TextField(
        null=True,
        blank=True,
        help_text="The holder's own ID: museum system number, accession number, or shelfmark.",
    )
    source_citation = models.TextField(
        null=True,
        blank=True,
        help_text="Full citation or reference as recorded (from 'Source Reference/URL' when it is a citation).",
    )
    source_url = models.TextField(
        null=True,
        blank=True,
        help_text="Link to the record at the holding institution or the online source.",
    )
    rights_statement = models.TextField(
        null=True,
        blank=True,
        help_text="Rights or licence statement. Drafted 2026-11-03 for images and objects (V&A terms, YCBA public domain, or work public domain with image rights to check). Empty for documents.",
    )
    ingest_method = models.TextField(
        null=True,
        blank=True,
        choices=[
            ("manual_entry", "manual_entry"),
            ("crawler_vam_api", "crawler_vam_api"),
        ],
        help_text="How the record got here.",
    )
    ingested_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="When a crawler fetched the record, UTC. Empty for manual entries.",
    )
    updated_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="Last update time in the source system, UTC.",
    )
    created_by = models.TextField(
        null=True, blank=True, help_text="Who created the record in the source system."
    )
    review_status = models.TextField(
        null=True,
        blank=True,
        choices=[("unreviewed", "unreviewed"), ("reviewed", "reviewed")],
        help_text="Review state for crawled items. Empty for hand-entered records.",
    )
    review_notes = models.TextField(null=True, blank=True, help_text="Reviewer notes.")
    legacy_system = models.TextField(
        help_text="Which source table the record came from: TextileRecord or StagedMuseumItem."
    )
    legacy_id = models.TextField(
        help_text="The ID in that source table (Database ID, or the museum's system number). Keeps every record traceable to the original export."
    )
    merged_into = models.ForeignKey(
        "self",
        models.SET_NULL,
        db_column="merged_into",
        null=True,
        blank=True,
        related_name="item_as_merged_into",
        help_text="For a merged record: the item_id that now holds its content. Its links (places, agents, terms, media, issues) were moved there; its own transcription row stays for audit.",
    )
    merged_ids = models.TextField(
        null=True,
        blank=True,
        help_text="For a surviving record: the item_ids merged into it, separated by '; '. Keep these working as redirects or search aliases.",
    )
    content_warning = models.TextField(
        null=True,
        blank=True,
        help_text="Content warning to show with the record on the public site. Values used so far: Descriptions of violence; Derogatory or racist language; People described as property. Several separated by '; '. Added 2026-11-03.",
    )
    source = models.ForeignKey(
        "Source",
        models.SET_NULL,
        db_column="source_id",
        null=True,
        blank=True,
        help_text="The source (book, volume, file, newspaper issue) the record comes from. Records citing the same source share one source row but stay separate records. Added 2026-11-03.",
    )
    date_certainty = models.TextField(
        null=True,
        blank=True,
        choices=[("stated", "stated"), ("inferred", "inferred")],
        help_text="stated = the date comes from the source or your instruction; inferred = worked out from the content (see the data_issue comment).",
    )
    date_as_recorded = models.TextField(
        null=True,
        blank=True,
        help_text="The date exactly as the source export had it (c.1855, ca.1855, 1926...). Kept for audit; not for display or sorting.",
    )
    date_note = models.TextField(
        null=True,
        blank=True,
        help_text="Words about the date that the display form can't carry (e.g. 'Early 20th century; published 1926').",
    )

    class Meta:
        db_table = "item"
        constraints = [
            models.UniqueConstraint(
                fields=["legacy_system", "legacy_id"],
                name="item_legacy_system_legacy_id_uniq",
            )
        ]
        indexes = [
            models.Index(fields=["record_status"]),
            models.Index(fields=["item_type"]),
            models.Index(fields=["date_start"]),
        ]

    def __str__(self):
        return str(self.title or self.pk)

    def save(self, *args, **kwargs):
        # Always regenerated so it can't go stale; kept as-is only when there are no year fields to build it from.
        self.date_display = (
            format_date(
                self.date_start, self.date_end, self.date_precision, self.date_certainty
            )
            or self.date_display
        )
        super().save(*args, **kwargs)


class DocumentDetail(models.Model):
    item = models.OneToOneField(
        "Item",
        models.CASCADE,
        db_column="item_id",
        primary_key=True,
        help_text="The record.",
    )
    archive_code = models.TextField(
        null=True,
        blank=True,
        help_text="Archive code as entered (TNA, BL, PP, ADLA, MCC, MUDEC). Only 23 records have one.",
    )
    publication_year = models.IntegerField(
        null=True,
        blank=True,
        help_text="Year a secondary source was published, where the source data's Year/Date turned out to be that year. See item.date_basis.",
    )

    class Meta:
        db_table = "document_detail"

    def __str__(self):
        return str(self.pk)


class ObjectDetail(models.Model):
    item = models.OneToOneField(
        "Item",
        models.CASCADE,
        db_column="item_id",
        primary_key=True,
        help_text="The record.",
    )
    object_type = models.TextField(
        null=True,
        blank=True,
        help_text="Museum's object type, for example 'Madras handkerchief'. Museum crawler does not capture it yet.",
    )
    materials_techniques = models.TextField(
        null=True,
        blank=True,
        help_text="Materials and techniques, for example 'Woven cotton'.",
    )
    physical_description = models.TextField(
        null=True,
        blank=True,
        help_text="Physical description, for example colour and pattern.",
    )
    dimensions_text = models.TextField(
        null=True, blank=True, help_text="Dimensions as the museum gives them."
    )
    accession_number = models.TextField(
        null=True,
        blank=True,
        help_text="Museum accession number. Not captured by the crawler yet.",
    )
    credit_line = models.TextField(null=True, blank=True, help_text="Credit line.")
    marks_inscriptions = models.TextField(
        null=True,
        blank=True,
        help_text="Labels, stamps, inscriptions. The V&A record checked (O480828) carries 1855 Paris Exposition label text here.",
    )
    object_history = models.TextField(
        null=True, blank=True, help_text="Transfer and ownership history."
    )
    collection_code = models.TextField(
        null=True,
        blank=True,
        help_text="Museum's internal collection or department code.",
    )

    class Meta:
        db_table = "object_detail"

    def __str__(self):
        return str(self.pk)


class VisualDetail(models.Model):
    item = models.OneToOneField(
        "Item",
        models.CASCADE,
        db_column="item_id",
        primary_key=True,
        help_text="The record.",
    )
    visual_form = models.TextField(
        null=True,
        blank=True,
        choices=[
            ("painting", "painting"),
            ("watercolour", "watercolour"),
            ("print_or_illustration", "print_or_illustration"),
            ("fashion_plate", "fashion_plate"),
            ("map", "map"),
            ("figure_or_model", "figure_or_model"),
            ("other", "other"),
        ],
        help_text="What kind of image it is. Set from the record summary where the summary says so; otherwise empty.",
    )
    depicts_textile = models.TextField(
        null=True,
        blank=True,
        choices=[("yes", "yes"), ("no", "no"), ("unclear", "unclear")],
        help_text="Whether a Madras or checked textile is visibly shown. Left empty for the scholar to decide; this is an interpretive call.",
    )

    class Meta:
        db_table = "visual_detail"

    def __str__(self):
        return str(self.pk)


class ItemText(models.Model):
    text_id = models.AutoField(primary_key=True, help_text="Row ID.")
    item = models.ForeignKey(
        "Item", models.CASCADE, db_column="item_id", help_text="The record."
    )
    text_role = models.TextField(
        choices=[("transcription", "transcription"), ("translation", "translation")],
        help_text="transcription = text of or excerpt from the source, as in 'Transcription/Excerpt'. translation = English rendering (none yet).",
    )
    language = models.TextField(
        null=True,
        blank=True,
        help_text="ISO 639-1 code (en, fr, da...). Empty for now: not recorded in the source.",
    )
    status = models.TextField(
        choices=[("present", "present"), ("needed", "needed")],
        help_text="needed = source said 'transcription required'.",
    )
    text_body = models.TextField(null=True, blank=True, help_text="The text.")

    class Meta:
        db_table = "item_text"

    def __str__(self):
        return str(self.pk)


class Media(models.Model):
    media_id = models.AutoField(primary_key=True, help_text="Row ID.")
    item = models.ForeignKey(
        "Item",
        models.CASCADE,
        db_column="item_id",
        help_text="The record the image shows.",
    )
    media_type = models.TextField(
        choices=[
            ("image", "image"),
            ("thumbnail", "thumbnail"),
            ("iiif_manifest", "iiif_manifest"),
        ],
        help_text="image = full image in the project's own storage; thumbnail = museum-hosted thumbnail; iiif_manifest = IIIF Presentation manifest at the museum.",
    )
    storage_key = models.TextField(
        null=True,
        blank=True,
        help_text="Path of the file in the project's object storage, with the temporary signing parameters stripped. Build a fresh signed link from this when needed.",
    )
    external_url = models.TextField(
        null=True, blank=True, help_text="URL at the museum (thumbnail or manifest)."
    )
    is_primary = models.BooleanField(help_text="1 for the main image of the item.")

    class Meta:
        db_table = "media"

    def __str__(self):
        return str(self.pk)


class ItemTextile(models.Model):
    item = models.OneToOneField(
        "Item",
        models.CASCADE,
        db_column="item_id",
        primary_key=True,
        help_text="The record.",
    )
    textile_term_as_written = models.TextField(
        null=True,
        blank=True,
        help_text="The cloth name(s) exactly as in the source, original language and spelling, separated by '; '.",
    )
    needs_review = models.TextField(
        null=True,
        blank=True,
        help_text="Open question about the textile values (also in data_issue as textile_review).",
    )
    change_note = models.TextField(
        null=True,
        blank=True,
        help_text="What changed in the 2026-10-02 revision and why.",
    )

    class Meta:
        db_table = "item_textile"

    def __str__(self):
        return str(self.pk)


class ItemPlace(models.Model):
    item_place_id = models.AutoField(primary_key=True, help_text="Row ID.")
    item = models.ForeignKey(
        "Item", models.CASCADE, db_column="item_id", help_text="The record."
    )
    place = models.ForeignKey(
        "Place", models.PROTECT, db_column="place_id", help_text="The place."
    )
    role = models.TextField(
        choices=[
            ("origin", "origin"),
            ("destination", "destination"),
            ("via", "via"),
            ("made", "made"),
            ("subject", "subject"),
            ("place_of_interest", "place_of_interest"),
            ("depicted", "depicted"),
            ("textile_place_named", "textile_place_named"),
        ],
        help_text="origin/destination = where goods came from / went to (textual records). made = where an object was made (museum items; also Origin Place of records retyped as objects). subject = place the record is about. depicted = place shown in an image (for records retyped as visual works this is the source's Destination Place, certainty 'likely'). textile_place_named = a place that qualifies a cloth name (Madras ginghams, Romals Madras); not where goods went. Excluded from map_points. via = a place the goods passed through on the way (added 2026-11-03; drawn as the middle of a route in movement). place_of_interest = a place the record talks about that is not where the goods came from or went: a ban in Holland, an exhibition in Paris, imitations made in Glasgow (added 2026-11-03; activity 'discussion', shown as 'Places discussed').",
    )
    precision = models.TextField(
        choices=[("place", "place"), ("area", "area")],
        help_text="area = the source only gave a broad area (Origin Area), so the link goes to a macro_region place.",
    )
    certainty = models.TextField(
        choices=[("certain", "certain"), ("likely", "likely")],
        help_text="likely where the source hedged, for example 'Manila (likely)'.",
    )
    verbatim = models.TextField(
        null=True,
        blank=True,
        help_text="The place text exactly as in the source, so nothing is lost when a value is split or corrected.",
    )
    sequence = models.IntegerField(
        help_text="Order when a source value listed several places."
    )
    activity = models.TextField(
        null=True,
        blank=True,
        choices=[
            ("production", "production"),
            ("circulation", "circulation"),
            ("consumption", "consumption"),
            ("depiction", "depiction"),
            ("discussion", "discussion"),
        ],
        help_text="What happened at this place, for the map. Set by rule from role and the record's circulation stage (see activity_basis); edit where the rule is wrong. Empty for textile_place_named. discussion is used for place_of_interest links.",
    )
    activity_basis = models.TextField(
        null=True,
        blank=True,
        help_text="How the activity was set ('rule: ...'). Change to 'reviewed' when checked.",
    )

    class Meta:
        db_table = "item_place"
        indexes = [models.Index(fields=["role"])]

    def __str__(self):
        return str(self.pk)


class ItemAgent(models.Model):
    item_agent_id = models.AutoField(primary_key=True, help_text="Row ID.")
    item = models.ForeignKey(
        "Item", models.CASCADE, db_column="item_id", help_text="The record."
    )
    agent = models.ForeignKey(
        "Agent", models.PROTECT, db_column="agent_id", help_text="The agent."
    )
    role = models.TextField(
        choices=[
            ("creator", "creator"),
            ("artist", "artist"),
            ("maker", "maker"),
            ("subject", "subject"),
            ("interviewee", "interviewee"),
        ],
        help_text="creator = author or issuer of the source (Record Creator). artist = maker of a visual work. maker = manufacturer of an object. subject = person or body the record is about. interviewee = interviewed in the source.",
    )
    is_primary = models.BooleanField(
        help_text="For subjects: 1 if it came from 'Primary Subjects', 0 from 'Secondary Subjects'."
    )
    verbatim = models.TextField(
        null=True, blank=True, help_text="The value exactly as in the source."
    )

    class Meta:
        db_table = "item_agent"

    def __str__(self):
        return str(self.pk)


class ItemTerm(models.Model):
    item_term_id = models.AutoField(primary_key=True, help_text="Row ID.")
    item = models.ForeignKey(
        "Item", models.CASCADE, db_column="item_id", help_text="The record."
    )
    term = models.ForeignKey(
        "Term", models.PROTECT, db_column="term_id", help_text="The term."
    )
    role = models.TextField(
        choices=[(r, r) for r in ["textile_type", "textile_form", "textile_pattern", "textile_colour",
                                  "garment_category", "keyword", "subject", "circulation_stage",
                                  "source_format", "source_genre", "legacy_theme"]],  # fmt: skip
        help_text="How the term applies: textile_type, textile_form, textile_pattern, textile_colour, garment_category, keyword, subject, circulation_stage, source_format, source_genre, legacy_theme. keyword links point to the new keyword vocabulary (2026-11-03); legacy_theme keeps the old theme links that were used as keywords before."
    )
    is_primary = models.BooleanField(
        help_text="For textile_type: 1 on the first-listed type. For subjects: 1 if from 'Primary Subjects'. 0 for other roles."
    )
    verbatim = models.TextField(
        null=True,
        blank=True,
        help_text="The value exactly as in the source, where it was normalized.",
    )

    class Meta:
        db_table = "item_term"
        indexes = [models.Index(fields=["role"])]

    def __str__(self):
        return str(self.pk)


class Relationship(models.Model):
    relationship_id = models.AutoField(primary_key=True, help_text="Row ID.")
    from_item = models.ForeignKey(
        "Item",
        models.CASCADE,
        db_column="from_item_id",
        related_name="relationship_as_from_item",
        help_text="Subject of the relationship.",
    )
    rel_type = models.TextField(
        choices=[
            ("see_also", "see_also"),
            ("depicts", "depicts"),
            ("illustrates", "illustrates"),
            ("part_of", "part_of"),
            ("possibly_related_to", "possibly_related_to"),
            ("same_object_as", "same_object_as"),
            ("cites", "cites"),
        ],
        help_text="see_also = editorial cross-reference. depicts = visual work shows the textile object. illustrates = visual work illustrates the document. part_of = component of a larger item. possibly_related_to = proposed link needing review. same_object_as = same physical object catalogued twice. cites = one record's source cites another.",
    )
    to_item = models.ForeignKey(
        "Item",
        models.CASCADE,
        db_column="to_item_id",
        related_name="relationship_as_to_item",
        help_text="Object of the relationship.",
    )
    confidence = models.TextField(
        choices=[
            ("certain", "certain"),
            ("probable", "probable"),
            ("possible", "possible"),
        ],
        help_text="How sure the link is.",
    )
    status = models.TextField(
        choices=[("confirmed", "confirmed"), ("proposed", "proposed")],
        help_text="proposed = made by a script or inference, awaiting a scholar's decision. Filter on this before using links in analysis.",
    )
    basis = models.TextField(null=True, blank=True, help_text="Why the link exists.")

    class Meta:
        db_table = "relationship"

    def __str__(self):
        return str(self.pk)


class Movement(models.Model):
    movement_id = models.AutoField(primary_key=True, help_text="Row ID.")
    item = models.ForeignKey(
        "Item",
        models.CASCADE,
        db_column="item_id",
        null=True,
        blank=True,
        help_text="The record.",
    )
    leg = models.IntegerField(
        null=True, blank=True, help_text="Order along the route; empty when unknown."
    )
    from_place = models.ForeignKey(
        "Place",
        models.SET_NULL,
        db_column="from_place_id",
        null=True,
        blank=True,
        related_name="movement_as_from_place",
        help_text="Starting place.",
    )
    to_place = models.ForeignKey(
        "Place",
        models.SET_NULL,
        db_column="to_place_id",
        null=True,
        blank=True,
        related_name="movement_as_to_place",
        help_text="Ending place.",
    )
    order_status = models.TextField(
        null=True,
        blank=True,
        choices=[("known", "known"), ("unknown", "unknown"), ("parallel", "parallel")],
        help_text="unknown = several origins or destinations and the order is not stated; every pair listed. parallel = separate routes from the same record (for example two markets), each one leg long (added 2026-11-03).",
    )
    from_precision = models.TextField(
        null=True, blank=True, choices=[("place", "place"), ("area", "area")]
    )
    to_precision = models.TextField(
        null=True, blank=True, choices=[("place", "place"), ("area", "area")]
    )
    certainty = models.TextField(
        null=True,
        blank=True,
        choices=[("certain", "certain"), ("likely", "likely")],
        help_text="likely if either end is likely.",
    )
    basis = models.TextField(
        null=True, blank=True, help_text="Why the movement exists."
    )

    class Meta:
        db_table = "movement"

    def __str__(self):
        return str(self.pk)


class TradeObservation(models.Model):
    observation_id = models.AutoField(primary_key=True, help_text="Row ID.")
    item = models.ForeignKey(
        "Item",
        models.CASCADE,
        db_column="item_id",
        help_text="The record the figure comes from.",
    )
    observation_type = models.TextField(
        null=True,
        blank=True,
        choices=[
            ("price", "price"),
            ("quantity", "quantity"),
            ("unit_definition", "unit_definition"),
            ("export_volume", "export_volume"),
        ],
        help_text="What the row records. unit_definition = a packing or measuring unit stated in the source (a corge = 20 pieces); leave these out of volume counts. Added 2026-11-03.",
    )
    textile_description = models.TextField(
        null=True,
        blank=True,
        help_text="What was priced or counted, in the source's words.",
    )
    quantity = models.FloatField(
        null=True, blank=True, help_text="Number of units, as written in the source."
    )
    quantity_unit = models.TextField(
        null=True, blank=True, help_text="Unit (pieces, yards...)."
    )
    amount_value = models.FloatField(
        null=True,
        blank=True,
        help_text="The price as a number, in the currency named in currency_original. Empty when the source notation cannot be turned into one number without a decision (for example 1.0.0 pounds/shillings/pence).",
    )
    amount_decimal = models.FloatField(
        null=True,
        blank=True,
        help_text="The amount as one decimal number in amount_decimal_unit. Rupees.annas: rupees + annas/16. Pounds.shillings.pence: pounds + shillings/20 + pence/240. Livres.sols.deniers the same way. No conversion between currencies. Added 2026-11-03.",
    )
    amount_decimal_unit = models.TextField(
        null=True,
        blank=True,
        help_text="Unit of amount_decimal (rupee, pound, livre tournois, guilder, real, dollar, pagoda, bitt, franc).",
    )
    currency_original = models.TextField(
        null=True, blank=True, help_text="Currency word exactly as recorded."
    )
    currency_std = models.TextField(
        null=True,
        blank=True,
        help_text="Normalized currency name. No conversion is made between currencies.",
    )
    price_unit = models.TextField(
        null=True, blank=True, help_text="What the price is per (piece, yard...)."
    )
    price_role = models.TextField(
        null=True,
        blank=True,
        help_text="Kind of price if given (weaver's price, selling price).",
    )
    price_text_original = models.TextField(
        null=True, blank=True, help_text="The price text exactly as in the source."
    )
    needs_review = models.BooleanField(
        help_text="1 if the figure is unparsed, an assumption was made, or the source's arithmetic does not add up (see notes, 'FLAG')."
    )
    notes = models.TextField(
        null=True, blank=True, help_text="What was assumed or left undone."
    )
    extraction_method = models.TextField(
        null=True,
        blank=True,
        help_text="Where the row came from: 'Price column (2026-09-21)' or 'transcription (2026-11-03)'.",
    )

    class Meta:
        db_table = "trade_observation"

    def __str__(self):
        return str(self.pk)


class SourcePayload(models.Model):
    payload_id = models.AutoField(
        primary_key=True, help_text="Row ID (several fetches per item allowed)."
    )
    item = models.ForeignKey(
        "Item", models.CASCADE, db_column="item_id", help_text="The record."
    )
    source_system = models.TextField(help_text="For example 'V&A API'.")
    payload_text = models.TextField(
        help_text="The text as stored. For the current V&A items this is only the three-field 'API Data Summary'. The crawler should store the complete JSON here."
    )
    fetched_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="When fetched, UTC.",
    )

    class Meta:
        db_table = "source_payload"

    def __str__(self):
        return str(self.pk)


class Collection(NextId, models.Model):
    ID_PREFIX, ID_WIDTH = "COL-", 2

    collection_id = models.TextField(
        primary_key=True, blank=True, help_text="COL-01 format." + ID_HELP
    )
    name = models.TextField(help_text="Name shown on the map.")
    marker_place = models.ForeignKey(
        "Place",
        models.SET_NULL,
        db_column="marker_place_id",
        null=True,
        blank=True,
        help_text="Where the single marker goes.",
    )
    activity = models.TextField(null=True, blank=True, help_text="Activity shown.")
    marker_rule = models.TextField(
        null=True, blank=True, help_text="How the map should draw it."
    )

    class Meta:
        db_table = "collection"

    def __str__(self):
        return str(self.name or self.pk)


class CollectionItem(models.Model):
    collection = models.ForeignKey(
        "Collection", models.CASCADE, db_column="collection_id", help_text="Collection."
    )
    item = models.ForeignKey(
        "Item", models.CASCADE, db_column="item_id", help_text="Record in it."
    )

    class Meta:
        db_table = "collection_item"
        constraints = [
            models.UniqueConstraint(
                fields=["collection", "item"],
                name="collection_item_collection_id_item_id_uniq",
            )
        ]

    def __str__(self):
        return str(self.pk)


class DataIssue(models.Model):
    issue_id = models.AutoField(primary_key=True, help_text="Row ID.")
    item = models.ForeignKey(
        "Item",
        models.CASCADE,
        db_column="item_id",
        null=True,
        blank=True,
        help_text="The record concerned. Empty for issues affecting the whole dataset or a vocabulary.",
    )
    legacy_id = models.TextField(
        null=True,
        blank=True,
        help_text="Original Database ID or museum system number, for finding it in the old system.",
    )
    issue_type = models.TextField(
        help_text="Category, for example date_semantics, place_unresolved, retyped_record."
    )
    severity = models.TextField(
        choices=[("high", "high"), ("medium", "medium"), ("low", "low")],
        help_text="high = affects analysis results or blocks publication; medium = should fix; low = tidy-up.",
    )
    field = models.TextField(null=True, blank=True, help_text="Field concerned.")
    detail = models.TextField(help_text="What was found.")
    suggested_action = models.TextField(null=True, blank=True, help_text="What to do.")
    status = models.TextField(
        choices=[("open", "open"), ("closed", "closed")],
        help_text="open until dealt with; closed once done (what was done is in comments_and_notes_to_take_action).",
    )
    comments_and_notes_to_take_action = models.TextField(
        null=True, blank=True, help_text="What was decided or still needs doing."
    )

    class Meta:
        db_table = "data_issue"
        indexes = [models.Index(fields=["status"])]

    def __str__(self):
        return str(self.pk)


class NormalizationLog(models.Model):
    log_id = models.AutoField(primary_key=True, help_text="Row ID.")
    field = models.TextField(null=True, blank=True, help_text="Source field.")
    original_value = models.TextField(
        null=True, blank=True, help_text="Value as found."
    )
    becomes = models.TextField(null=True, blank=True, help_text="What it became.")
    kind = models.TextField(null=True, blank=True, help_text="Kind of change.")
    n_records = models.IntegerField(
        null=True, blank=True, help_text="Records affected."
    )

    class Meta:
        db_table = "normalization_log"

    def __str__(self):
        return str(self.pk)
