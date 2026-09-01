from unittest.mock import Mock, patch

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
