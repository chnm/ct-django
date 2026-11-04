import csv
import tempfile
from pathlib import Path

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.core.management.base import CommandError
from django.test import TestCase, override_settings
from django.urls import reverse

from catalog.management.commands.load_catalog import ORDER
from catalog.models import Item, ItemPlace, Place, format_date

ROWS = {
    # Child place listed before its parent: the load must not depend on row order.
    "place": [
        {"place_id": "PL-002", "name_preferred": "Fort St. George", "place_type": "fort",
         "coord_status": "approximate", "map_level": "point", "broader_place_id": "PL-001"},
        {"place_id": "PL-001", "name_preferred": "Madras", "place_type": "city",
         "coord_status": "approximate", "map_level": "point", "latitude": "13.08"},
    ],
    "item": [
        {"item_id": "CT-00001", "item_type": "document", "record_status": "published", "is_public": "1",
         "is_context_record": "0", "legacy_system": "TextileRecord", "legacy_id": "1", "date_start": "1790"},
    ],
    "item_place": [
        {"item_place_id": "7", "item_id": "CT-00001", "place_id": "PL-002", "role": "origin",
         "precision": "place", "certainty": "certain", "sequence": "1"},
    ],
}  # fmt: skip


class LoadCatalogTests(TestCase):
    def setUp(self):
        self.dir = Path(tempfile.mkdtemp())
        for table in ORDER:
            rows = ROWS.get(table, [])
            with (self.dir / f"{table}.csv").open("w", newline="") as fh:
                w = csv.DictWriter(fh, fieldnames=sorted({k for r in rows for k in r}))
                w.writeheader()
                w.writerows(rows)

    def test_loads_converts_and_resets_sequences(self):
        call_command("load_catalog", self.dir, stdout=open("/dev/null", "w"))

        item = Item.objects.get(pk="CT-00001")
        self.assertIs(item.is_public, True)
        self.assertEqual(item.date_start, 1790)
        self.assertIsNone(item.title)  # empty CSV cell -> NULL
        self.assertEqual(
            Place.objects.get(pk="PL-002").broader_place.name_preferred, "Madras"
        )
        # A new row after an explicit-id load must not collide with id 7.
        new = ItemPlace.objects.create(
            item=item,
            place_id="PL-001",
            role="destination",
            precision="place",
            certainty="certain",
            sequence=1,
        )
        self.assertGreater(new.pk, 7)

    def test_refuses_to_load_over_existing_rows(self):
        call_command("load_catalog", self.dir, stdout=open("/dev/null", "w"))
        with self.assertRaises(CommandError):
            call_command("load_catalog", self.dir)


# The manifest storage needs collectstatic, which tests don't run.
@override_settings(
    STORAGES={
        **settings.STORAGES,
        "staticfiles": {
            "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"
        },
    }
)
class CatalogAdminTests(TestCase):
    def setUp(self):
        user = get_user_model().objects.create_superuser(
            "admin", "a@example.invalid", "x"
        )
        self.client.force_login(user)
        self.item = Item.objects.create(
            item_id="CT-00001", item_type="document", record_status="published",
            is_public=True, is_context_record=False, legacy_system="TextileRecord", legacy_id="1",
        )  # fmt: skip

    def get(self, name, *args):
        return self.client.get(reverse(f"admin:catalog_{name}", args=args), secure=True)

    def test_pages_render(self):
        for model in ["item", "place", "agent", "term", "source", "collection", "dataissue",
                      "normalizationlog"]:  # fmt: skip
            self.assertEqual(self.get(f"{model}_changelist").status_code, 200, model)
        self.assertEqual(self.get("item_add").status_code, 200)
        self.assertEqual(self.get("item_change", self.item.pk).status_code, 200)

    def test_publish_action_skips_merged_records(self):
        Item.objects.filter(pk="CT-00001").update(
            record_status="staged", is_public=False
        )
        Item.objects.create(
            item_id="CT-00002", item_type="document", record_status="merged", is_public=False,
            is_context_record=False, legacy_system="TextileRecord", legacy_id="2",
        )  # fmt: skip
        self.client.post(
            reverse("admin:catalog_item_changelist"),
            {"action": "publish", "_selected_action": ["CT-00001", "CT-00002"]},
            secure=True,
        )
        self.assertEqual(
            dict(Item.objects.values_list("item_id", "record_status")),
            {"CT-00001": "published", "CT-00002": "merged"},
        )


class ModelRulesTests(TestCase):
    def make_item(self, **kw):
        fields = dict(item_type="document", record_status="staged", is_public=False,
                      is_context_record=False, legacy_system="manual")  # fmt: skip
        return Item.objects.create(**{**fields, **kw})

    def test_next_id_follows_highest_existing(self):
        self.make_item(item_id="CT-00412", legacy_id="a")
        self.make_item(item_id="CT-00007", legacy_id="b")
        self.assertEqual(self.make_item(legacy_id="c").pk, "CT-00413")
        place = Place.objects.create(name_preferred="Pegu", place_type="city",
                                     coord_status="approximate", map_level="point")  # fmt: skip
        self.assertEqual(place.pk, "PL-001")

    def test_date_display_is_generated_from_years(self):
        cases = [
            ((1792, 1792, "year", "stated"), "1792"),
            ((1855, None, "circa", "stated"), "ca. 1855"),
            ((1790, 1799, "decade", "stated"), "1790s"),
            ((1791, 1802, "range", "stated"), "1791-1802"),
            ((1855, 1879, "circa_range", "inferred"), "ca. 1855-1879 (inferred)"),
            ((1700, 1799, "century", "stated"), "18th century"),
            ((2000, 2099, "century", "stated"), "21st century"),
            ((1000, 1099, "century", "stated"), "11th century"),
            ((None, None, None, None), None),
        ]
        for args, expected in cases:
            self.assertEqual(format_date(*args), expected, args)
        item = self.make_item(legacy_id="d", date_start=1792, date_end=1792,
                              date_precision="year", date_display="wrong")  # fmt: skip
        self.assertEqual(item.date_display, "1792")
        undated = self.make_item(legacy_id="e", date_display="undated")
        self.assertEqual(undated.date_display, "undated")

    def test_admin_locks_primary_key_on_existing_rows(self):
        from django.contrib import admin

        model_admin = admin.site._registry[Item]
        self.assertNotIn("item_id", model_admin.get_readonly_fields(None))
        self.assertIn(
            "item_id",
            model_admin.get_readonly_fields(None, self.make_item(legacy_id="f")),
        )
