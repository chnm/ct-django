"""Apply the Textile_Terms glossary columns the CSV build package left out.

catalog/data/textile_glossary.csv (from CT_vocabularies_and_keywords_revised.xlsx,
sheet Textile_Terms) gives each cloth name its usual textile form and the
curator's note. Safe to run again: it only sets what is missing or out of date.
"""

import csv
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction

from catalog.models import Term, TermAlias

GLOSSARY = Path(__file__).resolve().parents[2] / "data" / "textile_glossary.csv"
BUILD_STAMP = "Added 2026-10-02."  # placeholder the build wrote over the curator notes


def find_term(label):
    term = Term.objects.filter(vocabulary="textile_type", label__iexact=label).first()
    if (
        term is None
    ):  # the sheet and the build sometimes prefer different spellings (Bafta / Baft)
        alias = TermAlias.objects.filter(term__vocabulary="textile_type",
                                         alias__iexact=label).first()  # fmt: skip
        term = alias.term if alias else None
    return term


def merged_note(current, note):
    if not note or note in (current or ""):
        return current
    if not current or current == BUILD_STAMP:
        return note
    return f"{current} {note}"


class Command(BaseCommand):
    help = "Set textile terms' default form and curator notes from the glossary file."

    def add_arguments(self, parser):
        parser.add_argument("csv_path", nargs="?", type=Path, default=GLOSSARY)

    @transaction.atomic
    def handle(self, csv_path, **options):
        forms = {
            t.label.lower(): t for t in Term.objects.filter(vocabulary="textile_form")
        }
        updated, missing = 0, []
        with csv_path.open(newline="", encoding="utf-8") as fh:
            for row in csv.DictReader(fh):
                term = find_term(row["term"])
                if term is None:
                    missing.append(row["term"])
                    continue
                form = forms.get(row["default_textile_form"].lower())
                note = merged_note(term.notes, row["note"])
                if (term.default_form, term.notes) != (form or term.default_form, note):
                    term.default_form = form or term.default_form
                    term.notes = note
                    term.save(update_fields=["default_form", "notes"])
                    updated += 1
        if missing:
            self.stderr.write(f"glossary: no textile term for {', '.join(missing)}")
        self.stdout.write(f"glossary: {updated} terms updated")
