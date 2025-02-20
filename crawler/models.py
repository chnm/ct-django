from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import JSONField


class StagedMuseumItem(models.Model):
    """
    Staging area for raw API data before cleanup and publishing
    """

    id = models.CharField(max_length=100, primary_key=True)
    title = models.CharField(max_length=500)
    date = models.CharField(blank=True, null=True, max_length=100)
    description = models.TextField(null=True, blank=True)
    item_type = models.CharField(blank=True, null=True, max_length=100)
    medium = models.CharField(blank=True, null=True, max_length=100)
    url = models.URLField()
    country = models.CharField(blank=True, null=True, max_length=100)
    archive = models.CharField(blank=True, null=True, max_length=100)
    api_response = JSONField()

    # Staging-specific fields
    is_reviewed = models.BooleanField(default=False)
    review_notes = models.TextField(blank=True)
    reviewed_by = models.ForeignKey(
        "auth.User",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="reviewed_items",
    )
    initial_date_fetched = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    published = models.BooleanField(default=False)
    published_to = models.ForeignKey(
        "material.TextileRecord",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="staged_source",
    )

    class Meta:
        db_table = "connthreads_staged_items"
        permissions = [
            ("can_review_items", "Can review staged items"),
            ("can_publish_items", "Can publish items to production"),
        ]

    def clean_data(self):
        """
        Implement data cleaning logic here
        Returns a dictionary of cleaned data ready for the production model
        """
        cleaned_data = {
            "title": self.title.strip(),
            "date": self.clean_date(),
            "description": self.clean_description(),
        }
        return cleaned_data

    def clean_date(self):
        """Temporary, if needed: date cleaning method"""
        return self.date

    def clean_description(self):
        """Temporary, if needed: description cleaning method"""
        if self.description:
            return self.description.strip()
        return ""

    def publish(self, user):
        """
        Publish this item to the production database
        """
        if not self.is_reviewed:
            raise ValidationError("Item must be reviewed before publishing")

        cleaned_data = self.clean_data()

        # Create or update the production item
        production_item, created = TextileRecord.objects.update_or_create(
            record_creator=self.archive,
            defaults=cleaned_data,
        )

        self.published = True
        self.published_to = production_item
        self.save()

        return production_item

    def __str__(self):
        return self.title
