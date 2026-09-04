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


class SectionPageTest(TestCase):
    def setUp(self):
        self.home, self.pages = make_chapter("Chapter A", 1, ["One", "Two", "Three"])
        self.home2, self.pages2 = make_chapter("Chapter B", 2, ["Only"])
        self.record = TextileRecord.objects.create(year="1750", is_public=True, summary_of_record="A weaver's account.")

    def render(self, page):
        response = self.client.get(page.url)
        self.assertEqual(response.status_code, 200)
        return response.content.decode()

    def test_middle_section_chrome(self):
        html = self.render(self.pages[1])
        self.assertIn("Section 02 / 03", html)
        self.assertIn(f'href="{self.pages[0].url}"', html)  # previous
        self.assertIn(f'href="{self.pages[2].url}"', html)  # next
        self.assertIn("Chapter 01 &middot; Contents", html)
        for title in ("One", "Two", "Three"):
            self.assertIn(title, html)
        self.assertIn("Two body", html)
        self.assertIn("Section 02 &middot; Chapter A", html)  # neutral eyebrow

    def test_phase_tints_eyebrow_and_related_records_render(self):
        page = self.pages[0]
        page.phase = "pr"
        page.related_records.add(self.record)
        page.save_revision().publish()
        html = self.render(page)
        self.assertIn("text-madras-green", html.split("Section 01 &middot;")[0][-400:] + html.split("Section 01 &middot;")[1][:200])
        self.assertIn("Section 01 &middot; Production", html)
        self.assertIn("Related database records", html)
        self.assertIn(f"Entry no. {self.record.id}", html)
        self.assertIn(f"/database/{self.record.id}/", html)
        self.assertIn("A weaver", html)

    def test_display_title_and_skip_link(self):
        page = self.pages[0]
        page.display_title = False
        page.link_to_subsection = self.pages[2]
        page.save_revision().publish()
        html = self.render(page)
        self.assertNotIn("<h2", html.split('<main')[1].split("</main>")[0])
        self.assertIn("Skip to Three &rarr;", html)
        self.assertIn(f'href="{self.home.url}"', html)  # Previous on section 1 goes to the cover

    def test_last_section_links_to_next_chapter(self):
        html = self.render(self.pages[2])
        self.assertIn("Next chapter &rarr;", html)
        self.assertIn(f'href="{self.home2.url}"', html)
        html = self.render(self.pages2[0])
        self.assertIn("All chapters &rarr;", html)

    def test_layouts_render_images_and_captions(self):
        from wagtail.images.tests.utils import get_test_image_file
        from wagtail.images.models import Image

        img = Image.objects.create(title="Plate", file=get_test_image_file())
        page = self.pages[0]
        page.layout = "three_column_images_left"
        page.image_first_column = img
        page.image_first_column_caption = "First plate"
        page.image_second_column = img
        page.image_second_column_caption = "Second plate"
        page.save_revision().publish()
        html = self.render(page)
        self.assertEqual(html.count("<figure"), 2)
        self.assertIn("First plate", html)
        self.assertIn("Second plate", html)
        page.layout = "wide_image"
        page.image = img
        page.image_caption = "Wide plate"
        page.save_revision().publish()
        html = self.render(page)
        self.assertIn("Wide plate", html)
        self.assertIn("Full image", html)

    def test_comparison_slider(self):
        from wagtail.images.tests.utils import get_test_image_file
        from wagtail.images.models import Image
        from exhibits.models import ImageComparison

        img = Image.objects.create(title="Plate", file=get_test_image_file())
        page = self.pages[0]
        page.layout = "left_image_two_thirds"
        page.save_revision().publish()
        ImageComparison.objects.create(page=page, first_image=img, second_image=img, first_image_caption="Before", second_image_caption="After")
        html = self.render(page)
        self.assertIn("<img-comparison-slider", html)
        self.assertIn("Before / After", html)
