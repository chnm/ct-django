"""Load the CSV build package (revisions/CT_database_build_*/csv) into the catalog tables."""

import csv
from pathlib import Path

from django.apps import apps
from django.core.management.base import BaseCommand, CommandError
from django.core.management.color import no_style
from django.db import connection, models, transaction

BUCKET_PREFIX = "connectingthreads.co.uk/"

# Columns in the CSVs that the models leave out on purpose; any other unknown column is an error.
DERIVED = {
    ("movement", "from_place"), ("movement", "to_place"),  # place names, read via the FK
    ("source", "n_items"), ("source", "item_ids"),  # stale copies; use source.item_set
}  # fmt: skip

# Parents before children, matching the build package's own load order.
ORDER = [
    "place", "place_geometry", "place_alias", "agent", "term", "term_alias", "source", "item",
    "document_detail", "object_detail", "visual_detail", "item_text", "media", "item_textile",
    "item_place", "item_agent", "item_term", "relationship", "movement", "trade_observation",
    "source_payload", "collection", "collection_item", "data_issue", "normalization_log",
]  # fmt: skip


class Command(BaseCommand):
    help = "Load the catalog from a folder of CSVs (one per table). Refuses to run if the catalog has rows."

    def add_arguments(self, parser):
        parser.add_argument("csv_dir", type=Path)

    def handle(self, csv_dir, **options):
        by_table = {
            m._meta.db_table: m for m in apps.get_app_config("catalog").get_models()
        }
        missing = [t for t in ORDER if not (csv_dir / f"{t}.csv").exists()]
        if missing:
            raise CommandError(f"Missing CSVs in {csv_dir}: {', '.join(missing)}")
        if any(by_table[t].objects.exists() for t in ORDER):
            raise CommandError(
                "Catalog tables already have rows; not loading over them."
            )

        # FK constraints are deferred until commit, so self-references load in any order.
        with transaction.atomic():
            for table in ORDER:
                n = self.load(by_table[table], csv_dir / f"{table}.csv")
                self.stdout.write(f"{table}: {n}")
            # Explicit ids were inserted, so move AutoField sequences past them.
            # (Not the sqlsequencereset command: its BEGIN/COMMIT would end this transaction early.)
            with connection.cursor() as cur:
                for sql in connection.ops.sequence_reset_sql(
                    no_style(), list(by_table.values())
                ):
                    cur.execute(sql)
        self.stdout.write(self.style.SUCCESS("Catalog loaded."))

    def load(self, model, path):
        fields = {f.column: f for f in model._meta.concrete_fields}
        objs = []
        with path.open(newline="", encoding="utf-8") as fh:
            for row in csv.DictReader(fh):
                kw = {}
                for col, value in row.items():
                    field = fields.get(col)
                    if field is None:
                        if (model._meta.db_table, col) in DERIVED:
                            continue
                        raise CommandError(f"{path.name}: no field for column {col!r}")
                    kw[field.attname] = self.convert(field, value)
                if kw.get("storage_key"):
                    # The build package keeps the bucket name in front of the object key.
                    kw["storage_key"] = kw["storage_key"].removeprefix(BUCKET_PREFIX)
                objs.append(model(**kw))
        model.objects.bulk_create(objs, batch_size=500)
        return len(objs)

    @staticmethod
    def convert(field, value):
        if value == "":
            return None
        if isinstance(field, models.BooleanField):
            if value not in ("0", "1"):
                raise CommandError(f"{field}: expected 0 or 1, got {value!r}")
            return value == "1"
        return field.to_python(value)
