from import_export import fields, resources

from .models import StagedMuseumItem


class StagedMuseumItemResource(resources.ModelResource):
    """
    Export resource for StagedMuseumItem with comprehensive field mappings
    and human-readable column names
    """

    # Basic Information
    id = fields.Field(attribute="id", column_name="Museum Item ID")
    title = fields.Field(attribute="title", column_name="Title")
    description = fields.Field(attribute="description", column_name="Description")
    date = fields.Field(attribute="date", column_name="Date/Year")
    archive = fields.Field(attribute="archive", column_name="Source Museum")

    # Item Details
    item_type = fields.Field(attribute="item_type", column_name="Object Type")
    medium = fields.Field(attribute="medium", column_name="Medium/Material")
    country = fields.Field(attribute="country", column_name="Country/Region")

    # URLs and Images
    url = fields.Field(attribute="url", column_name="Museum Collection URL")
    manifest = fields.Field(attribute="manifest", column_name="IIIF Manifest URL")
    thumbnail = fields.Field(attribute="thumbnail", column_name="Thumbnail URL")
    downloaded_image_url = fields.Field(column_name="Downloaded Image URL")

    # Review Process
    is_reviewed = fields.Field(attribute="is_reviewed", column_name="Reviewed")
    review_notes = fields.Field(attribute="review_notes", column_name="Review Notes")
    reviewed_by = fields.Field(
        attribute="reviewed_by__username", column_name="Reviewed By"
    )

    # Publishing Status
    published = fields.Field(attribute="published", column_name="Published")
    published_to_id = fields.Field(
        attribute="published_to__id", column_name="Published To Record ID"
    )

    # Timestamps
    initial_date_fetched = fields.Field(
        attribute="initial_date_fetched", column_name="Date Fetched"
    )
    date_updated = fields.Field(attribute="date_updated", column_name="Date Updated")

    # API Data Summary
    api_data_summary = fields.Field(column_name="API Data Summary")

    class Meta:
        model = StagedMuseumItem
        fields = (
            "id",
            "title",
            "description",
            "date",
            "archive",
            "item_type",
            "medium",
            "country",
            "url",
            "manifest",
            "thumbnail",
            "downloaded_image_url",
            "is_reviewed",
            "review_notes",
            "reviewed_by",
            "published",
            "published_to_id",
            "initial_date_fetched",
            "date_updated",
            "api_data_summary",
        )
        export_order = (
            "id",
            "title",
            "archive",
            "date",
            "item_type",
            "medium",
            "country",
            "description",
            "url",
            "downloaded_image_url",
            "thumbnail",
            "manifest",
            "is_reviewed",
            "reviewed_by",
            "review_notes",
            "published",
            "published_to_id",
            "initial_date_fetched",
            "date_updated",
            "api_data_summary",
        )

    def dehydrate_downloaded_image_url(self, obj):
        """Return the URL of the downloaded image file if it exists"""
        if obj.image:
            return obj.image.url
        return ""

    def dehydrate_api_data_summary(self, obj):
        """Create a readable summary of key API response data"""
        if not obj.api_response:
            return ""

        try:
            # Extract key fields from API response for summary
            api_data = obj.api_response if isinstance(obj.api_response, dict) else {}

            summary_parts = []

            # Cooper-Hewitt specific fields
            if "accession_number" in api_data:
                summary_parts.append(f"Accession: {api_data['accession_number']}")
            if "creditline" in api_data:
                summary_parts.append(f"Credit: {api_data.get('creditline', '')}")
            if "dimensions" in api_data:
                summary_parts.append(f"Dimensions: {api_data['dimensions']}")

            # V&A specific fields
            if "systemNumber" in api_data:
                summary_parts.append(f"System Number: {api_data['systemNumber']}")
            if "_primaryMaker" in api_data:
                summary_parts.append(f"Maker: {api_data['_primaryMaker']}")
            if "_primaryPlace" in api_data:
                summary_parts.append(f"Place: {api_data['_primaryPlace']}")

            # Common fields
            if api_data.get("participants"):
                participants = api_data["participants"]
                if participants:
                    participant_names = []
                    for participant in participants:
                        if (
                            isinstance(participant, dict)
                            and "person_name" in participant
                        ):
                            participant_names.append(participant["person_name"])
                    if participant_names:
                        summary_parts.append(
                            f"Participants: {'; '.join(participant_names)}"
                        )

            return " | ".join(summary_parts)

        except (TypeError, KeyError, AttributeError):
            return "API data available (complex structure)"
