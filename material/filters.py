from django.db.models import Q
from django.forms import Select, TextInput
from django_filters import (
    CharFilter,
    ChoiceFilter,
    FilterSet,
    ModelChoiceFilter,
    NumberFilter,
)
from taggit.models import Tag

from material.models import Area, Subject, TextileRecord, TextileType


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


class TextileRecordFilter(FilterSet):
    year = NumberFilter(
        field_name="year",
        lookup_expr="contains",
        widget=TextInput(attrs={"placeholder": "Year"}),
    )
    # text_search = CharFilter(method="search_text", label="Search", widget=TextInput(attrs={"placeholder": "Search"}))
    # def text_search_filter(self, queryset, name, value):
    #     return queryset.filter(
    #         Q(summary_of_record__icontains=value) |
    #         Q(transcription__icontains=value)
    #     )
    textile_type = ModelChoiceFilter(
        queryset=TextileType.objects.all(),
        field_name="textile_types",
        widget=Select(attrs={"placeholder": "Textile Type"}),
        label="Textile Type",
    )
    textile_subtype = ModelChoiceFilter(
        queryset=TextileType.objects.all(),
        field_name="textile_types",
        widget=Select(attrs={"placeholder": "Textile Subtype"}),
        label="Textile Subtype",
    )
    subject_type = ModelChoiceFilter(
        queryset=Subject.objects.all(),
        field_name="primary_subjects",
        widget=Select(attrs={"placeholder": "Subject Type"}),
        label="Subject Type",
    )
    subject_subtype = ModelChoiceFilter(
        queryset=Subject.objects.all(),
        field_name="secondary_subjects",
        widget=Select(attrs={"placeholder": "Subject Subtype"}),
        label="Subject Subtype",
    )
    circulation = ChoiceFilter(
        choices=TextileRecord.CIRCULATION_CHOICES,
        field_name="circulation",
        widget=Select(attrs={"placeholder": "Circulation"}),
    )
    # keywords = ModelMultipleChoiceFilter(
    #     queryset=Tag.objects.all(),
    #     widget=CheckboxSelectMultiple(),
    #     field_name="keywords",
    # )
    origin_location = ModelChoiceFilter(
        queryset=Area.objects.all(),
        field_name="from_area",
        widget=Select(attrs={"placeholder": "Area origin"}),
    )
    destination_location = ModelChoiceFilter(
        queryset=Area.objects.all(),
        field_name="to_area",
        widget=Select(attrs={"placeholder": "Area destination"}),
    )
    source_type = ChoiceFilter(
        choices=get_source_type_choices,
        field_name="source_type",
        widget=Select(attrs={"placeholder": "Source Type"}),
    )

    class Meta:
        model = TextileRecord
        fields = [
            "year",
            "subject_type",
            "subject_subtype",
            "textile_type",
            "textile_subtype",
            "circulation",
            # "keywords",
            "origin_location",
            "destination_location",
            "source_type",
        ]
