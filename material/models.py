from django.db import models
from taggit.managers import TaggableManager


class Area(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self) -> str:
        return self.name


class Place(models.Model):
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    area = models.ForeignKey(Area, on_delete=models.CASCADE, related_name="places")

    def __str__(self) -> str:
        return f"{self.city}, {self.country}"


class TextileRecord(models.Model):
    TEXTILE_CHOICES = [
        ("Madras", "Madras"),
        ("Pulicat", "Pulicat"),
        ("Gingham", "Gingham"),
    ]

    year = models.IntegerField()
    associated_textile = models.CharField(max_length=50, choices=TEXTILE_CHOICES)
    terminology_specific_info = models.TextField()
    production_consumption_distribution = models.TextField()
    summary_other = models.TextField()
    summary_for_publication = models.TextField()
    transcription = models.TextField()
    quantitative_data = models.BooleanField()
    quantitative_excerpt = models.TextField(blank=True, null=True)
    currency = models.CharField(max_length=50)
    associated_name = models.CharField(max_length=100)
    primary_subjects = TaggableManager(through="material.TaggedTextileRecord")
    secondary_subjects = TaggableManager(related_name="secondary_subjects")
    from_area = models.ForeignKey(
        Area, on_delete=models.CASCADE, related_name="from_textile_records"
    )
    from_place = models.ForeignKey(
        Place, on_delete=models.CASCADE, related_name="from_textile_records"
    )
    to_area = models.ForeignKey(
        Area, on_delete=models.CASCADE, related_name="to_textile_records"
    )
    to_place = models.ForeignKey(
        Place, on_delete=models.CASCADE, related_name="to_textile_records"
    )
    source_type = models.CharField(max_length=100)
    description_of_source = models.TextField()
    producer_other = models.TextField()
    source_reference = models.CharField(max_length=100)

    def __str__(self) -> str:
        return f"{self.year} - {self.associated_textile}"


class Image(models.Model):
    textile_record = models.ForeignKey(
        TextileRecord, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="images/")
    description = models.TextField(blank=True, null=True)

    def __str__(self) -> str:
        return f"Image for {self.textile_record}"
