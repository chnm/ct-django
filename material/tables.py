import django_tables2 as tables
from django.utils.html import format_html
from django.utils.safestring import mark_safe

from material.models import TextileRecord


class TextileRecordTable(tables.Table):
    image = tables.Column(empty_values=(), verbose_name="Image")
    textile_type = tables.Column(empty_values=(), verbose_name="Textile type")
    textile_subtype = tables.Column(empty_values=(), verbose_name="Textile subtype")

    def render_summary_of_record(self, value):
        return format_html(
            '<details><summary>Summary</summary><div class="details-content"><p>{}</p></div></details>',
            value,
        )

    def render_transcription(self, value):
        return format_html(
            '<details><summary>Transcription</summary><div class="details-content"><p>{}</p></div></details>',
            value,
        )

    # def render_image(self, record):
    #     first_image = record.images.first()
    #     if first_image:
    #         return mark_safe(f'<img src="{first_image.image.url}" width="100" height="100" />')
    #     return 'No images attached'

    def render_image(self, record):
        images = list(record.images.all())
        if not images:
            return "No images attached"

        # Always display the first image
        html_output = mark_safe(
            f'<img src="{images[0].image.url}" width="100" height="100" />'
        )

        # If there are more images, add them in a details/summary format
        if len(images) > 1:
            for image in images[1:]:
                html_output += format_html(
                    '<details><summary>More Images</summary><div><img src="{}" width="100" height="100" /></div></details>',
                    image.image.url,
                )

        return html_output

    def render_textile_type(self, record):
        # Fetch all related textile_type names and join them with a comma
        names = [
            textile_type.name
            for textile_type in record.textile_types.all()
            if textile_type.name is not None
        ]
        return ", ".join(names)

    def render_textile_subtype(self, record):
        # Fetch all related textile_subtype names and join them with a comma
        names = [
            textile_subtype.name
            for textile_subtype in record.textile_types.all()
            if textile_subtype.name is not None
        ]
        return ", ".join(names)

    subject_type = tables.Column(empty_values=(), verbose_name="Primary subject")
    subject_subtype = tables.Column(empty_values=(), verbose_name="Secondary subject")

    def render_subject_type(self, record):
        # Fetch all related primary_subject names and join them with a comma
        names = [
            subject.name
            for subject in record.primary_subjects.all()
            if subject.name is not None
        ]
        return ", ".join(names)

    def render_subject_subtype(self, record):
        # Fetch all related secondary_subject names and join them with a comma
        names = [
            subject.name
            for subject in record.secondary_subjects.all()
            if subject.name is not None
        ]
        return ", ".join(names)

    class Meta:
        model = TextileRecord
        fields = [
            "image",
            "textile_type",
            "textile_subtype",
            "year",
            "source_type",
            "circulation",
            "from_area",
            "to_area",
            "keywords",
            "summary_of_record",
            "transcription",
        ]
        empty_text = "No records match your filter."
        attrs = {
            "class": "min-w-full divide-y divide-gray-200",  # Table classes
            "thead": {"class": "bg-gray-50"},  # Header row classes
            "tr": {
                "class": "bg-white border-b border-gray-200"
            },  # Row classes with bottom border
            "th": {
                "class": "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            },  # Header cell classes
            "td": {"class": "px-6 py-4 whitespace-nowrap"},  # Cell classes
        }
