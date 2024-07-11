import django_tables2 as tables

from material.models import TextileRecord


class TextileRecordTable(tables.Table):
    # textile_type = tables.Column(accessor=A('textile_type.name'), verbose_name="Textile Type")
    # textile_subtype = tables.Column(accessor=A('textile_subtype.name'), verbose_name="Textile Subtype")
    textile_type = tables.Column(empty_values=(), verbose_name="Textile type")
    textile_subtype = tables.Column(empty_values=(), verbose_name="Textile subtype")

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
            "textile_type",
            "textile_subtype",
            "year",
            "source_type",
            "circulation",
            "from_area",
            "to_area",
            "keywords",
        ]
        empty_text = "No records match your filter."
        attrs = {
            "class": "min-w-full divide-y divide-gray-200",  # Table classes
            "thead": {"class": "bg-gray-50"},  # Header row classes
            "tr": {"class": "bg-white"},  # Row classes
            "th": {
                "class": "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            },  # Header cell classes
            "td": {"class": "px-6 py-4 whitespace-nowrap"},  # Cell classes
        }
