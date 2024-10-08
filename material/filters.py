from decimal import Decimal

import django_filters
from django.db.models import Q

from material.models import (
    Area,
    Place,
    PrimaryTextileType,
    SecondaryTextileType,
    TextileRecord,
)


class TextileFilter(django_filters.FilterSet):
    year = django_filters.CharFilter(
        field_name="year", lookup_expr="icontains", label="Year"
    )
    primary_textile_types = django_filters.ModelChoiceFilter(
        queryset=PrimaryTextileType.objects.all(), label="Primary Textile Type"
    )
    secondary_textile_types = django_filters.ModelChoiceFilter(
        queryset=SecondaryTextileType.objects.all(), label="Secondary Textile Type"
    )
    source_type = django_filters.CharFilter(
        field_name="source_type", lookup_expr="exact", label="Source type"
    )
    circulation = django_filters.CharFilter(
        field_name="circulation", lookup_expr="icontains", label="Circulation"
    )
    source_reference = django_filters.CharFilter(
        field_name="source_reference", lookup_expr="icontains", label="Source reference"
    )
    from_area = django_filters.ModelChoiceFilter(
        field_name="from_area",
        queryset=Area.objects.all(),
        label="From area",
    )
    to_area = django_filters.ModelChoiceFilter(
        field_name="to_area",
        queryset=Area.objects.all(),
        label="To area",
    )
    from_place = django_filters.ModelChoiceFilter(
        field_name="from_place",
        queryset=Place.objects.all(),
        label="From place",
    )
    to_place = django_filters.ModelChoiceFilter(
        field_name="to_place",
        queryset=Place.objects.all(),
        label="To place",
    )
    summary_of_record = django_filters.CharFilter(
        field_name="summary_of_record",
        lookup_expr="icontains",
        label="Summary of record",
    )
    transcription = django_filters.CharFilter(
        field_name="transcription", lookup_expr="icontains", label="Transcription"
    )
    keywords = django_filters.CharFilter(
        field_name="keywords__name", lookup_expr="icontains", label="Keywords"
    )
    text_search = django_filters.CharFilter(
        method="search_text",
        label="Text search",
    )

    def search_text(self, queryset, name, value):
        return queryset.filter(
            Q(year__icontains=value)
            | Q(primary_textile_types__name__icontains=value)
            | Q(secondary_textile_types__name__icontains=value)
            | Q(source_type__icontains=value)
            | Q(circulation__icontains=value)
            | Q(source_reference__icontains=value)
            | Q(from_area__name__icontains=value)
            | Q(to_area__name__icontains=value)
            | Q(from_place__city__icontains=value)
            | Q(to_place__city__icontains=value)
            | Q(summary_of_record__icontains=value)
            | Q(transcription__icontains=value)
        )

    class Meta:
        model = TextileRecord
        fields = [
            "year",
            "primary_textile_types",
            "secondary_textile_types",
            "source_type",
            "circulation",
            "source_reference",
            "from_area",
            "to_area",
            "from_place",
            "to_place",
            "summary_of_record",
            "transcription",
            "keywords",
            "text_search",
        ]
        empty_text = "No results match the search criteria."
