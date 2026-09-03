from unittest.mock import Mock, patch

from django.template import Context, Template
from django.test import TestCase
from geopy.exc import GeocoderUnavailable

from material.models import (
    ArchivalRecord,
    Area,
    Image,
    NamedActor,
    Place,
    PlacesAlias,
    PrimaryTextileType,
    SecondaryTextileType,
    TextileAlias,
    TextileRecord,
)


class AreaModelTest(TestCase):
    def setUp(self):
        self.area = Area.objects.create(name="Test Area")

    def test_string_representation(self):
        self.assertEqual(str(self.area), "Test Area")

    def test_default_ordering(self):
        area2 = Area.objects.create(name="Another Area")
        areas = Area.objects.all()
        self.assertEqual(areas[0], area2)
        self.assertEqual(areas[1], self.area)


class PlaceModelTest(TestCase):
    def setUp(self):
        self.area = Area.objects.create(name="Test Area")
        self.place = Place.objects.create(
            city="Test City",
            country="Test Country",
            area=self.area,
            latitude=1.0,
            longitude=2.0,
        )

    def test_string_representation(self):
        self.assertEqual(str(self.place), "Test City, Test Country")

    def test_latitude_longitude_auto_population(self):
        location = Mock(latitude=51.5074, longitude=-0.1278)
        with patch("geopy.geocoders.Nominatim") as nominatim:
            nominatim.return_value.geocode.return_value = location
            place = Place.objects.create(city="London", country="United Kingdom")

        nominatim.return_value.geocode.assert_called_once_with(
            "London, United Kingdom", timeout=10
        )
        self.assertEqual(place.latitude, location.latitude)
        self.assertEqual(place.longitude, location.longitude)

    def test_geocoding_failure_does_not_block_save(self):
        with patch("geopy.geocoders.Nominatim") as nominatim:
            nominatim.return_value.geocode.side_effect = GeocoderUnavailable()
            place = Place.objects.create(city="Offline", country="Example")

        self.assertIsNone(place.latitude)
        self.assertIsNone(place.longitude)
        self.assertTrue(Place.objects.filter(pk=place.pk).exists())


class TextileRecordModelTest(TestCase):
    def setUp(self):
        self.textile_record = TextileRecord.objects.create(year=2023, is_public=True)

    def test_string_representation(self):
        self.assertEqual(
            str(self.textile_record),
            f"Item Record {self.textile_record.id} ({self.textile_record.year})",
        )

    def test_default_ordering(self):
        record2 = TextileRecord.objects.create(year=2022, is_public=True)
        records = TextileRecord.objects.all()
        self.assertEqual(records[0], record2)
        self.assertEqual(records[1], self.textile_record)


class PrimaryTextileTypeModelTest(TestCase):
    def setUp(self):
        self.primary_textile_type = PrimaryTextileType.objects.create(name="Cotton")

    def test_string_representation(self):
        self.assertEqual(str(self.primary_textile_type), "Cotton")

    def test_default_ordering(self):
        type2 = PrimaryTextileType.objects.create(name="Silk")
        types = PrimaryTextileType.objects.all()
        self.assertEqual(types[0], self.primary_textile_type)
        self.assertEqual(types[1], type2)


class SecondaryTextileTypeModelTest(TestCase):
    def setUp(self):
        self.secondary_textile_type = SecondaryTextileType.objects.create(name="Wool")

    def test_string_representation(self):
        self.assertEqual(str(self.secondary_textile_type), "Wool")

    def test_default_ordering(self):
        type2 = SecondaryTextileType.objects.create(name="Linen")
        types = SecondaryTextileType.objects.all()
        self.assertEqual(types[0], type2)
        self.assertEqual(types[1], self.secondary_textile_type)


class NamedActorModelTest(TestCase):
    def setUp(self):
        self.textile_record = TextileRecord.objects.create(year=2023, is_public=True)
        self.named_actor = NamedActor.objects.create(
            textile_record=self.textile_record, name="John Doe"
        )

    def test_string_representation(self):
        self.assertEqual(str(self.named_actor), "John Doe")


class PlacesAliasModelTest(TestCase):
    def setUp(self):
        self.place = Place.objects.create(city="Test City", country="Test Country")
        self.places_alias = PlacesAlias.objects.create(
            place=self.place, alias="Test Alias"
        )

    def test_string_representation(self):
        self.assertEqual(
            str(self.places_alias), "Test Alias for Test City, Test Country"
        )


class TextileAliasModelTest(TestCase):
    def setUp(self):
        self.primary_textile_type = PrimaryTextileType.objects.create(name="Cotton")
        self.secondary_textile_type = SecondaryTextileType.objects.create(name="Wool")
        self.textile_alias = TextileAlias.objects.create(
            textile_record_primary=self.primary_textile_type,
            textile_record_secondary=self.secondary_textile_type,
            alias="Test Alias",
        )

    def test_string_representation(self):
        self.assertEqual(str(self.textile_alias), "Test Alias for Cotton")


class ArchivalRecordModelTest(TestCase):
    def setUp(self):
        self.textile_record = TextileRecord.objects.create(year=2024, is_public=True)
        self.archival_record = ArchivalRecord.objects.create(
            textile_record=self.textile_record, archival_reference="Test Reference"
        )

    def test_string_representation(self):
        self.assertEqual(
            str(self.archival_record),
            f"Test Reference for {self.textile_record}",
        )


class ImageModelTest(TestCase):
    def setUp(self):
        self.textile_record = TextileRecord.objects.create(year=2024, is_public=True)
        self.image = Image.objects.create(
            textile_record=self.textile_record, description="Test Image"
        )

    def test_string_representation(self):
        self.assertEqual(str(self.image), f"Image for {self.textile_record}")


class SiteChromeTest(TestCase):
    """base.html nav and footer render on any page that extends it."""

    def test_about_crawler_page_has_new_chrome(self):
        response = self.client.get("/about/crawler/")
        self.assertEqual(response.status_code, 200)
        html = response.content.decode()
        self.assertIn('class="lbl tracking-[.1em] text-faint-2"', html)
        self.assertIn("Supported by", html)
        self.assertNotIn("CT_Exhibition_Opening_Image", html)
        # Launch Event moved out of the nav into the footer's Project column.
        self.assertEqual(html.count("Launch Event"), 1)

    def test_nav_marks_current_section_active(self):
        html = self.client.get("/database/").content.decode()
        self.assertIn('aria-current="page"', html)
        # About stays active on a nested path via prefix matching
        html = self.client.get("/about/crawler/").content.decode()
        self.assertEqual(html.count('aria-current="page"'), 2)  # desktop + mobile About links
        home = self.client.get("/").content.decode()
        self.assertEqual(home.count('aria-current="page"'), 2)  # desktop + mobile Home links


class IndexViewTest(TestCase):
    def test_index_counts_only_public_records(self):
        TextileRecord.objects.create(year="1750", is_public=True)
        TextileRecord.objects.create(year="1760", is_public=False)
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "index.html")
        self.assertEqual(response.context["record_count"], 1)

    def test_index_renders_field_notes_sections(self):
        response = self.client.get("/")
        html = response.content.decode()
        self.assertIn('id="exhibits"', html)
        self.assertIn("Explore the story by region", html)
        self.assertIn("hero-dolls.jpg", html)
        self.assertIn("neh-logo.jpg", html)  # funder logo bar
        self.assertNotIn("ct.js", html)  # carousel script dropped


class DatabaseTagsTest(TestCase):
    def render(self, tpl, **ctx):
        return Template("{% load database_tags %}" + tpl).render(Context(ctx))

    def test_date_display_exact_approximate_empty(self):
        self.assertEqual(
            self.render("{{ y|date_display }}", y="1748"),
            '<span class="font-mono">1748</span>',
        )
        html = self.render("{{ y|date_display }}", y="ca. 1855-1879")
        self.assertIn("border-dotted", html)
        self.assertIn("text-madras-gold", html)
        self.assertIn("ca. 1855-1879", html)
        self.assertIn("&mdash;", self.render("{{ y|date_display }}", y=""))
        self.assertIn("&lt;b&gt;", self.render("{{ y|date_display }}", y="<b>x"))

    def test_precision_dot_place_area_none(self):
        area = Area.objects.create(name="India")
        place = Place.objects.create(city="Madras", country="India", area=area, latitude=1, longitude=1)
        r = TextileRecord.objects.create(year="1748", circulation="pr", from_place=place, from_area=area, to_area=area)
        self.assertIn("rounded-full", self.render("{% precision_dot r 'from' %}", r=r))
        self.assertIn("bg-madras-green", self.render("{% precision_dot r 'from' %}", r=r))
        self.assertIn("border-dashed", self.render("{% precision_dot r 'to' %}", r=r))
        r2 = TextileRecord.objects.create(year="1748")
        self.assertEqual(self.render("{% precision_dot r 'to' %}", r=r2).strip(), "")

    def test_circulation_tag_labels(self):
        r = TextileRecord.objects.create(year="1748", circulation="td")
        html = self.render("{% circulation_tag r %}", r=r)
        self.assertIn("Trade &amp; Distribution", html)
        self.assertIn("bg-tag-gold", html)
        r2 = TextileRecord.objects.create(year="1748")
        html = self.render("{% circulation_tag r %}", r=r2)
        self.assertIn("Unassigned", html)
        self.assertIn("bg-paper-2", html)


class DatabaseListViewTest(TestCase):
    def setUp(self):
        TextileRecord.objects.create(year="1748", circulation="pr", is_public=True)
        TextileRecord.objects.create(year="ca. 1800", circulation="td", is_public=True)
        TextileRecord.objects.create(year="1900", is_public=True)  # unassigned

    def test_list_context_has_timeline_and_renders_swimlane(self):
        response = self.client.get("/database/")
        self.assertEqual(response.status_code, 200)
        t = response.context["timeline"]
        self.assertEqual((t.placed, t.total, t.unassigned), (2, 3, 1))
        html = response.content.decode()
        self.assertIn('id="swimlane"', html)
        self.assertIn("2 of 3 records placed by circulation", html)

    def test_htmx_response_swaps_table_and_swimlane_out_of_band(self):
        response = self.client.get("/database/?circulation=pr", HTTP_HX_REQUEST="true")
        html = response.content.decode()
        self.assertTrue(html.lstrip().startswith('<div class="table-container"'))
        self.assertIn('hx-swap-oob="true"', html)
        self.assertIn("1 of 1 records placed by circulation", html)

    def test_table_columns_and_cells(self):
        area = Area.objects.create(name="Caribbean")
        TextileRecord.objects.create(year="1755", circulation="co", is_public=True, from_area=area, to_area=area)
        html = self.client.get("/database/").content.decode()
        for header in ["Preview", "Date", "Textile type", "Subtype", "Origin", "Circulation", "Actions"]:
            self.assertIn(header, html)
        self.assertIn("border-dotted", html)          # approximate date
        self.assertIn("border-dashed", html)          # area-only precision ring
        self.assertIn("Unassigned", html)             # null circulation tag
        self.assertIn("Consumption", html)
        self.assertIn("quick-view/", html)            # actions cell
        self.assertNotIn("openModal", html)

    def test_circulation_filter_accepts_multiple_values(self):
        response = self.client.get("/database/?circulation=pr&circulation=td")
        self.assertEqual(response.context["timeline"].placed, 2)
        response = self.client.get("/database/?circulation=co")
        self.assertEqual(response.context["timeline"].placed, 0)

    def test_sidebar_has_field_notes_controls_and_no_modal(self):
        html = self.client.get("/database/").content.decode()
        self.assertIn("Search filters", html)
        self.assertIn('name="circulation" value="pr"', html)
        self.assertIn('name="text_search"', html)
        self.assertNotIn('id="detailsModal"', html)
        self.assertNotIn('name="keyword"', html)
