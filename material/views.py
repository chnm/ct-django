from django.db.models import Max, Min
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django_filters.views import FilterView
from django_tables2 import SingleTableMixin
from taggit.models import Tag

from material.filters import TextileFilter
from material.models import PrimaryTextileType, SecondaryTextileType, TextileRecord
from material.tables import TextileTable


def index(request):
    return render(request, "index.html")


def keyword_search(request):
    query = request.GET.get("q", "")
    if query:
        tags = Tag.objects.filter(name__icontains=query)
        results = [{"name": tag.name} for tag in tags]
    else:
        results = []
    return JsonResponse(results, safe=False)


def record_details(request, record_id):
    record = get_object_or_404(TextileRecord, id=record_id)
    data = {
        "to_area": str(record.to_area) if record.to_area else None,
        "from_area": str(record.from_area) if record.from_area else None,
        "to_place": str(record.to_place) if record.to_place else None,
        "from_place": str(record.from_place) if record.from_place else None,
        "transcription": record.transcription,
        "summary_of_record": record.summary_of_record,
        "source_reference": record.source_reference,
        "source_type": record.source_type,
    }
    return JsonResponse(data)


def get_secondary_textile_types(request, primary_id):
    if not primary_id:
        # Return an empty set if no primary textile type is selected
        return JsonResponse([], safe=False)

    try:
        primary_textile_type = PrimaryTextileType.objects.get(id=primary_id)
        # Fetch TextileRecord instances that have the selected PrimaryTextileType
        textile_records = TextileRecord.objects.filter(
            primary_textile_types=primary_textile_type
        )
        # Extract the related SecondaryTextileType instances
        secondary_types = (
            SecondaryTextileType.objects.filter(textile_records__in=textile_records)
            .distinct()
            .values("id", "name")
        )
        data = [{"value": st["id"], "name": st["name"]} for st in secondary_types]
        return JsonResponse(data, safe=False)
    except PrimaryTextileType.DoesNotExist:
        return JsonResponse({"error": "PrimaryTextileType not found"}, status=404)


def textile_records_single(request, item_id):
    item = get_object_or_404(TextileRecord, pk=item_id)
    return render(request, "database/textile_records_single.html", {"item": item})


class TextileTableView(SingleTableMixin, FilterView):
    paginate_by = 15
    table_class = TextileTable
    filterset_class = TextileFilter
    queryset = TextileRecord.objects.all()

    def get_template_names(self):
        if self.request.htmx:
            return ["database/single_table.html"]
        return ["database/textiles.html"]

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        years = (
            TextileRecord.objects.values_list("year", flat=True)
            .distinct()
            .order_by("year")
        )
        source_types = (
            TextileRecord.objects.values_list("source_type", flat=True)
            .exclude(source_type__isnull=True)
            .distinct()
            .order_by("source_type")
        )
        CIRCULATION_CHOICES = TextileRecord.CIRCULATION_CHOICES
        circulation_types = [(abbr, full) for abbr, full in CIRCULATION_CHOICES]

        context["years"] = years
        context["source_types"] = source_types
        context["circulation_types"] = circulation_types
        return context
