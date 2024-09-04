import logging

from django.core.exceptions import ObjectDoesNotExist
from django.db.utils import IntegrityError
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
    raise_errors = False
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
        try:
            textile_instance = self.get_or_create_textile_record(row)
            self.process_textile_types(row, textile_instance)
            self.process_subjects(row, textile_instance)
            self.process_locations(row, textile_instance)
            self.process_keywords(row, textile_instance)

            textile_instance.save()

            logger.info(
                f"Successfully processed row for TextileRecord id: {textile_instance.id}"
            )
        except Exception as e:
            logger.error(f"Error processing row: {row}")
            logger.error(f"Error details: {str(e)}")
            raise

        return super().before_import_row(row, **kwargs)

    def get_or_create_textile_record(self, row):
        defaults = {
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
        }
        instance, created = TextileRecord.objects.get_or_create(
            id=row.get("id"), defaults=defaults
        )
        return instance

    def process_textile_types(self, row, textile_instance):
        for field in ["textile_type", "textile_subtype"]:
            value = self.safe_get_strip(row, field)
            if value:
                type_instance, _ = TextileType.objects.get_or_create(name=value)
                textile_instance.textile_types.add(type_instance)

    def process_subjects(self, row, textile_instance):
        for field, related_field in [
            ("subject_primary", "primary_subjects"),
            ("subject_secondary", "secondary_subjects"),
        ]:
            value = self.safe_get_strip(row, field)
            if value:
                subject_instance, _ = Subject.objects.get_or_create(name=value)
                getattr(textile_instance, related_field).add(subject_instance)

    def process_locations(self, row, textile_instance):
        for field, model_field, location_type in [
            ("originating_location_place", "from_place", Place),
            ("destination_location_place", "to_place", Place),
            ("originating_location_area", "from_area", Area),
            ("destination_location_area", "to_area", Area),
        ]:
            value = self.safe_get_strip(row, field)
            if value:
                location_field = "city" if location_type == Place else "name"
                try:
                    # Try case-insensitive match
                    location_instance = location_type.objects.filter(
                        **{location_field + "__iexact": value}
                    ).first()

                    if not location_instance:
                        location_instance = location_type.objects.create(
                            **{location_field: value}
                        )
                        logger.warning(
                            f"{location_type.__name__} with {location_field}='{value}' did not exist. Created new instance."
                        )
                    else:
                        logger.info(
                            f"Found existing {location_type.__name__} with {location_field}='{value}'"
                        )
                except IntegrityError as e:
                    logger.error(
                        f"Failed to create {location_type.__name__} with {location_field}='{value}'. {str(e)}"
                    )
                    continue
                except Exception as e:
                    logger.error(
                        f"Unexpected error when processing {location_type.__name__} with {location_field}='{value}': {str(e)}"
                    )
                    continue

                setattr(textile_instance, model_field, location_instance)
            else:
                logger.info(f"No value provided for {field}. Skipping.")

    def process_keywords(self, row, textile_instance):
        keywords = self.safe_get_strip(row, "keywords")
        if keywords:
            for keyword in keywords.split(";"):
                textile_instance.keywords.add(keyword.strip())

    @staticmethod
    def safe_get_strip(row, key):
        value = row.get(key)
        return value.strip() if value else None


class ImageResource(resources.ModelResource):
    class Meta:
        model = Image
        import_id_fields = ("id",)
        fields = ("id", "textile_record", "image", "description")
