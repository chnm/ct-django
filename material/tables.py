import django_tables2 as tables
from django.urls import reverse
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django_tables2 import A, TemplateColumn

from material.models import TextileRecord


class TextileTable(tables.Table):
    image = tables.TemplateColumn(
        template_name="database/image_display.html",
        verbose_name="Preview",
        orderable=False,
    )
    year = tables.Column(
        verbose_name="Year",
        orderable=False,
        attrs={"td": {"class": "py-3 px-4"}},
    )
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
    circulation = tables.Column(
        verbose_name="Circulation",
        orderable=False,
        attrs={"td": {"class": "py-3 px-4"}},
    )
    actions = tables.TemplateColumn(
        template_code="""
        <div class="flex justify-center items-center space-x-2">
            <button 
                onclick="openModal('{{ record.id }}', '{% url 'textile_single' item_id=record.id %}')"
                class="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-md hover:bg-secondary-200 transition-colors"
                title="Quick view"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            </button>
            <a 
                href="{% url 'textile_single' item_id=record.id %}"
                class="px-3 py-1 bg-primary-100 text-primary-700 rounded-md hover:bg-primary-200 transition-colors"
                title="Full details"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </a>
        </div>
        """,
        verbose_name="Actions",
        orderable=False,
    )

    class Meta:
        model = TextileRecord
        template_name = "database/textile_table.html"
        attrs = {
            "class": "min-w-full divide-y divide-gray-200 border-collapse",
            "th": {
                "class": "px-4 py-3 text-left text-xs font-medium text-primary-600 uppercase tracking-wider bg-primary-50"
            },
            "tbody": {"class": "bg-white divide-y divide-gray-200"},
            "tr": {"class": "hover:bg-gray-50 transition-colors"},
        }
        fields = (
            "image",
            "year",
            "textile_type",
            "textile_subtype",
            "circulation",
            "actions",
        )
