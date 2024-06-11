from import_export import fields, resources
from import_export.widgets import ForeignKeyWidget, ManyToManyWidget

from material.models import Area, Image, Place, Subject, TextileRecord


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


class TextileRecordResource(resources.ModelResource):
    # Define fields to map spreadsheet columns
    year = fields.Field(attribute="year", column_name="year")
    associated_textile = fields.Field(
        attribute="associated_textile", column_name="associated_textile"
    )
    terminology_specific_info = fields.Field(
        attribute="terminology_specific_info", column_name="terminology_specific_info"
    )
    production_consumption_distribution = fields.Field(
        attribute="production_consumption_distribution",
        column_name="production_consumption_distribution",
    )
    summary_other = fields.Field(attribute="summary_other", column_name="summary_other")
    summary_for_publication = fields.Field(
        attribute="summary_for_publication", column_name="summary_for_publication"
    )
    transcription = fields.Field(attribute="transcription", column_name="transcription")
    quantitative_data = fields.Field(
        attribute="quantitative_data", column_name="quantitative_data"
    )
    quantitative_excerpt = fields.Field(
        attribute="quantitative_excerpt", column_name="quantitative_excerpt"
    )
    currency = fields.Field(attribute="currency", column_name="currency")
    associated_name = fields.Field(
        attribute="associated_name", column_name="associated_name"
    )
    subject_primary = fields.Field(
        attribute="primary_subjects",
        column_name="subject_primary",
        widget=ManyToManyWidget(Subject, "name"),
    )
    subject_secondary = fields.Field(
        attribute="secondary_subjects",
        column_name="subject_secondary",
        widget=ManyToManyWidget(Subject, "name"),
    )
    from_place = fields.Field(
        attribute="from_place",
        column_name="from_place",
        widget=ForeignKeyWidget(Place, "city"),
    )
    to_place = fields.Field(
        attribute="to_place",
        column_name="to_place",
        widget=ForeignKeyWidget(Place, "city"),
    )
    source_type = fields.Field(attribute="source_type", column_name="source_type")
    description_of_source = fields.Field(
        attribute="description_of_source", column_name="description_of_source"
    )
    producer_other = fields.Field(
        attribute="producer_other", column_name="producer_other"
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
            "associated_textile",
            "terminology_specific_info",
            "production_consumption_distribution",
            "summary_other",
            "summary_for_publication",
            "transcription",
            "quantitative_data",
            "quantitative_excerpt",
            "currency",
            "associated_name",
            "subject_primary",
            "subject_secondary",
            "from_place",
            "to_place",
            "source_type",
            "description_of_source",
            "producer_other",
            "source_reference",
        )

    def before_import_row(self, row, **kwargs):
        from_area_name = row.get("from_area").strip() if row.get("from_area") else None
        to_area_name = row.get("to_area").strip() if row.get("to_area") else None
        from_place_name = (
            row.get("from_place").strip() if row.get("from_place") else None
        )
        to_place_name = row.get("to_place").strip() if row.get("to_place") else None

        from_area = (
            Area.objects.get_or_create(name=from_area_name)[0]
            if from_area_name
            else None
        )
        to_area = (
            Area.objects.get_or_create(name=to_area_name)[0] if to_area_name else None
        )

        if from_area and from_place_name:
            Place.objects.get_or_create(
                city=from_place_name, defaults={"area": from_area}
            )

        if to_area and to_place_name:
            Place.objects.get_or_create(city=to_place_name, defaults={"area": to_area})

        # convert quantitative_data to BOOL
        if row.get("quantitative_data"):
            row["quantitative_data"] = (
                True if row["quantitative_data"].lower() == "y" else False
            )

        # Now we want to create the ManyToMany data from the subject_primary and subject_secondary
        # columns. We will create these and insert them into the Subject model.
        # We will then update the row with the ManyToMany data.
        primary_subjects = []
        secondary_subjects = []

        if row.get("subject_primary"):
            primary_subject = row["subject_primary"].strip()
            primary_subject = Subject.objects.get_or_create(name=primary_subject)[0]
            row["subject_primary"] = [primary_subject]

        if row.get("subject_secondary"):
            secondary_subject = row["subject_secondary"].strip()
            secondary_subject = Subject.objects.get_or_create(name=secondary_subject)[0]
            row["subject_secondary"] = [secondary_subject]

        row["subject_primary"] = primary_subjects
        row["subject_secondary"] = secondary_subjects

        return super().before_import_row(row, **kwargs)


class ImageResource(resources.ModelResource):
    class Meta:
        model = Image
        import_id_fields = ("id",)
        fields = ("id", "textile_record", "image", "description")
