from decimal import Decimal

import django_filters
from django.db.models import Q

from material.models import Area, Place, Subject, TextileRecord


def get_source_type_choices():
    # Get distinct source_type values from TextileRecord
    choices = (
        TextileRecord.objects.order_by("source_type")
        .values_list("source_type", flat=True)
        .distinct()
    )
    # Convert to tuple format expected by ChoiceFilter choices parameter
    return [
        (choice, choice) for choice in choices if choice
    ]  # Exclude empty or null values


class TextileFilter(django_filters.FilterSet):
    year = django_filters.CharFilter(
        field_name="year", lookup_expr="contains", label="Year"
    )
    transcription = django_filters.CharFilter(
        field_name="transcription", lookup_expr="contains", label="Transcription"
    )
    record_creator = django_filters.CharFilter(
        field_name="record_creator", lookup_expr="contains", label="Record Creator"
    )

    class Meta:
        model = TextileRecord
        fields = [
            "year",
            "transcription",
            "record_creator",
        ]
        empty_text = "No results match the search criteria."
