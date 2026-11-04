from pathlib import Path
from unittest.mock import patch

import pytest
from django.contrib.auth import get_user_model
from django.urls import reverse

from catalog import linking
from catalog.linking import LinkedSource, LinkError, inspect_link
from catalog.models import Item, Media
from catalog.testing import make_item

DATA = Path(__file__).parent / "test_data"
REAL_CHECK = linking._check_public  # kept before the autouse patch replaces it


class FakeResponse:
    def __init__(self, status=200, content_type="text/html", body=b"", location=None):
        self.status_code = status
        self.headers = {"Content-Type": content_type}
        if location:
            self.headers["Location"] = location
        self.is_redirect = location is not None
        self.body = body

    def iter_content(self, size):
        yield self.body

    def close(self):
        pass


class FakeSession:
    """Answers GETs from a {url: FakeResponse} map."""

    def __init__(self, pages):
        self.pages = pages

    def get(self, url, **kwargs):
        return self.pages[url]


@pytest.fixture(autouse=True)
def public_hosts():
    with patch.object(linking, "_check_public") as check:
        yield check


def json_page(name):
    return FakeResponse(
        content_type="application/json", body=(DATA / name).read_bytes()
    )


def test_redirect_to_a_private_address_is_refused(public_hosts):
    public_hosts.side_effect = lambda url: (
        REAL_CHECK(url) if "internal" in url else None
    )
    url = "https://example.org/go"
    session = FakeSession({url: FakeResponse(302, location="http://internal.example/")})
    with patch(
        "socket.getaddrinfo", return_value=[(None, None, None, None, ("10.1.1.1", 0))]
    ):
        with pytest.raises(LinkError, match="private or local"):
            inspect_link(url, session)


def test_iiif_v2_manifest():
    url = "https://iiif.vam.ac.uk/collections/O495310/manifest.json"
    s = inspect_link(url, FakeSession({url: json_page("iiif_v2_vam.json")}))
    assert s.kind == "iiif_manifest" and s.title == "Brush Pot"
    assert (
        s.image_url
        == "https://framemark.vam.ac.uk/collections/2019MK8908/full/!1000,1000/0/default.jpg"
    )
    assert s.source_url == "http://collections.vam.ac.uk/item/O495310"
    assert s.rights.startswith(
        "©Victoria and Albert Museum, London Licence: https://www.vam.ac.uk"
    )
    assert s.manifest_url == url


def test_iiif_v3_manifest():
    url = "https://iiif.wellcomecollection.org/presentation/v3/b18035723"
    s = inspect_link(url, FakeSession({url: json_page("iiif_v3_wellcome.json")}))
    assert s.kind == "iiif_manifest"
    assert s.title == "Wunder der Vererbung / von Fritz Bolle."
    assert s.holder == "Wellcome Collection"
    assert s.source_url == "https://wellcomecollection.org/works/krqp99r9"
    assert s.rights == "Licence: http://creativecommons.org/licenses/by-nc/4.0/"
    assert s.image_url.endswith("b18035723_0001.JP2/full/!1000,1000/0/default.jpg")


def test_iiif_image_service():
    url = "https://images.example.org/iiif/abc/info.json"
    body = b'{"@context": "http://iiif.io/api/image/2/context.json", "@id": "https://images.example.org/iiif/abc"}'
    s = inspect_link(
        url,
        FakeSession({url: FakeResponse(content_type="application/json", body=body)}),
    )
    assert s.kind == "iiif_image"
    assert (
        s.image_url
        == "https://images.example.org/iiif/abc/full/!1000,1000/0/default.jpg"
    )


def test_direct_image_link_follows_redirects():
    url, final = "https://example.org/pic", "https://cdn.example.org/pic.jpg"
    session = FakeSession({url: FakeResponse(302, location=final),
                           final: FakeResponse(content_type="image/jpeg")})  # fmt: skip
    s = inspect_link(url, session)
    assert (s.kind, s.image_url, s.title) == ("image", final, "pic.jpg")
    assert s.notes


def test_web_page_prefers_a_linked_manifest():
    page = (
        b'<html><head><meta property="og:title" content="Brush Pot | V&amp;A"></head>'
        b'<a href="https://iiif.vam.ac.uk/collections/O495310/manifest.json">IIIF</a></html>'
    )
    url, manifest = (
        "https://collections.vam.ac.uk/item/O495310/",
        "https://iiif.vam.ac.uk/collections/O495310/manifest.json",
    )
    session = FakeSession(
        {url: FakeResponse(body=page), manifest: json_page("iiif_v2_vam.json")}
    )
    s = inspect_link(url, session)
    assert s.kind == "iiif_manifest"
    assert s.title == "Brush Pot | V&A"  # the page's title is kept
    assert "Found a IIIF manifest" in s.notes[0]


def test_web_page_falls_back_to_preview_image():
    page = (
        b'<meta property="og:image" content="/img/hero.jpg"><meta property="og:site_name" content="A Museum">'
        b"<title>Handkerchief</title>"
    )
    url = "https://museum.example.org/objects/1"
    s = inspect_link(url, FakeSession({url: FakeResponse(body=page)}))
    assert (s.kind, s.title, s.holder) == ("web_page", "Handkerchief", "A Museum")
    assert s.image_url == "https://museum.example.org/img/hero.jpg"
    assert s.source_url == url


def test_errors_are_explained():
    url = "https://example.org/missing"
    with pytest.raises(LinkError, match="404"):
        inspect_link(url, FakeSession({url: FakeResponse(404)}))
    with pytest.raises(LinkError, match="not a IIIF"):
        inspect_link(
            url,
            FakeSession(
                {url: FakeResponse(content_type="application/json", body=b'{"a": 1}')}
            ),
        )


def test_private_and_local_addresses_are_refused():
    for address in ["10.0.0.5", "127.0.0.1", "169.254.169.254", "::1"]:
        with patch(
            "socket.getaddrinfo", return_value=[(None, None, None, None, (address, 0))]
        ):
            with pytest.raises(LinkError, match="private or local"):
                REAL_CHECK("https://intranet.example.org/")
    with patch(
        "socket.getaddrinfo",
        return_value=[(None, None, None, None, ("93.184.215.14", 0))],
    ):
        REAL_CHECK("https://example.org/")  # public: no error
    with pytest.raises(LinkError, match="http"):
        REAL_CHECK("file:///etc/passwd")


@pytest.fixture
def admin_client(client, db, settings):
    settings.STORAGES = {**settings.STORAGES, "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"}}  # fmt: skip
    client.force_login(
        get_user_model().objects.create_superuser("a", "a@example.invalid", "x")
    )
    return client


def test_add_from_link_creates_a_private_draft(admin_client):
    source = LinkedSource(url="https://iiif.example.org/m.json", kind="iiif_manifest", title="Madras handkerchief",
                          image_url="https://img.example.org/full.jpg", thumbnail_url="https://img.example.org/t.jpg",
                          manifest_url="https://iiif.example.org/m.json", source_url="https://museum.example.org/o/1",
                          holder="A Museum", raw="{}")  # fmt: skip
    url = reverse("admin:catalog_item_add_from_link")
    assert "Which link to paste" in admin_client.get(url).content.decode()
    with patch("catalog.admin.inspect_link", return_value=source):
        response = admin_client.post(url, {"url": source.url, "item_type": "object"})
    item = Item.objects.get(legacy_system="Linked record")
    assert response.url == reverse("admin:catalog_item_change", args=[item.pk])
    assert (item.record_status, item.is_public, item.ingest_method) == (
        "internal",
        False,
        "linked_record",
    )
    assert item.rights_statement.startswith("Image shown from A Museum")
    assert set(item.media_set.values_list("media_type", "external_url")) == {
        ("image", "https://img.example.org/full.jpg"), ("thumbnail", "https://img.example.org/t.jpg"),
        ("iiif_manifest", "https://iiif.example.org/m.json")}  # fmt: skip
    with patch(
        "catalog.admin.inspect_link"
    ) as again:  # same link twice: go to the existing record
        response = admin_client.post(url, {"url": source.url, "item_type": "object"})
    again.assert_not_called()
    assert response.url == reverse("admin:catalog_item_change", args=[item.pk])


def test_add_from_link_shows_link_errors(admin_client):
    with patch(
        "catalog.admin.inspect_link",
        side_effect=LinkError("The site answered 404 for that link."),
    ):
        html = admin_client.post(reverse("admin:catalog_item_add_from_link"),
                                 {"url": "https://example.org/x", "item_type": "object"}).content.decode()  # fmt: skip
    assert "The site answered 404" in html
    assert not Item.objects.exists()


def test_public_images_need_a_rights_statement(client, db):
    item = make_item(
        source_url="https://museum.example.org/o/1", holding_institution="A Museum"
    )
    Media.objects.create(
        item=item,
        media_type="image",
        external_url="https://img.example.org/full.jpg",
        is_primary=True,
    )
    html = client.get(f"/database/{item.pk}/").content.decode()
    assert "img.example.org/full.jpg" not in html
    item.rights_statement = "Image shown from A Museum."
    item.save()
    html = client.get(f"/database/{item.pk}/").content.decode()
    assert "img.example.org/full.jpg" in html
    assert "View at original location (A Museum)" in html
