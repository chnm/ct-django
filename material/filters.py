import re
from decimal import Decimal

import django_filters
from django.db.models import F, IntegerField, Q, Value
from django.db.models.functions import Cast, Coalesce

from material.models import (
    Area,
    Place,
    PrimaryTextileType,
    SecondaryTextileType,
    TextileRecord,
)


def extract_year_range(year_str):
    """
    Extract numeric year or year range from various formats
    Returns a tuple of (start_year, end_year)

    Examples:
    - "1702" -> (1702, 1702)
    - "ca. 1923" -> (1923, 1923)
    - "1923-4" -> (1923, 1924)
    - "1756-1758" -> (1756, 1758)
    - "7th century" -> (600, 699)
    - "late 18th century" -> (1775, 1799)
    - "mid-19th century" -> (1834, 1866)
    - "early 20th century" -> (1900, 1933)
    """
    if not year_str or not isinstance(year_str, str):
        return (None, None)

    # Remove any "ca." or "circa" prefixes
    cleaned = year_str.lower().replace("ca.", "").replace("circa", "").strip()

    # Full century patterns (e.g., "7th century", "18th century")
    century_match = re.search(r"(\d+)(st|nd|rd|th)\s+century", cleaned)
    if century_match:
        century_num = int(century_match.group(1))
        start_year = (century_num - 1) * 100

        # Adjust for qualifiers
        if "early" in cleaned:
            start_year = (century_num - 1) * 100
            end_year = start_year + 33
        elif "mid" in cleaned:
            start_year = (century_num - 1) * 100 + 34
            end_year = start_year + 32
        elif "late" in cleaned:
            start_year = (century_num - 1) * 100 + 75
            end_year = (century_num) * 100 - 1
        else:
            start_year = (century_num - 1) * 100
            end_year = (century_num) * 100 - 1

        return (start_year, end_year)

    # Full year range (e.g., "1756-1758")
    full_range_match = re.search(r"(\d{4})\s*[-–]\s*(\d{4})", cleaned)
    if full_range_match:
        start_year = int(full_range_match.group(1))
        end_year = int(full_range_match.group(2))
        return (start_year, end_year)

    # Abbreviated year range (e.g., "1923-4")
    abbr_range_match = re.search(r"(\d{4})\s*[-–]\s*(\d{1,2})", cleaned)
    if abbr_range_match:
        start_year = int(abbr_range_match.group(1))
        end_digits = abbr_range_match.group(2)

        # Handle cases like "1923-4" (meaning 1923-1924)
        if len(end_digits) < 4:
            prefix = str(start_year)[0 : (4 - len(end_digits))]
            end_year = int(prefix + end_digits)
        else:
            end_year = int(end_digits)

        return (start_year, end_year)

    # Single year (e.g., "1702")
    year_match = re.search(r"(\d{4})", cleaned)
    if year_match:
        year = int(year_match.group(1))
        return (year, year)

    # Decade (e.g., "1850s")
    decade_match = re.search(r"(\d{4})s", cleaned)
    if decade_match:
        decade = int(decade_match.group(1))
        return (decade, decade + 9)

    # If no patterns match, return None
    return (None, None)


class YearRangeFilter(django_filters.Filter):
    """
    Custom filter for searching by a range of years, considering various formats
    """

    def filter(self, qs, value):
        if not value:
            return qs

        # Split the value into start_year-end_year
        try:
            start_year, end_year = value.split("-")
            start_year = int(start_year)
            end_year = int(end_year)
        except (ValueError, AttributeError):
            return qs

        # For each record, check if its year range overlaps with the filter range
        matching_ids = []
        for record in qs:
            record_start, record_end = extract_year_range(record.year)

            # Skip records without parseable years
            if record_start is None or record_end is None:
                continue

            # Check if the ranges overlap
            if record_start <= end_year and record_end >= start_year:
                matching_ids.append(record.id)

        # Return only records with matching IDs
        return qs.filter(id__in=matching_ids)


class TextileFilter(django_filters.FilterSet):
    # Keep the original year filter for backward compatibility
    year = django_filters.CharFilter(
        field_name="year", lookup_expr="icontains", label="Year"
    )

    # Add new year range filter
    year_range = YearRangeFilter(label="Year Range")
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
            "year_range",
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
