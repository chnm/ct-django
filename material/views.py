from django.db.models import Max, Min
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django_filters.views import FilterView
from django_tables2 import SingleTableMixin
from taggit.models import Tag

from material.filters import TextileFilter
from material.models import TextileRecord
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
            .distinct()
            .order_by("source_type")
        )

        context["years"] = years
        context["source_types"] = source_types
        return context
