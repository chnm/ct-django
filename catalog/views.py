from types import SimpleNamespace

from django.db.models import Max, Min, Prefetch, Q
from django.db.models.functions import Coalesce
from django.http import Http404
from django.shortcuts import get_object_or_404, redirect, render
from django_filters.views import FilterView
from django_tables2 import SingleTableMixin

from catalog.filters import REGIONS, SOURCE_TYPES, ItemFilter
from catalog.models import Item, ItemPlace, ItemTerm, ItemText, Media, Relationship
from catalog.tables import ItemTable
from catalog.templatetags.database_tags import phase_codes, terms
from catalog.timeline import PHASE_BY_LABEL, PHASES, build_timeline, is_approximate

PREFETCH = [
    Prefetch("itemterm_set", queryset=ItemTerm.objects.select_related("term")),
    Prefetch(
        "itemplace_set",
        queryset=ItemPlace.objects.select_related("place").order_by("sequence"),
    ),
    Prefetch("media_set", queryset=Media.objects.filter(media_type="image")),
]


def public_items():
    return Item.objects.public().prefetch_related(*PREFETCH)


def timeline_rows(items):
    """One row per record per circulation phase (records with no phase get one unassigned row)."""
    stages = {}
    for item_id, label in ItemTerm.objects.filter(
        role="circulation_stage", item__in=items
    ).values_list("item_id", "term__label"):
        stages.setdefault(item_id, []).append(PHASE_BY_LABEL.get(label))
    fields = ["item_id", "date_start", "date_end", "date_precision", "date_certainty",
              "date_display"]  # fmt: skip
    rows = []
    for values in items.values_list(*fields):
        item = SimpleNamespace(**dict(zip(fields, values)))
        for code in stages.get(item.item_id, [None]):
            rows.append(
                SimpleNamespace(
                    id=item.item_id,
                    start=item.date_start,
                    end=item.date_end,
                    approximate=is_approximate(item),
                    date_display=item.date_display,
                    circulation=code,
                )
            )
    return rows


class DatabaseView(SingleTableMixin, FilterView):
    paginate_by = 25
    table_class = ItemTable
    filterset_class = ItemFilter

    def get_queryset(self):
        return public_items().order_by(
            Coalesce("date_start", 9999), "item_id"
        )  # undated last

    def get_template_names(self):
        if self.request.htmx:
            return ["database/single_table.html"]
        return ["database/textiles.html"]

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        bounds = Item.objects.public().aggregate(
            lo=Min("date_start"), hi=Max(Coalesce("date_end", "date_start"))
        )
        # Round out to centuries for a cleaner slider.
        min_year = ((bounds["lo"] or 1500) // 100) * 100
        max_year = ((bounds["hi"] or 2000) // 100 + 1) * 100
        try:
            current_min, current_max = map(
                int, self.request.GET.get("year_range", "").split("-")
            )
        except ValueError:
            current_min, current_max = min_year, max_year
        context.update(
            circulation_types=[(code, p.label) for code, p in PHASES.items()],
            regions=REGIONS,
            source_types=SOURCE_TYPES,
            textile_selects=[
                (self.filterset.form["textile_type"], "All cloths"),
                (self.filterset.form["textile_form"], "All forms"),
            ],
            region_selects=[
                ("from_region", "From region", "Any origin", self.request.GET.get("from_region")),
                ("to_region", "To region", "Any destination", self.request.GET.get("to_region")),
            ],
            min_year=min_year,
            max_year=max_year,
            current_min_year=current_min,
            current_max_year=current_max,
            timeline=build_timeline(timeline_rows(self.object_list)),
        )
        return context


def _public_item_or_redirect(item_id):
    """Old URLs used TextileRecord's numeric id; send them to the record that replaced it."""
    if item_id.isdigit():
        old = Item.objects.filter(legacy_system="TextileRecord", legacy_id=item_id).first()
        if old is None:
            raise Http404
        return None, (old.merged_into_id or old.pk)
    return get_object_or_404(public_items(), pk=item_id), None


def record(request, item_id):
    item, moved_to = _public_item_or_redirect(item_id)
    if moved_to:
        return redirect("textile_single", item_id=moved_to, permanent=True)

    public = Item.objects.public()
    related = Relationship.objects.filter(status="confirmed").filter(
        Q(from_item=item) | Q(to_item=item)
    )
    related_ids = {r.to_item_id if r.from_item_id == item.pk else r.from_item_id for r in related}
    linked = list(public_items().filter(pk__in=related_ids).order_by("item_id")[:4])
    linked_reason = "related records" if linked else ""
    keyword = (terms(item, "keyword") or [None])[0]
    if keyword and len(linked) < 4:
        extra = list(
            public_items()
            .filter(itemterm__role="keyword", itemterm__term=keyword)
            .exclude(pk=item.pk)
            .exclude(pk__in=[r.pk for r in linked])
            .order_by("item_id")
            .distinct()[: 4 - len(linked)]
        )
        if extra and not linked:
            linked_reason = f"shares keyword “{keyword.label}”"
        linked += extra

    if item.date_start is None:
        date_certainty = "undated"
    elif is_approximate(item):
        date_certainty = "approximate"
    else:
        date_certainty = "exact year"

    placeable = item.date_start is not None and any(
        code in PHASES for code in phase_codes(item)
    )
    subjects = [link.agent for link in item.itemagent_set.filter(role="subject").select_related("agent")]
    subjects += terms(item, "subject")

    return render(
        request,
        "database/textile_records_single.html",
        {
            "item": item,
            "timeline": build_timeline(
                timeline_rows(public), highlight_id=item.pk if placeable else None, compact=True
            ),
            "timeline_label": (
                "This record highlighted"
                if placeable
                else "This record is not placed on the timeline"
            ),
            "transcriptions": ItemText.objects.filter(
                item=item, text_role="transcription", status="present"
            ),
            "subjects": subjects,
            "linked": linked,
            "linked_reason": linked_reason,
            "date_certainty": date_certainty,
        },
    )


def quick_view(request, item_id):
    item = get_object_or_404(public_items(), pk=item_id)
    return render(request, "database/_quick_view.html", {"item": item})
