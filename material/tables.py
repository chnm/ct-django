import django_tables2 as tables
from django.urls import reverse
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from django_tables2 import A, TemplateColumn

from material.models import TextileRecord


class TextileTable(tables.Table):
    image = tables.Column(linkify=("textile_records_single", {"item_id": A("id")}))
    textile_type = tables.Column(
        empty_values=(), verbose_name="Textile type", orderable=False
    )
    textile_subtype = tables.Column(
        empty_values=(), verbose_name="Textile subtype", orderable=False
    )
    summary_of_record = tables.Column(
        attrs={
            "td": {
                "style": "max-width: 250px; white-space: normal; word-wrap: break-word;"
            }
        }
    )
    transcription = tables.Column(
        attrs={
            "td": {
                "style": "max-width: 250px; white-space: normal; word-wrap: break-word;"
            }
        }
    )
    source_reference = tables.Column(
        attrs={
            "td": {
                "style": "max-width: 250px; white-space: normal; word-wrap: break-word;"
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
            "summary_of_record",
            "transcription",
        ]
        template_name = "database/textile_table.html"


# class TextileRecordTable(tables.Table):
#     image = tables.Column(empty_values=(), verbose_name="Image", orderable=False)
#     textile_type = tables.Column(
#         empty_values=(), verbose_name="Textile type", orderable=False
#     )
#     textile_subtype = tables.Column(
#         empty_values=(), verbose_name="Textile subtype", orderable=False
#     )
#     summary_of_record = tables.Column(
#         attrs={
#             "td": {
#                 "style": "max-width: 250px; white-space: normal; word-wrap: break-word;"
#             }
#         }
#     )
#     transcription = tables.Column(
#         attrs={
#             "td": {
#                 "style": "max-width: 250px; white-space: normal; word-wrap: break-word;"
#             }
#         }
#     )
#     source_reference = tables.Column(
#         attrs={
#             "td": {
#                 "style": "max-width: 250px; white-space: normal; word-wrap: break-word;"
#             }
#         }
#     )

#     def render_image(self, record):
#         images = list(record.images.all())

#         # Generate the URL for the item's detail page
#         item_detail_url = reverse(
#             "textile_records_single", kwargs={"item_id": record.id}
#         )

#         if not images:
#             html_output = format_html(
#                 'No images attached. <br/><a class="text-sm" href="{}">View item details</a>',
#                 item_detail_url,
#             )
#             return html_output

#         # Always display the first image with a link to the item detail page
#         html_output = format_html(
#             '<img src="{}" width="100" height="100" /><br/><a class="text-sm" href="{}">View item details</a>',
#             images[0].image.url,
#             item_detail_url,
#         )

#         return html_output

#     def render_textile_type(self, record):
#         # Fetch all related textile_type names and join them with a comma
#         names = [
#             textile_type.name
#             for textile_type in record.textile_types.all()
#             if textile_type.name is not None
#         ]
#         return ", ".join(names)

#     def render_textile_subtype(self, record):
#         # Fetch all related textile_subtype names and join them with a comma
#         names = [
#             textile_subtype.name
#             for textile_subtype in record.textile_types.all()
#             if textile_subtype.name is not None
#         ]
#         return ", ".join(names)

#     subject_type = tables.Column(empty_values=(), verbose_name="Primary subject")
#     subject_subtype = tables.Column(empty_values=(), verbose_name="Secondary subject")

#     def render_subject_type(self, record):
#         # Fetch all related primary_subject names and join them with a comma
#         names = [
#             subject.name
#             for subject in record.primary_subjects.all()
#             if subject.name is not None
#         ]
#         return ", ".join(names)

#     def render_subject_subtype(self, record):
#         # Fetch all related secondary_subject names and join them with a comma
#         names = [
#             subject.name
#             for subject in record.secondary_subjects.all()
#             if subject.name is not None
#         ]
#         return ", ".join(names)

#     class Meta:
#         model = TextileRecord
#         fields = [
#             "image",
#             "textile_type",
#             "textile_subtype",
#             "year",
#             "source_type",
#             "circulation",
#             "source_reference",
#             "from_area",
#             "to_area",
#             "summary_of_record",
#             "transcription",
#             # "keywords",
#         ]
#         empty_text = "No records match your filter."
#         attrs = {
#             "class": "min-w-full divide-y divide-gray-200",  # Table classes
#             "thead": {"class": "bg-gray-50"},  # Header row classes
#             "tr": {
#                 "class": "bg-white border-b border-gray-200"
#             },  # Row classes with bottom border
#             "th": {
#                 "class": "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
#             },  # Header cell classes
#             "td": {"class": "px-6 py-4 whitespace-nowrap"},  # Cell classes
#         }
