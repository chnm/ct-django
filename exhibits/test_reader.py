from django.test import TestCase

from exhibits.reader import reader_for
from exhibits.tests import make_chapter


class ReaderTest(TestCase):
    def setUp(self):
        self.home, self.pages = make_chapter("Chapter A", 1, ["One", "Two", "Three"])
        self.home2, self.pages2 = make_chapter("Chapter B", 2, ["Only"])

    def test_cover(self):
        r = reader_for(self.home)
        self.assertTrue(r.is_cover)
        self.assertIsNone(r.current)
        self.assertEqual([s.title for s in r.sections], ["One", "Two", "Three"])
        self.assertEqual((r.total, r.chapter_number, r.chapter_total), (3, 1, 2))
        self.assertEqual(r.next.title, "One")
        self.assertIsNone(r.previous)
        self.assertEqual(r.progress, 0.0)
        self.assertIsNone(r.previous_chapter)
        self.assertEqual(r.next_chapter, self.home2)
        self.assertEqual(r.reading_minutes, 1)  # tiny bodies floor to 1

    def test_middle_section(self):
        r = reader_for(self.pages[1])
        self.assertFalse(r.is_cover)
        self.assertEqual((r.current.number, r.current.title), (2, "Two"))
        self.assertEqual(r.previous.title, "One")
        self.assertEqual(r.next.title, "Three")
        self.assertAlmostEqual(r.progress, 2 / 3)
        self.assertEqual(r.current.url, self.pages[1].url)

    def test_ends(self):
        first, last = reader_for(self.pages[0]), reader_for(self.pages[2])
        self.assertIsNone(first.previous)
        self.assertIsNone(last.next)
        self.assertEqual(last.progress, 1.0)

    def test_second_chapter_and_unpublished_sections_are_skipped(self):
        self.pages2[0].unpublish()
        r = reader_for(self.home2)
        self.assertEqual((r.chapter_number, r.total), (2, 0))
        self.assertIsNone(r.next)
        self.assertEqual(r.previous_chapter, self.home)
        self.assertIsNone(r.next_chapter)

    def test_reading_minutes_counts_words(self):
        self.pages[0].body = "<p>" + ("word " * 450) + "</p>"
        self.pages[0].save()
        self.assertEqual(reader_for(self.home).reading_minutes, 2)

    def test_pages_expose_reader_in_context(self):
        for page in (self.home, self.pages[0]):
            self.assertIn("reader", page.get_context(None))

    def test_nested_page_resolves_to_the_exhibit_home(self):
        from exhibits.models import ExhibitPage

        nested = ExhibitPage(title="Nested", slug="nested", body="<p>x</p>")
        self.pages[0].add_child(instance=nested)
        r = reader_for(nested)
        self.assertEqual(r.home, self.home)
        self.assertEqual(r.chapter_number, 1)
