from django.test import TestCase
from wagtail.images.models import Image
from wagtail.images.tests.utils import get_test_image_file
from wagtail.models import Page

from exhibits.models import ExhibitHome, ExhibitPage
from material.models import TextileRecord


def make_chapter(title, order, sections=()):
    """Create an ExhibitHome under the default site root with ExhibitPage children in order."""
    root = Page.objects.get(depth=2)  # Wagtail's default site root page
    image = Image.objects.create(title=f"{title} cover", file=get_test_image_file())
    home = ExhibitHome(title=title, slug=title.lower().replace(" ", "-"), exhibit_display_order=order, image=image)
    root.add_child(instance=home)
    pages = []
    for i, section_title in enumerate(sections, 1):
        page = ExhibitPage(title=section_title, slug=f"{home.slug}-s{i}", body=f"<p>{section_title} body</p>")
        home.add_child(instance=page)
        pages.append(page)
    return home, pages


class ExhibitPageFieldsTest(TestCase):
    def test_phase_and_related_records_fields(self):
        home, (page,) = make_chapter("Chapter A", 1, ["One"])
        record = TextileRecord.objects.create(year="1750", is_public=True)
        page.phase = "pr"
        page.related_records.add(record)
        page.save()
        page.refresh_from_db()
        self.assertEqual(page.phase, "pr")
        self.assertEqual(list(page.related_records.all()), [record])
        self.assertEqual(list(record.exhibit_sections.all()), [page])


class CoverPageTest(TestCase):
    def setUp(self):
        self.home, self.pages = make_chapter("Chapter A", 1, ["One", "Two", "Three"])
        self.home2, _ = make_chapter("Chapter B", 2, [])

    def test_cover_renders_reader_chrome(self):
        response = self.client.get(self.home.url)
        self.assertEqual(response.status_code, 200)
        html = response.content.decode()
        self.assertIn("Chapter 01 of 02", html)
        self.assertIn("3 sections", html)
        self.assertIn(f'href="{self.pages[0].url}"', html)
        self.assertIn("Begin &rarr;", html)
        self.assertIn("Exit exhibition", html)
        self.assertIn("Exhibition &middot; Chapter 01", html)
        self.assertNotIn("Cite this chapter", html)

    def test_cover_shows_hero_text_body_and_citation_when_set(self):
        self.home.hero_text = "Read the chapter"
        self.home.body = "<p>Before the cloth crossed an ocean.</p>"
        self.home.citation_text = "Connecting Threads, Chapter A."
        self.home.save_revision().publish()
        html = self.client.get(self.home.url).content.decode()
        self.assertIn("Read the chapter", html)
        self.assertIn("Before the cloth crossed an ocean.", html)
        self.assertIn("Cite this chapter", html)
        self.assertIn("Connecting Threads, Chapter A.", html)

    def test_empty_chapter_cover_links_to_all_chapters(self):
        html = self.client.get(self.home2.url).content.decode()
        self.assertIn("0 sections", html)
        self.assertIn("All chapters &rarr;", html)
        self.assertIn("&larr; Previous chapter", html)
