import django_filters
from django.db.models import Q

from catalog.models import Item, ItemPlace, ItemTerm, ItemText, Term
from catalog.timeline import PHASES

# place.macro_region values (Data Dictionary); "Europe" is only a parent area, not a filter.
REGIONS = ["India", "Britain", "Europe (excluding Britain)", "Caribbean",
           "Americas (US included)", "Africa", "Southeast Asia", "Asia"]  # fmt: skip
SOURCE_TYPES = [
    ("primary", "Primary source"),
    ("primary_cited", "Primary source, cited from a secondary work"),
    ("secondary", "Secondary source"),
    ("oral_history", "Oral history"),
]


def _items(model, **lookup):
    return model.objects.filter(**lookup).values("item_id")


class ItemFilter(django_filters.FilterSet):
    year_range = django_filters.CharFilter(method="filter_years", label="Year range")
    textile_type = django_filters.ModelChoiceFilter(
        queryset=Term.objects.filter(vocabulary="textile_type", status="active").order_by("label"),
        method="filter_term",
        label="Textile type",
    )
    textile_form = django_filters.ModelChoiceFilter(
        queryset=Term.objects.filter(vocabulary="textile_form", status="active").order_by("label"),
        method="filter_term",
        label="Form",
    )
    circulation = django_filters.MultipleChoiceFilter(
        choices=[(code, p.label) for code, p in PHASES.items()],
        method="filter_circulation",
        label="Circulation",
    )
    from_region = django_filters.ChoiceFilter(
        choices=[(r, r) for r in REGIONS], method="filter_from_region", label="From region"
    )
    to_region = django_filters.ChoiceFilter(
        choices=[(r, r) for r in REGIONS], method="filter_to_region", label="To region"
    )
    source_type = django_filters.ChoiceFilter(
        field_name="evidence_level",
        choices=SOURCE_TYPES,
        label="Source type",
    )
    keyword = django_filters.CharFilter(method="filter_keyword", label="Keyword")
    text_search = django_filters.CharFilter(method="filter_text", label="Text search")

    class Meta:
        model = Item
        fields = []

    def filter_years(self, qs, name, value):
        try:
            lo, hi = (int(v) for v in value.split("-"))
        except ValueError:
            return qs
        # Overlap: starts before the range ends and ends after it starts (a single year has no end).
        return qs.filter(date_start__lte=hi).filter(
            Q(date_end__gte=lo) | Q(date_end__isnull=True, date_start__gte=lo)
        )

    def filter_term(self, qs, name, value):
        return qs.filter(pk__in=_items(ItemTerm, term=value))

    def filter_circulation(self, qs, name, value):
        if not value:
            return qs
        labels = [PHASES[code].label for code in value]
        return qs.filter(
            pk__in=_items(ItemTerm, role="circulation_stage", term__label__in=labels)
        )

    def filter_from_region(self, qs, name, value):
        return qs.filter(pk__in=_items(ItemPlace, role="origin", place__macro_region=value))

    def filter_to_region(self, qs, name, value):
        return qs.filter(
            pk__in=_items(ItemPlace, role="destination", place__macro_region=value)
        )

    def filter_keyword(self, qs, name, value):
        return qs.filter(pk__in=_items(ItemTerm, role="keyword", term__label__iexact=value))

    def filter_text(self, qs, name, value):
        return qs.filter(
            Q(title__icontains=value)
            | Q(summary__icontains=value)
            | Q(source_citation__icontains=value)
            | Q(date_display__icontains=value)
            | Q(pk__in=_items(ItemText, text_body__icontains=value))
            | Q(pk__in=_items(ItemTerm, term__label__icontains=value))
            | Q(pk__in=_items(ItemPlace, place__name_preferred__icontains=value))
        )
