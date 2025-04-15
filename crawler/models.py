from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import JSONField
from django.db.models.signals import post_delete
from django.dispatch import receiver

from material.models import TextileRecord


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
        Creates a new TextileRecord and moves data from staging to production
        """
        if not self.is_reviewed:
            raise ValidationError("Item must be reviewed before publishing")

        if self.published and self.published_to:
            # Already published, return existing item
            return self.published_to

        # Prepare data for TextileRecord creation
        record_data = {
            # Required fields
            "is_public": True,  # Make it public by default once approved
            "creator": "crawler",  # Set creator to crawler
            # Map fields from StagedMuseumItem to TextileRecord where possible
            "archive": self.archive,
            "year": self.date,
            "source_reference": self.url,
            "description_of_source": self.description,
            "source_type": self.item_type if self.item_type else "Museum Collection",
            "summary_of_record": self.title,  # Use title as summary
            "record_creator": user.username if user else None,
        }

        # Create a new TextileRecord with the data
        textile_record = TextileRecord.objects.create(**record_data)

        # Link the staged item to the new record
        self.published = True
        self.published_to = textile_record
        self.save()

        return textile_record

    def __str__(self):
        return self.title

    def unpublish(self):
        """
        Mark the item as unpublished
        """
        self.published = False
        self.published_to = None
        self.save()


@receiver(post_delete, sender=TextileRecord)
def handle_textile_record_deletion(sender, instance, **kwargs):
    """
    When a TextileRecord is deleted, find any associated StagedMuseumItem and mark it as unpublished
    """
    # Try to find StagedMuseumItem instances that were linked to this TextileRecord
    staged_items = StagedMuseumItem.objects.filter(published_to=instance)
    for item in staged_items:
        item.unpublish()
