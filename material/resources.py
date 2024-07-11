import logging

from import_export import fields, resources
from import_export.widgets import ForeignKeyWidget, ManyToManyWidget, Widget
from taggit.models import Tag

from material.models import Area, Image, Place, Subject, TextileRecord, TextileType

logger = logging.getLogger(__name__)


class AreaResource(resources.ModelResource):
    class Meta:
        model = Area
        import_id_fields = ("id",)
        fields = ("id", "name")


class PlaceResource(resources.ModelResource):
    class Meta:
        model = Place
        import_id_fields = ("id",)
        fields = ("id", "city", "country", "area")


class SubjectResource(resources.ModelResource):
    class Meta:
        model = Subject
        import_id_fields = ("id",)
        fields = ("id", "name")


class ChoicesWidget(Widget):
    def __init__(self, choices, *args, **kwargs):
        self.choices = dict(choices)
        self.reversed_choices = {v: k for k, v in self.choices.items()}
        super().__init__(*args, **kwargs)

    def clean(self, value, row=None, *args, **kwargs):
        """Convert from the choice's display value to the actual value."""
        return self.reversed_choices.get(value, value)

    def render(self, value, obj=None):
        """Convert from the actual value to the choice's display value."""
        return self.choices.get(value, value)


class TaggitWidget(Widget):
    def clean(self, value, row=None, *args, **kwargs):
        """Convert a comma-separated string of tags into a list of Tag instances."""
        if not value:
            return None
        # Split the string by comma and strip whitespace
        tag_names = [name.strip() for name in value.split(",")]
        # Create or get tag instances
        tags = [Tag.objects.get_or_create(name=name)[0] for name in tag_names]
        return tags

    def render(self, value, obj=None):
        """Convert a list of Tag instances into a comma-separated string."""
        if not value:
            return ""
        # Check if value is a QuerySet and call .all() if it is, otherwise work with it directly
        if hasattr(value, "all"):
            value = value.all()
        # Join the tag names with a comma
        return ", ".join([tag.name for tag in value])


class TextileRecordResource(resources.ModelResource):
    # Define fields to map spreadsheet columns
    year = fields.Field(attribute="year", column_name="year")
    textile_specifications = fields.Field(
        attribute="textile_specifications", column_name="textile_specifications"
    )
    circulation = fields.Field(
        attribute="circulation",
        column_name="circulation",
        widget=ChoicesWidget(TextileRecord.CIRCULATION_CHOICES),
    )
    summary_of_record = fields.Field(
        attribute="summary_of_record", column_name="summary_of_record"
    )
    transcription = fields.Field(attribute="transcription", column_name="excerpt")
    keywords = fields.Field(
        attribute="keywords", column_name="keywords", widget=TaggitWidget()
    )
    price = fields.Field(attribute="price", column_name="price")
    currency = fields.Field(attribute="currency", column_name="currency")
    textile_type = fields.Field(
        attribute="textile_type",
        column_name="textile_type",
        widget=ForeignKeyWidget(TextileType, "name"),
    )
    textile_subtype = fields.Field(
        attribute="textile_subtype",
        column_name="textile_subtype",
        widget=ForeignKeyWidget(TextileType, "name"),
    )
    subject_primary = fields.Field(
        attribute="primary_subjects",
        column_name="subject_primary",
        widget=ManyToManyWidget(Subject, field="name", separator=","),
    )
    subject_secondary = fields.Field(
        attribute="secondary_subjects",
        column_name="subject_secondary",
        widget=ManyToManyWidget(Subject, field="name", separator=","),
    )
    from_place = fields.Field(
        attribute="from_place",
        column_name="originating_location_place",
        widget=ForeignKeyWidget(Place, "city"),
    )
    to_place = fields.Field(
        attribute="to_place",
        column_name="destination_location_place",
        widget=ForeignKeyWidget(Place, "city"),
    )
    from_area = fields.Field(
        attribute="from_area",
        column_name="originating_location_area",
        widget=ForeignKeyWidget(Area, "name"),
    )
    to_area = fields.Field(
        attribute="to_area",
        column_name="destination_location_area",
        widget=ForeignKeyWidget(Area, "name"),
    )
    source_type = fields.Field(attribute="source_type", column_name="source_type")
    description_of_source = fields.Field(
        attribute="description_of_source", column_name="description_of_source"
    )
    record_creator = fields.Field(
        attribute="record_creator", column_name="record_creator"
    )
    source_reference = fields.Field(
        attribute="source_reference", column_name="source_reference"
    )

    class Meta:
        model = TextileRecord
        import_id_fields = ("id",)
        fields = (
            "id",
            "year",
            "textile_specifications",
            "circulation",
            "summary_of_record",
            "transcription",
            "keywords",
            "price",
            "currency",
            "textile_type",
            "textile_subtype",
            "subject_primary",
            "subject_secondary",
            "originating_location_place",
            "destination_location_place",
            "originating_location_area",
            "destination_location_area",
            "source_type",
            "description_of_source",
            "record_creator",
            "source_reference",
        )

    def before_import_row(self, row, **kwargs):
        # Now we handle the data in the columns textile_type and textile_subtype.
        # Each of these are assigned to the model TextileType. We will create these
        # if they do not exist and update the row with the correct data.
        textile_type = (
            row.get("textile_type").strip() if row.get("textile_type") else None
        )
        textile_subtype = (
            row.get("textile_subtype").strip() if row.get("textile_subtype") else None
        )

        textile_instance, created = TextileRecord.objects.get_or_create(
            id=row.get("id"),
            defaults={
                "year": row.get("year"),
                "textile_specifications": row.get("textile_specifications"),
                "circulation": row.get("circulation"),
                "summary_of_record": row.get("summary_of_record"),
                "transcription": row.get("transcription"),
                "price": row.get("price"),
                "currency": row.get("currency"),
                "source_type": row.get("source_type"),
                "description_of_source": row.get("description_of_source"),
                "record_creator": row.get("record_creator"),
                "source_reference": row.get("source_reference"),
            },
        )
        textile_type_instance, created = TextileType.objects.get_or_create(
            name=textile_type,
        )
        if textile_type_instance is not None:
            textile_instance.textile_types.add(textile_type_instance)

        textile_subtype_instance, created = TextileRecord.objects.get_or_create(
            id=row.get("id"),
            defaults={
                "year": row.get("year"),
                "textile_specifications": row.get("textile_specifications"),
                "circulation": row.get("circulation"),
                "summary_of_record": row.get("summary_of_record"),
                "transcription": row.get("transcription"),
                "price": row.get("price"),
                "currency": row.get("currency"),
                "source_type": row.get("source_type"),
                "description_of_source": row.get("description_of_source"),
                "record_creator": row.get("record_creator"),
                "source_reference": row.get("source_reference"),
            },
        )
        textile_subtype_instance, created = TextileType.objects.get_or_create(
            name=textile_subtype,
        )
        if textile_subtype_instance is not None:
            textile_instance.textile_types.add(textile_subtype_instance)

        # Handle the ManyToMany primary_subjects and secondary_subjects fields
        # from the row data.
        primary_subjects = (
            row.get("subject_primary").strip() if row.get("subject_primary") else None
        )
        secondary_subjects = (
            row.get("subject_secondary").strip()
            if row.get("subject_secondary")
            else None
        )

        primary_subjects_instance, created = Subject.objects.get_or_create(
            name=primary_subjects,
        )
        if primary_subjects_instance is not None:
            textile_instance.primary_subjects.add(primary_subjects_instance)

        secondary_subjects_instance, created = Subject.objects.get_or_create(
            name=secondary_subjects,
        )
        if secondary_subjects_instance is not None:
            textile_instance.secondary_subjects.add(secondary_subjects_instance)

        # Handle the ForeignKey fields from_place and to_place
        from_place = (
            row.get("originating_location_place").strip()
            if row.get("originating_location_place")
            else None
        )
        to_place = (
            row.get("destination_location_place").strip()
            if row.get("destination_location_place")
            else None
        )

        from_place_instance, created = Place.objects.get_or_create(
            city=from_place,
        )
        if from_place_instance is not None:
            textile_instance.from_place = from_place_instance

        to_place_instance, created = Place.objects.get_or_create(
            city=to_place,
        )
        if to_place_instance is not None:
            textile_instance.to_place = to_place_instance

        # Handle the ForeignKey fields from_area and to_area
        from_area = (
            row.get("originating_location_area").strip()
            if row.get("originating_location_area")
            else None
        )
        to_area = (
            row.get("destination_location_area").strip()
            if row.get("destination_location_area")
            else None
        )

        from_area_instance, created = Area.objects.get_or_create(
            name=from_area,
        )
        if from_area_instance is not None:
            textile_instance.from_area = from_area_instance

        to_area_instance, created = Area.objects.get_or_create(
            name=to_area,
        )
        if to_area_instance is not None:
            textile_instance.to_area = to_area_instance

        return super().before_import_row(row, **kwargs)


class ImageResource(resources.ModelResource):
    class Meta:
        model = Image
        import_id_fields = ("id",)
        fields = ("id", "textile_record", "image", "description")
