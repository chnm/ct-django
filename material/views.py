import logging

from django.db import models
from django.db.models import Max, Min
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django_filters.views import FilterView
from django_tables2 import SingleTableMixin
from taggit.models import Tag

from exhibits.models import ExhibitHome, HomeAboutSnippet
from material.filters import TextileFilter
from material.models import PrimaryTextileType, SecondaryTextileType, TextileRecord
from material.tables import TextileTable

logger = logging.getLogger(__name__)


def index(request):
    exhibits = ExhibitHome.objects.live().public().order_by("exhibit_display_order")
    # Get the first HomeAboutSnippet (or create a default one if none exists)
    try:
        about_snippet = HomeAboutSnippet.objects.first()
        if not about_snippet:
            # Create a default snippet if none exists
            about_snippet = HomeAboutSnippet.objects.create(
                title="Connecting Threads",
                subtitle="Fashioning Madras in India and the Caribbean",
                content="""
                <p>Connecting Threads is a collaborative digital history project dedicated to amplifying the contributions of Indian weavers and African Caribbean consumers to global histories of dress.</p>
                <p>Drawing on the work of an interdisciplinary team of researchers, the project has re-examined the history of the Madras handkerchief, an internationally popular dress accessory made of brightly coloured checked cotton.</p>
                <p>This exhibition explores the influence of Madras handkerchiefs on 18th and 19th century dress, from its origins in South India to Madras fashions in the Greater Caribbean and beyond.</p>
                """,
            )
    except:
        # In case of any issues, provide a fallback snippet
        about_snippet = {
            "title": "Connecting Threads",
            "subtitle": "Fashioning Madras in India and the Caribbean",
            "content": """
            <p>Connecting Threads is a collaborative digital history project dedicated to amplifying the contributions of Indian weavers and African Caribbean consumers to global histories of dress.</p>
            <p>Drawing on the work of an interdisciplinary team of researchers, the project has re-examined the history of the Madras handkerchief, an internationally popular dress accessory made of brightly coloured checked cotton.</p>
            <p>This exhibition explores the influence of Madras handkerchiefs on 18th and 19th century dress, from its origins in South India to Madras fashions in the Greater Caribbean and beyond.</p>
            """,
        }

    return render(
        request, "index.html", {"exhibits": exhibits, "about_snippet": about_snippet}
    )


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
        "transcription": record.transcription if record.transcription else None,
        "summary_of_record": record.summary_of_record
        if record.summary_of_record
        else None,
        "source_reference": record.source_reference
        if record.source_reference
        else None,
        "source_type": record.source_type if record.source_type else None,
        "description_of_source": record.description_of_source
        if record.description_of_source
        else None,
        "record_creator": record.record_creator if record.record_creator else None,
        "crosslinks": [str(link) for link in record.crosslinks.all()]
        if record.crosslinks
        else None,
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
    paginate_by = 25
    table_class = TextileTable
    filterset_class = TextileFilter
    # Only show public records that are properly reviewed
    queryset = TextileRecord.objects.filter(is_public=True)

    def get_template_names(self):
        if self.request.htmx:
            return ["database/single_table.html"]
        return ["database/textiles.html"]

    def get_queryset(self):
        queryset = super().get_queryset()
        selected_keyword = self.request.GET.get("keyword")
        if selected_keyword:
            queryset = queryset.filter(keywords__name=selected_keyword)
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Use only public records for filter options
        textile_records = TextileRecord.objects.filter(is_public=True)

        years = (
            textile_records.values_list("year", flat=True).distinct().order_by("year")
        )

        # Find earliest and latest years for the year range slider
        from material.filters import extract_year_range

        min_year = 1500  # Default minimum year
        max_year = 2000  # Default maximum year

        # Find actual min/max years from the data
        for year_str in years:
            if year_str:
                start_year, end_year = extract_year_range(year_str)
                if start_year and start_year < min_year:
                    min_year = start_year
                if end_year and end_year > max_year:
                    max_year = end_year

        # Round to nearest century boundaries for cleaner UI
        min_year = (min_year // 100) * 100
        max_year = ((max_year // 100) + 1) * 100
        keywords = Tag.objects.all().values_list("name", flat=True).order_by("name")
        source_types = (
            textile_records.values_list("source_type", flat=True)
            .exclude(source_type__isnull=True)
            .distinct()
            .order_by("source_type")
        )
        circulation_choices = TextileRecord.CIRCULATION_CHOICES
        circulation_types = [(abbr, full) for abbr, full in circulation_choices]

        # Get current year range values from request, if any
        current_year_range = self.request.GET.get(
            "year_range", f"{min_year}-{max_year}"
        )
        try:
            current_min, current_max = map(int, current_year_range.split("-"))
        except (ValueError, AttributeError):
            current_min, current_max = min_year, max_year

        context["years"] = years
        context["keywords"] = keywords
        context["selected_keyword"] = self.request.GET.get("keyword")
        context["source_types"] = source_types
        context["circulation_types"] = circulation_types
        context["min_year"] = min_year
        context["max_year"] = max_year
        context["current_min_year"] = current_min
        context["current_max_year"] = current_max
        return context
