import json
from pathlib import Path
from unittest.mock import patch

import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse

from catalog.models import DataIssue, Item, Place, PlaceAlias
from crawler.services import cooper_hewitt_fetched, vam_fetched
from crawler.staging import parse_date, stage

VAM = json.loads((Path(__file__).parent / "test_data" / "vam_O495310.json").read_text())


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
    f = vam_fetched(VAM["hit"], VAM["full"])
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


def test_cooper_hewitt_fields():
    f = cooper_hewitt_fetched({
        "id": 18734, "title": "Handkerchief", "date": "ca. 1850", "type": "Textile",
        "medium": "Cotton", "url": "https://collection.cooperhewitt.org/objects/18734/",
        "woe:country_name": "India", "description": "Checked cotton.",
        "images": [{"sq": {"url": "https://img/sq.jpg"}, "b": {"url": "https://img/b.jpg"}}],
    })  # fmt: skip
    assert (f.identifier, f.title) == ("18734", "Handkerchief (Cooper Hewitt 18734)")
    assert (f.image_url, f.thumbnail_url) == ("https://img/b.jpg", "https://img/sq.jpg")
    assert f.detail == {"object_type": "Textile", "materials_techniques": "Cotton"}


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
    item, created = stage(vam_fetched(VAM["hit"], VAM["full"]), download=download)
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
    stage(vam_fetched(VAM["hit"], VAM["full"]), download=download)
    item, created = stage(vam_fetched(VAM["hit"], VAM["full"]), download=download)
    assert not created
    assert Item.objects.count() == 1
    assert item.sourcepayload_set.count() == 1  # unchanged payload is not stored twice
    assert item.itemplace_set.count() == 1
    assert item.media_set.count() == 3
    assert len(calls) == 1  # image downloaded once


def test_restage_never_overwrites_a_reviewed_record(china):
    item, _ = stage(vam_fetched(VAM["hit"], VAM["full"]))
    Item.objects.filter(pk=item.pk).update(title="Curated title", summary=None,
                                           review_status="reviewed")  # fmt: skip
    item.objectdetail.credit_line = "Edited credit"
    item.objectdetail.save()
    item, _ = stage(vam_fetched(VAM["hit"], VAM["full"]))
    item.refresh_from_db()
    assert item.title == "Curated title"
    assert item.summary.startswith("Brush Pot")  # empty field filled
    assert item.objectdetail.credit_line == "Edited credit"


def test_staging_matches_items_loaded_from_the_old_crawler(china):
    old = Item.objects.create(item_type="object", record_status="published", is_public=True,
                              is_context_record=False, legacy_system="StagedMuseumItem",
                              legacy_id="O495310", holding_institution="Victoria and Albert Museum",
                              source_identifier="O495310", title="Textile, China")  # fmt: skip
    item, created = stage(vam_fetched(VAM["hit"], VAM["full"]))
    assert (item.pk, created) == (old.pk, False)
    assert (item.record_status, item.is_public, item.title) == (
        "published",
        True,
        "Textile, China",
    )


def test_unmatched_place_and_maker_go_to_the_review_queue(db):
    f = vam_fetched(VAM["hit"], VAM["full"])
    f.maker = "Unknown Workshop"
    item, _ = stage(f)
    stage(f)  # not raised twice
    issues = DataIssue.objects.filter(item=item).values_list("issue_type", flat=True)
    assert sorted(issues) == ["agent_review", "place_unresolved"]


def test_placeholder_maker_is_not_queued(db):
    f = vam_fetched(VAM["hit"], VAM["full"])
    f.maker = "Unknown"
    item, _ = stage(f)
    assert not DataIssue.objects.filter(item=item, issue_type="agent_review").exists()


def test_admin_fetch_button_runs_the_crawler(client, db, settings):
    settings.STORAGES = {**settings.STORAGES, "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"}}  # fmt: skip
    client.force_login(
        get_user_model().objects.create_superuser("a", "a@example.invalid", "x")
    )
    with patch(
        "crawler.services.MuseumAPIClient.fetch_vam", return_value=(2, 3)
    ) as fetch:
        response = client.get(reverse("admin:catalog_item_fetch_vam"), follow=True)
    fetch.assert_called_once()
    assert "V&amp;A: 2 new staged records, 3 refreshed." in response.content.decode()
    assert (
        "Fetch V&A"
        in client.get(reverse("admin:catalog_item_changelist")).content.decode()
    )
