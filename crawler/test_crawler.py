import json
from pathlib import Path

import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse

from catalog.models import DataIssue, Item, Place, PlaceAlias
from crawler.models import CrawlSource
from crawler.services import cooper_hewitt_fetched, vam_fetched
from crawler.staging import parse_date, stage

VAM = json.loads((Path(__file__).parent / "test_data" / "vam_O495310.json").read_text())
# Unsaved sources: staging only reads their settings.
VAM_SOURCE = CrawlSource(name="V&A API", kind="vam", holding_institution="Victoria and Albert Museum",
                         short_name="V&A", rights_statement="Image © V&A.")  # fmt: skip
CH_SOURCE = CrawlSource(name="Cooper Hewitt API", kind="cooper_hewitt", short_name="Cooper Hewitt",
                        holding_institution="Cooper Hewitt, Smithsonian Design Museum")  # fmt: skip


@pytest.mark.parametrize(
    "text, expected",
    [
        ("1855", (1855, 1855, "year")),
        ("ca. 1855", (1855, 1855, "circa")),
        ("c. 1840-1860", (1840, 1860, "circa_range")),
        ("1923-4", (1923, 1924, "range")),
        ("1790s", (1790, 1799, "decade")),
        ("18th century", (1700, 1799, "century")),
        ("unknown", (None, None, None)),
        ("", (None, None, None)),
    ],
)
def test_parse_date(text, expected):
    assert parse_date(text) == expected


def test_parse_date_prefers_api_years():
    assert parse_date("18th century", 1700, 1799) == (1700, 1799, "century")
    assert parse_date("ca. 1855", 1850, 1860) == (1850, 1860, "circa_range")


def test_vam_fields_from_a_real_record():
    f = vam_fetched(VAM["hit"], VAM["full"], VAM_SOURCE)
    assert f.identifier == "O495310"
    assert f.title == "Brush Pot, China, 18th century (V&A O495310)"
    assert f.summary.startswith("Brush Pot, porcelain")
    assert (f.date_text, f.date_start, f.date_end) == ("18th century", 1700, 1799)
    assert f.place == "China"
    assert f.image_url.endswith("/full/!1000,1000/0/default.jpg")
    assert f.manifest_url.endswith("O495310/manifest.json")
    assert f.detail["accession_number"] == "CIRC.350-1931"
    assert f.detail["materials_techniques"].startswith(
        "Porcelain"
    )  # V&A's own combined text
    assert "Height 15.2 cm" in f.detail["dimensions_text"]
    assert f.source_updated.year == 2025


def test_cooper_hewitt_graphql_fields():
    f = cooper_hewitt_fetched({
        "id": "object-18734", "collectionsOnlineId": "18734",
        "summary": {"title": "Handkerchief"}, "date": [{"value": "ca. 1850"}],
        "medium": [{"value": "Cotton"}], "description": [{"value": "Checked cotton."}],
        "classification": [{"summary": {"title": "Textile"}}],
        "geography": {"country": {"value": "India"}},
        "identifier": [{"type": "accession number", "value": "1938-88-1"}],
        "multimedia": [{"large": {"url": "https://img/b.jpg"}, "preview": {"url": "https://img/sq.jpg"}}],
    }, CH_SOURCE)  # fmt: skip
    assert (f.identifier, f.title) == ("18734", "Handkerchief (Cooper Hewitt 18734)")
    assert (f.date_text, f.place, f.summary) == ("ca. 1850", "India", "Checked cotton.")
    assert f.source_url == "https://www.si.edu/object/chndm_1938-88-1"
    assert (f.image_url, f.thumbnail_url) == ("https://img/b.jpg", "https://img/sq.jpg")
    assert f.detail == {"object_type": "Textile", "materials_techniques": "Cotton",
                        "accession_number": "1938-88-1"}  # fmt: skip


@pytest.fixture
def china(db):
    place = Place.objects.create(place_id="PL-001", name_preferred="China", place_type="country",
                                 coord_status="not_applicable", map_level="area")  # fmt: skip
    PlaceAlias.objects.create(alias="china", place=place, alias_type="preferred")
    return place


def downloads():
    calls = []

    def download(url, name):
        calls.append(url)
        return name

    return download, calls


def test_stage_creates_a_staged_object(china):
    download, calls = downloads()
    item, created = stage(
        vam_fetched(VAM["hit"], VAM["full"], VAM_SOURCE), download=download
    )
    assert created
    assert (item.item_type, item.record_status, item.is_public) == (
        "object",
        "staged",
        False,
    )
    assert (item.holding_institution, item.source_identifier) == (
        "Victoria and Albert Museum",
        "O495310",
    )
    assert item.date_display == "18th century"
    assert item.objectdetail.object_type == "Brush Pot"
    assert sorted(item.media_set.values_list("media_type", flat=True)) == [
        "iiif_manifest",
        "image",
        "thumbnail",
    ]
    assert (
        item.media_set.get(media_type="image").storage_key == "staged_items/O495310.jpg"
    )
    made = item.itemplace_set.get(role="made")
    assert (made.place, made.precision, made.activity) == (china, "area", "production")
    assert item.sourcepayload_set.count() == 1
    assert len(calls) == 1


def test_restage_updates_in_place_without_duplicates(china):
    download, calls = downloads()
    stage(vam_fetched(VAM["hit"], VAM["full"], VAM_SOURCE), download=download)
    item, created = stage(
        vam_fetched(VAM["hit"], VAM["full"], VAM_SOURCE), download=download
    )
    assert not created
    assert Item.objects.count() == 1
    assert item.sourcepayload_set.count() == 1  # unchanged payload is not stored twice
    assert item.itemplace_set.count() == 1
    assert item.media_set.count() == 3
    assert len(calls) == 1  # image downloaded once


def test_restage_never_overwrites_a_reviewed_record(china):
    item, _ = stage(vam_fetched(VAM["hit"], VAM["full"], VAM_SOURCE))
    Item.objects.filter(pk=item.pk).update(title="Curated title", summary=None,
                                           review_status="reviewed")  # fmt: skip
    item.objectdetail.credit_line = "Edited credit"
    item.objectdetail.save()
    item, _ = stage(vam_fetched(VAM["hit"], VAM["full"], VAM_SOURCE))
    item.refresh_from_db()
    assert item.title == "Curated title"
    assert item.summary.startswith("Brush Pot")  # empty field filled
    assert item.objectdetail.credit_line == "Edited credit"


def test_staging_matches_items_loaded_from_the_old_crawler(china):
    old = Item.objects.create(item_type="object", record_status="published", is_public=True,
                              is_context_record=False, legacy_system="StagedMuseumItem",
                              legacy_id="O495310", holding_institution="Victoria and Albert Museum",
                              source_identifier="O495310", title="Textile, China")  # fmt: skip
    item, created = stage(vam_fetched(VAM["hit"], VAM["full"], VAM_SOURCE))
    assert (item.pk, created) == (old.pk, False)
    assert (item.record_status, item.is_public, item.title) == (
        "published",
        True,
        "Textile, China",
    )


def test_unmatched_place_and_maker_go_to_the_review_queue(db):
    f = vam_fetched(VAM["hit"], VAM["full"], VAM_SOURCE)
    f.maker = "Unknown Workshop"
    item, _ = stage(f)
    stage(f)  # not raised twice
    issues = DataIssue.objects.filter(item=item).values_list("issue_type", flat=True)
    assert sorted(issues) == ["agent_review", "place_unresolved"]


def test_placeholder_maker_is_not_queued(db):
    f = vam_fetched(VAM["hit"], VAM["full"], VAM_SOURCE)
    f.maker = "Unknown"
    item, _ = stage(f)
    assert not DataIssue.objects.filter(item=item, issue_type="agent_review").exists()


@pytest.fixture
def admin_client(client, db, settings):
    settings.STORAGES = {**settings.STORAGES, "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"}}  # fmt: skip
    client.force_login(
        get_user_model().objects.create_superuser("a", "a@example.invalid", "x")
    )
    return client


def test_queue_offers_a_run_button_per_enabled_source(admin_client):
    queue = admin_client.get(
        reverse("admin:catalog_crawleditem_changelist")
    ).content.decode()
    assert "Run V&amp;A API" in queue  # seeded and enabled
    assert "Run Cooper Hewitt API" not in queue  # seeded but switched off
    records = admin_client.get(
        reverse("admin:catalog_item_changelist")
    ).content.decode()
    assert "Run V&amp;A API" not in records


def test_crawled_items_queue_and_promotion(admin_client, china):
    crawled, _ = stage(vam_fetched(VAM["hit"], VAM["full"], VAM_SOURCE))
    manual = Item.objects.create(item_type="document", record_status="internal", is_public=False,
                                 is_context_record=False, legacy_system="test", legacy_id="1")  # fmt: skip
    queue = admin_client.get(reverse("admin:catalog_crawleditem_changelist"))
    assert [i.pk for i in queue.context["cl"].result_list] == [crawled.pk]
    records = admin_client.get(reverse("admin:catalog_item_changelist"))
    assert [i.pk for i in records.context["cl"].result_list] == [
        manual.pk
    ]  # staged kept out

    def promote():
        admin_client.post(reverse("admin:catalog_crawleditem_changelist"),
                          {"action": "promote_to_records", "_selected_action": [crawled.pk]})  # fmt: skip
        crawled.refresh_from_db()

    promote()
    assert crawled.record_status == "staged"  # not reviewed yet
    Item.objects.filter(pk=crawled.pk).update(review_status="reviewed")
    promote()
    assert (crawled.record_status, crawled.is_public) == ("internal", False)
    records = admin_client.get(reverse("admin:catalog_item_changelist"))
    assert crawled.pk in [i.pk for i in records.context["cl"].result_list]
