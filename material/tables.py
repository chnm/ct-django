import django_tables2 as tables
from django.urls import reverse
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django_tables2 import A, TemplateColumn

from material.models import TextileRecord


class TextileTable(tables.Table):
    image = tables.TemplateColumn(
        template_name="database/image_display.html",
        verbose_name="Image",
        orderable=False,
    )
    year = tables.Column(verbose_name="Year", orderable=False)
    textile_type = tables.TemplateColumn(
        template_name="database/textile_type.html",
        verbose_name="Textile Type",
        orderable=False,
    )
    textile_subtype = tables.TemplateColumn(
        template_name="database/textile_subtype.html",
        verbose_name="Textile Subtype",
        orderable=False,
    )
    circulation = tables.Column(verbose_name="Circulation", orderable=False)
    details = tables.TemplateColumn(
        template_code="""
        <div class="flex justify-center items-center">
        <a href="#" onclick="openModal('{{ record.id }}', '{% url 'textile_single' item_id=record.id %}')">
            <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
        </a>
        </div>
        """,
        verbose_name="Details",
        orderable=False,
    )

    class Meta:
        model = TextileRecord
        template_name = "database/textile_table.html"
        attrs = {
            "class": "min-w-full divide-y divide-gray-200",
        }
        fields = (
            "image",
            "year",
            "textile_type",
            "textile_subtype",
            "circulation",
            "details",
        )
