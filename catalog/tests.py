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
from catalog.models import Item, ItemPlace, Place

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
