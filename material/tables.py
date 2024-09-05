import django_tables2 as tables
from django.urls import reverse
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django_tables2 import A, TemplateColumn

from material.models import TextileRecord


class TextileTable(tables.Table):
    image = tables.Column(linkify=("textile_records_single", {"item_id": A("id")}))
    textile_type = tables.Column(verbose_name="Textile type", orderable=False)
    textile_subtype = tables.Column(verbose_name="Textile subtype", orderable=False)
    summary_of_record = tables.Column(
        attrs={
            "td": {
                "style": "max-width: 450px; white-space: normal; word-wrap: break-word;"
            }
        }
    )
    transcription = tables.Column(
        attrs={
            "td": {
                "style": "max-width: 550px; white-space: normal; word-wrap: break-word;"
            }
        }
    )
    source_reference = tables.Column(
        attrs={
            "td": {
                "style": "max-width: 350px; white-space: normal; word-wrap: break-word;"
            }
        }
    )

    class Meta:
        model = TextileRecord
        fields = [
            "image",
            "textile_type",
            "textile_subtype",
            "year",
            "source_type",
            "circulation",
            "source_reference",
            "from_area",
            "to_area",
            "from_place",
            "to_place",
            "summary_of_record",
            "transcription",
        ]
        template_name = "database/textile_table.html"
