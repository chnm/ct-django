from django.test import TestCase
from wagtail.models import Page

from exhibits.models import ExhibitHome, ExhibitPage
from material.models import TextileRecord


def make_chapter(title, order, sections=()):
    """Create an ExhibitHome under the default site root with ExhibitPage children in order."""
    root = Page.objects.get(depth=2)  # Wagtail's default site root page
    home = ExhibitHome(title=title, slug=title.lower().replace(" ", "-"), exhibit_display_order=order)
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
