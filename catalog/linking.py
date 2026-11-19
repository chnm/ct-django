"""Read what a pasted link offers, for records that point at an object held elsewhere.

inspect_link(url) understands, in order of preference:
  - a IIIF Presentation manifest (v2 or v3)
  - a IIIF Image API service (info.json, or its base URL)
  - a direct image link
  - an ordinary web page: a IIIF manifest it links to, else its preview image (og:image)
and returns a LinkedSource the admin turns into a record. Nothing is downloaded
to our storage: images stay at the holder's address.

Editors paste these URLs, so every fetch is checked: http(s) only, public
addresses only (no localhost or private networks), short timeouts, small
size caps, redirects re-checked.
"""

import ipaddress
import json
import re
import socket
from dataclasses import dataclass, field
from html import unescape
from urllib.parse import urljoin, urlparse

import requests

IMAGE_SIZE = "full/!1000,1000/0/default.jpg"
THUMB_SIZE = "full/!200,200/0/default.jpg"
MAX_BYTES = 5 * 1024 * 1024
TIMEOUT = 15
HEADERS = {
    "User-Agent": "connecting-threads/1.0 (research catalogue; link preview)",
    "Accept": "application/ld+json, application/json, text/html, image/*;q=0.8, */*;q=0.5",
}

# Used when the source states no rights of its own. Editors can change it per record.
DEFAULT_RIGHTS = (
    "Image shown from {holder} for non-commercial research and education. "
    "Rights remain with the holder; see the original record for terms of use."
)


class LinkError(Exception):
    """The link can't be used; the message is shown to the editor."""


@dataclass
class LinkedSource:
    url: str
    kind: str = ""  # iiif_manifest, iiif_image, image, web_page
    title: str = ""
    summary: str = ""
    image_url: str = ""
    thumbnail_url: str = ""
    manifest_url: str = ""
    source_url: str = ""  # the object's page at its original location
    holder: str = ""
    rights: str = ""
    raw: str = ""  # what we read, kept with the record for provenance
    notes: list = field(default_factory=list)


def _check_public(url):
    parts = urlparse(url)
    if parts.scheme not in ("http", "https") or not parts.hostname:
        raise LinkError("Use a full web address starting with http:// or https://.")
    try:
        addresses = {info[4][0] for info in socket.getaddrinfo(parts.hostname, None)}
    except socket.gaierror:
        raise LinkError(f"Could not find the site {parts.hostname}.") from None
    for address in addresses:
        ip = ipaddress.ip_address(address.split("%")[0])
        if not ip.is_global:
            raise LinkError("That address points to a private or local network.")


def fetch(url, session=None):
    """GET a public URL; returns (final_url, content_type, body bytes or None for images)."""
    session = session or requests.Session()
    for _ in range(5):
        _check_public(url)
        try:
            response = session.get(url, headers=HEADERS, timeout=TIMEOUT, stream=True,
                                   allow_redirects=False)  # fmt: skip
        except requests.exceptions.RequestException as e:
            raise LinkError(
                f"Could not reach the link ({e.__class__.__name__})."
            ) from None
        if response.is_redirect:
            url = urljoin(url, response.headers["Location"])
            response.close()
            continue
        if response.status_code >= 400:
            response.close()
            raise LinkError(f"The site answered {response.status_code} for that link.")
        content_type = (
            response.headers.get("Content-Type", "").split(";")[0].strip().lower()
        )
        if content_type.startswith("image/"):
            response.close()  # we only need to know it is an image
            return url, content_type, None
        body = b""
        for chunk in response.iter_content(64 * 1024):
            body += chunk
            if len(body) > MAX_BYTES:
                response.close()
                raise LinkError("That page is too large to read.")
        return url, content_type, body
    raise LinkError("The link redirects too many times.")


def _text(value):
    """First string from a IIIF label/value in v2 or v3 shape."""
    if isinstance(value, str):
        return value.strip()
    if isinstance(value, dict):
        if "@value" in value:
            return str(value["@value"]).strip()
        for strings in value.values():  # v3 language map: prefer whatever comes first
            if strings:
                return _text(strings[0])
    if isinstance(value, list) and value:
        return _text(value[0])
    return ""


def _service_id(resource):
    service = resource.get("service") if isinstance(resource, dict) else None
    if isinstance(service, list):
        service = service[0] if service else None
    if isinstance(service, dict):
        return (service.get("id") or service.get("@id") or "").rstrip("/")
    return ""


def _from_image_service(source, base):
    source.image_url = f"{base}/{IMAGE_SIZE}"
    source.thumbnail_url = source.thumbnail_url or f"{base}/{THUMB_SIZE}"


def _first_image(manifest):
    if "items" in manifest:  # v3: Canvas > AnnotationPage > Annotation > body
        for canvas in manifest["items"]:
            for page in canvas.get("items", []):
                for annotation in page.get("items", []):
                    body = annotation.get("body")
                    if isinstance(body, list):
                        body = body[0] if body else None
                    if body:
                        return body
    for sequence in manifest.get(
        "sequences", []
    ):  # v2: Sequence > Canvas > Annotation > resource
        for canvas in sequence.get("canvases", []):
            for annotation in canvas.get("images", []):
                if annotation.get("resource"):
                    return annotation["resource"]
    return None


def read_manifest(source, manifest):
    source.kind = "iiif_manifest"
    source.manifest_url = manifest.get("id") or manifest.get("@id") or source.url
    source.title = source.title or _text(manifest.get("label"))
    source.summary = _text(manifest.get("summary") or manifest.get("description"))

    homepage = manifest.get("homepage") or manifest.get("related")
    if isinstance(homepage, list):
        homepage = homepage[0] if homepage else None
    if isinstance(homepage, dict):
        homepage = homepage.get("id") or homepage.get("@id")
    source.source_url = source.source_url or (homepage or "")

    provider = manifest.get("provider")
    if provider:
        source.holder = _text(provider[0].get("label"))

    statement = manifest.get("requiredStatement")
    attribution = (
        _text(statement.get("value"))
        if statement
        else _text(manifest.get("attribution"))
    )
    licence = manifest.get("rights") or manifest.get("license")
    licence = _text(licence) if not isinstance(licence, str) else licence
    source.rights = " ".join(
        part for part in [attribution, f"Licence: {licence}" if licence else ""] if part
    )

    thumbnail = manifest.get("thumbnail")
    if isinstance(thumbnail, list):
        thumbnail = thumbnail[0] if thumbnail else None
    if isinstance(thumbnail, dict):
        thumbnail = thumbnail.get("id") or thumbnail.get("@id")
    if thumbnail:
        source.thumbnail_url = thumbnail

    image = _first_image(manifest)
    if image is None:
        source.notes.append("The manifest lists no images.")
    elif base := _service_id(image):
        _from_image_service(source, base)
    else:
        source.image_url = image.get("id") or image.get("@id", "")
    return source


def _is_image_service(data):
    context = json.dumps(data.get("@context", ""))
    return (
        "iiif.io/api/image" in context
        or data.get("protocol") == "http://iiif.io/api/image"
    )


def _meta(html, *names):
    for name in names:
        pattern = rf'<meta[^>]+(?:property|name)=["\']{re.escape(name)}["\'][^>]+content=["\']([^"\']+)'
        alt = rf'<meta[^>]+content=["\']([^"\']+)["\'][^>]+(?:property|name)=["\']{re.escape(name)}["\']'
        if m := re.search(pattern, html, re.I) or re.search(alt, html, re.I):
            return unescape(m[1]).strip()
    return ""


def _manifest_link(html, base):
    for href in re.findall(r'href=["\']([^"\']+)["\']', html):
        if "manifest" in href.lower() and (
            "iiif" in href.lower() or href.endswith(".json")
        ):
            return urljoin(base, unescape(href))
    return ""


def read_page(source, html, final_url, session):
    source.kind = "web_page"
    source.source_url = final_url
    source.title = (
        _meta(html, "og:title", "twitter:title")
        or unescape(
            (re.search(r"<title[^>]*>(.*?)</title>", html, re.I | re.S) or [None, ""])[
                1
            ]
        ).strip()
    )
    source.summary = _meta(html, "og:description", "description")
    source.holder = _meta(html, "og:site_name")
    if manifest_url := _manifest_link(html, final_url):
        try:
            _, _, body = fetch(manifest_url, session)
            read_manifest(source, json.loads(body))
            source.notes.append("Found a IIIF manifest linked from the page.")
            return source
        except (LinkError, ValueError, AttributeError, TypeError):
            source.kind = "web_page"
    image = _meta(html, "og:image", "og:image:url", "twitter:image")
    if image:
        source.image_url = urljoin(final_url, image)
        source.thumbnail_url = source.image_url
        source.notes.append(
            "Used the page's preview image; check it is the right picture."
        )
    else:
        source.notes.append(
            "The page offers no preview image; add an image link by hand."
        )
    return source


def inspect_link(url, session=None):
    session = session or requests.Session()
    source = LinkedSource(url=url.strip())
    final_url, content_type, body = fetch(source.url, session)
    if body is None:  # an image
        source.kind = "image"
        source.image_url = source.thumbnail_url = final_url
        source.title = final_url.rsplit("/", 1)[-1].split("?")[0]
        source.notes.append(
            "A direct image link carries no metadata; add the object's page as the source link."
        )
        return source
    text = body.decode("utf-8", errors="replace")
    if "json" in content_type or text.lstrip().startswith("{"):
        try:
            data = json.loads(text)
        except ValueError:
            raise LinkError("That link returned data we could not read.") from None
        source.raw = text[:200_000]
        if _is_image_service(data):
            source.kind = "iiif_image"
            _from_image_service(
                source, (data.get("id") or data.get("@id") or final_url).rstrip("/")
            )
            return source
        if "items" in data or "sequences" in data:
            return read_manifest(source, data)
        raise LinkError("That data is not a IIIF manifest or image service.")
    source.raw = text[:200_000]
    return read_page(source, text, final_url, session)
