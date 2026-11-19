"""Small builders for tests that need catalog records."""

from catalog.models import Item, ItemPlace, ItemTerm, Place, Term

_CIRCULATION = {"pr": "Production", "td": "Trade & Distribution", "co": "Consumption"}


def make_item(circulation=None, keywords=(), **fields):
    defaults = dict(item_type="document", record_status="published", is_public=True,
                    is_context_record=False, legacy_system="test")  # fmt: skip
    defaults.update(fields)
    defaults.setdefault("legacy_id", str(Item.objects.count() + 1))
    if "date_start" in defaults:
        defaults.setdefault("date_precision", "year")
        defaults.setdefault("date_certainty", "stated")
    item = Item.objects.create(**defaults)
    if circulation:
        add_term(item, "circulation_stage", _CIRCULATION[circulation])
    for label in keywords:
        add_term(item, "keyword", label)
    return item


def add_term(item, role, label, vocabulary=None):
    term, _ = Term.objects.get_or_create(
        vocabulary=vocabulary or role, label=label, defaults={"status": "active"}
    )
    return ItemTerm.objects.create(item=item, term=term, role=role, is_primary=False)


def add_place(item, role, name, precision="place", macro_region=None, sequence=1):
    place, _ = Place.objects.get_or_create(
        name_preferred=name,
        defaults=dict(place_type="city", coord_status="approximate", map_level="point",
                      macro_region=macro_region),  # fmt: skip
    )
    return ItemPlace.objects.create(item=item, place=place, role=role, precision=precision,
                                    certainty="certain", sequence=sequence)  # fmt: skip
