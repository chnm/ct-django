import csv
import io

from django.core.management import call_command

from catalog.management.commands.load_glossary import BUILD_STAMP, merged_note
from catalog.models import Term, TermAlias
from catalog.testing import add_term, make_item


def test_merged_note():
    assert merged_note(BUILD_STAMP, "Glazed.") == "Glazed."
    assert merged_note(None, "Glazed.") == "Glazed."
    assert merged_note("Moved here.", "Glazed.") == "Moved here. Glazed."
    assert merged_note("Moved here. Glazed.", "Glazed.") == "Moved here. Glazed."
    assert merged_note("Moved here.", "") == "Moved here."


def test_load_glossary_sets_form_and_notes_and_matches_aliases(db, tmp_path):
    handkerchief = Term.objects.create(
        vocabulary="textile_form", label="Handkerchief", status="active"
    )
    ventapollam = Term.objects.create(vocabulary="textile_type", label="Ventapollam", status="active",
                                      notes=BUILD_STAMP)  # fmt: skip
    baft = Term.objects.create(vocabulary="textile_type", label="Baft", status="active")
    TermAlias.objects.create(alias="bafta", alias_normalized="bafta", term=baft, label="Baft",
                             vocabulary="textile_type")  # fmt: skip
    path = tmp_path / "glossary.csv"
    with path.open("w", newline="") as fh:
        w = csv.writer(fh)
        w.writerow(["term", "default_textile_form", "note"])
        w.writerow(["Ventapollam", "Handkerchief", "Glazed handkerchiefs."])
        w.writerow(["Bafta", "Handkerchief", ""])
        w.writerow(["Unknown cloth", "Handkerchief", ""])
    err = io.StringIO()
    call_command("load_glossary", path, stdout=io.StringIO(), stderr=err)
    ventapollam.refresh_from_db()
    baft.refresh_from_db()
    assert (ventapollam.default_form, ventapollam.notes) == (
        handkerchief,
        "Glazed handkerchiefs.",
    )
    assert baft.default_form == handkerchief  # found through its alias
    assert "Unknown cloth" in err.getvalue()
    out = io.StringIO()
    call_command("load_glossary", path, stdout=out, stderr=io.StringIO())
    assert "0 terms updated" in out.getvalue()


def test_shipped_glossary_file_is_complete():
    from catalog.management.commands.load_glossary import GLOSSARY

    rows = list(csv.DictReader(GLOSSARY.open(encoding="utf-8")))
    assert len(rows) == 85
    assert all(r["default_textile_form"] for r in rows)


def test_database_text_search_finds_spelling_variants(client, db):
    item = make_item()
    link = add_term(item, "textile_type", "Ventapollam")
    TermAlias.objects.create(alias="ventapolam", alias_normalized="ventapolam", term=link.term,
                             label="Ventapollam", vocabulary="textile_type")  # fmt: skip
    make_item()
    found = client.get("/database/?text_search=Ventapolam").context["table"].data
    assert [i.pk for i in found] == [item.pk]
