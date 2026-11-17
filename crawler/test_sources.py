import json
from datetime import timedelta
from pathlib import Path
from unittest.mock import patch

import pytest
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.urls import reverse
from django.utils import timezone

from catalog.linking import LinkError
from catalog.models import Item
from crawler.adapters import (
    as_text,
    cooper_hewitt_records,
    dig,
    iiif_records,
    json_records,
)
from crawler.models import CrawlRun, CrawlSource
from crawler.runs import AlreadyRunning, active_run, execute_run, start_run

CATALOG_DATA = Path(__file__).resolve().parents[1] / "catalog" / "test_data"
V2 = json.loads((CATALOG_DATA / "iiif_v2_vam.json").read_text())
V3 = json.loads((CATALOG_DATA / "iiif_v3_wellcome.json").read_text())


class FakeClient:
    """Answers get_json from {url: data} (ignoring params) and graphql from a list."""

    def __init__(self, pages=None, graphql=()):
        self.pages, self.graphql_answers, self.calls = pages or {}, list(graphql), []

    def get_json(self, url, params=None):
        self.calls.append((url, dict(params or {})))
        answer = self.pages[url]
        return answer(params or {}) if callable(answer) else answer

    def graphql(self, url, query):
        self.calls.append((url, query))
        return self.graphql_answers.pop(0)

    def download_image(self, url, name):
        return name


def json_source(**mapping):
    return CrawlSource(name="Test JSON", kind="json_api", holding_institution="Test Museum",
                       short_name="TM", url="https://api.example.org/search",
                       params={"q": "madras"}, mapping=mapping)  # fmt: skip


FIELDS = {"id": "objectID", "title": "title", "date": "date", "image": "images.0.url",
          "page_url": "url", "maker": "people"}  # fmt: skip


def test_dig_and_as_text():
    data = {"a": {"b": [{"c": 1}, {"c": 2}]}, "list": ["x", None, "y"]}
    assert dig(data, "a.b.1.c") == 2
    assert dig(data, "a.b.5.c") is None and dig(data, "a.x") is None
    assert dig([1, 2], "") == [1, 2]  # empty path: the whole answer
    assert (
        as_text(data["list"]) == "x; y"
        and as_text({"k": 1}) == ""
        and as_text(7) == "7"
    )


def test_json_api_pages_and_maps_fields():
    def page(params):
        n = params["page"]
        return {"data": {"items": [{"objectID": f"{n}-{i}", "title": f"Cloth {n}-{i}"} for i in range(2)]
                         if n < 3 else []}}  # fmt: skip

    source = json_source(records="data.items", fields=FIELDS,
                         pagination={"style": "page", "param": "page", "start": 1})  # fmt: skip
    client = FakeClient({source.url: page})
    records = list(json_records(source, client))
    assert [r.identifier for r in records] == ["1-0", "1-1", "2-0", "2-1"]
    assert records[0].title == "Cloth 1-0 (TM 1-0)"
    assert not records[0].store_image  # linked, not copied
    assert client.calls[0][1] == {"q": "madras", "page": 1}


def test_json_api_follows_next_links_and_detail_urls():
    source = json_source(records="results", fields=FIELDS,
                         pagination={"style": "next", "next": "next"},
                         detail_url="https://api.example.org/objects/{id}")  # fmt: skip
    client = FakeClient({
        source.url: {"results": [{"objectID": "a"}], "next": "https://api.example.org/p2"},
        "https://api.example.org/p2": {"results": [{"objectID": "b"}], "next": None},
        "https://api.example.org/objects/a": {"objectID": "a", "title": "Full A", "people": ["X", "Y"],
                                              "images": [{"url": "https://img/a.jpg"}]},
        "https://api.example.org/objects/b": {"objectID": "b", "title": "Full B"},
    })  # fmt: skip
    records = list(json_records(source, client))
    assert [(r.identifier, r.title) for r in records] == [
        ("a", "Full A (TM a)"),
        ("b", "Full B (TM b)"),
    ]
    assert (records[0].maker, records[0].image_url) == ("X; Y", "https://img/a.jpg")


def test_json_api_with_bare_id_list_and_detail_requests():
    source = json_source(records="objectIDs", fields=FIELDS, detail_id="",
                         detail_url="https://api.example.org/objects/{id}")  # fmt: skip
    client = FakeClient({source.url: {"objectIDs": [7]},
                         "https://api.example.org/objects/7": {"objectID": 7, "title": "Seven"}})  # fmt: skip
    (record,) = json_records(source, client)
    assert (record.identifier, record.title) == ("7", "Seven (TM 7)")


def test_json_record_without_id_is_skipped_not_fatal():
    source = json_source(records="", fields=FIELDS)
    client = FakeClient(
        {source.url: [{"title": "no id"}, {"objectID": "ok", "title": "Fine"}]}
    )
    skipped, ok = json_records(source, client)
    assert "objectID" in skipped.reason and ok.identifier == "ok"


def iiif_source(url):
    return CrawlSource(name="IIIF", kind="iiif_collection", holding_institution="Wellcome",
                       short_name="W", url=url, rights_statement="Default rights")  # fmt: skip


def test_iiif_single_manifest():
    url = "https://iiif.example.org/m.json"
    (record,) = iiif_records(iiif_source(url), FakeClient({url: V3}))
    assert record.title == "Wunder der Vererbung / von Fritz Bolle."
    assert record.rights.startswith("Licence: http://creativecommons.org")
    assert (
        record.image_url.endswith("/full/!1000,1000/0/default.jpg")
        and not record.store_image
    )


def test_iiif_v2_and_nested_v3_collections():
    top = {"type": "Collection", "items": [
        {"id": "https://iiif.example.org/sub", "type": "Collection"},
        {"id": "https://iiif.example.org/m3", "type": "Manifest"}]}  # fmt: skip
    sub = {"@type": "sc:Collection", "manifests": [{"@id": "https://iiif.example.org/m2"},
                                                   {"@id": "https://iiif.example.org/m3"}]}  # fmt: skip
    client = FakeClient({"https://iiif.example.org/top": top, "https://iiif.example.org/sub": sub,
                         "https://iiif.example.org/m2": V2, "https://iiif.example.org/m3": V3})  # fmt: skip
    titles = [
        r.title
        for r in iiif_records(iiif_source("https://iiif.example.org/top"), client)
    ]
    assert titles == [
        "Wunder der Vererbung / von Fritz Bolle.",
        "Brush Pot",
    ]  # m3 once only


def test_cooper_hewitt_query_pages_and_refresh_mode(db):
    source = CrawlSource(name="CH", kind="cooper_hewitt", holding_institution="Cooper Hewitt",
                         short_name="CH", url="https://api.cooperhewitt.org/",
                         params={"query": 'department:"Textiles"'})  # fmt: skip
    pages = [{"data": {"object": [{"id": f"object-{n}", "summary": {"title": "T"}}]},
              "extensions": {"pagination": {"number_of_pages": 2}}} for n in (1, 2)]  # fmt: skip
    client = FakeClient(graphql=pages)
    assert [r.identifier for r in cooper_hewitt_records(source, client)] == [
        "object-1",
        "object-2",
    ]
    assert 'object(department:"Textiles", size:100, page:0)' in client.calls[0][1]

    source.params = {"query": ""}
    Item.objects.create(item_type="object", record_status="staged", is_public=False,
                        is_context_record=False, legacy_system="CH", legacy_id="18734",
                        holding_institution="Cooper Hewitt", source_identifier="18734")  # fmt: skip
    client = FakeClient(graphql=[{"data": {"o0": [{"collectionsOnlineId": "18734"}]}}])
    assert [r.identifier for r in cooper_hewitt_records(source, client)] == ["18734"]
    assert 'o0: object(collectionsOnlineId:"18734")' in client.calls[0][1]


def test_source_validation():
    with pytest.raises(ValidationError, match="fields.id"):
        json_source(fields={"title": "t"}).clean()
    json_source(fields={"id": "i", "title": "t"}).clean()
    s = json_source(fields={"id": "i", "title": "t"})
    s.api_key_setting = "MY_KEY"
    with pytest.raises(ValidationError):
        s.clean()


@pytest.fixture
def saved_json_source(db):
    s = json_source(records="items", fields=FIELDS)
    s.save()
    return s


def test_execute_run_counts_and_survives_a_bad_record(saved_json_source):
    client = FakeClient({saved_json_source.url: {"items": [
        {"objectID": "1", "title": "One"}, {"title": "no id"}, {"objectID": "2", "title": "Two"}]}})  # fmt: skip
    run = execute_run(CrawlRun.objects.create(source=saved_json_source), client)
    assert (run.status, run.created, run.refreshed, run.errors) == ("finished", 2, 0, 1)
    assert "nothing at the ID path" in run.message
    run2 = execute_run(CrawlRun.objects.create(source=saved_json_source), FakeClient(
        {saved_json_source.url: {"items": [{"objectID": "1", "title": "One"}]}}))  # fmt: skip
    assert (run2.created, run2.refreshed) == (0, 1)  # matched, not duplicated
    assert Item.objects.get(source_identifier="1").ingest_method == "crawler_json_api"


def test_failed_api_marks_the_run_failed(saved_json_source):
    class Broken(FakeClient):
        def get_json(self, url, params=None):
            raise LinkError("The site answered 500 for that link.")

    run = execute_run(CrawlRun.objects.create(source=saved_json_source), Broken())
    assert run.status == "failed" and "500" in run.message and run.finished_at


def test_one_run_at_a_time_and_stale_runs(saved_json_source):
    running = CrawlRun.objects.create(source=saved_json_source)
    with pytest.raises(AlreadyRunning):
        start_run(saved_json_source, background=False)
    CrawlRun.objects.filter(pk=running.pk).update(
        updated_at=timezone.now() - timedelta(hours=1)
    )
    assert active_run(saved_json_source) is None
    running.refresh_from_db()
    assert running.status == "interrupted"


@pytest.fixture
def admin_client(client, db, settings):
    settings.STORAGES = {**settings.STORAGES, "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"}}  # fmt: skip
    client.force_login(
        get_user_model().objects.create_superuser("a", "a@example.invalid", "x")
    )
    return client


def test_admin_run_and_preview(admin_client):
    vam = CrawlSource.objects.get(name="V&A API")  # seeded by migration
    with patch("crawler.admin.start_run") as start:
        response = admin_client.get(
            reverse("admin:crawler_crawlsource_run_crawl", args=[vam.pk]), follow=True
        )
    start.assert_called_once()
    assert "Started crawling V&amp;A API" in response.content.decode()

    fake = [type("F", (), {"identifier": "O1", "title": "Brush Pot (V&A O1)", "detail": {}, "store_image": True,
                           "image_url": "", "thumbnail_url": "", "source_url": "", "date_text": "",
                           "place": "", "maker": "", "summary": "", "rights": ""})()]  # fmt: skip
    with patch("crawler.admin.preview", return_value=fake):
        html = admin_client.get(
            reverse("admin:crawler_crawlsource_preview_crawl", args=[vam.pk])
        ).content.decode()
    assert "Brush Pot (V&amp;A O1)" in html and "Nothing has been saved" in html
    with patch(
        "crawler.admin.preview",
        side_effect=LinkError("The site answered 404 for that link."),
    ):
        html = admin_client.get(
            reverse("admin:crawler_crawlsource_preview_crawl", args=[vam.pk])
        ).content.decode()
    assert "The preview failed" in html and "404" in html

    ch = CrawlSource.objects.get(name="Cooper Hewitt API")  # seeded switched off
    with patch("crawler.admin.start_run") as start:
        admin_client.get(reverse("admin:crawler_crawlsource_run_crawl", args=[ch.pk]))
    start.assert_not_called()
    CrawlRun.objects.create(source=vam, status="finished", created=2)  # pages that show a run
    for name in [
        "catalog_crawleditem_changelist",
        "crawler_crawlsource_changelist",
        "crawler_crawlrun_changelist",
        "crawler_crawlsource_add",
    ]:
        assert admin_client.get(reverse(f"admin:{name}")).status_code == 200
