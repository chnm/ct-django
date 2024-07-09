from django.db import models
from taggit.managers import TaggableManager


class Area(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)

    def __str__(self) -> str:
        return str(self.name)


class Place(models.Model):
    id = models.AutoField(primary_key=True)
    city = models.CharField(max_length=765, blank=True, null=True, unique=True)
    country = models.CharField(max_length=765, blank=True, null=True, unique=True)
    area = models.ForeignKey(
        Area, on_delete=models.CASCADE, related_name="places", blank=True, null=True
    )

    def __str__(self) -> str:
        return f"{self.city}, {self.country}"

    class Meta:
        unique_together = (
            "city",
            "area",
        )


class Subject(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=350, unique=True)

    def __str__(self) -> str:
        return str(self.name)

    def natural_key(self):
        return self.name


class TextileRecord(models.Model):
    CIRCULATION_CHOICES = [
        ("td", "Trade & Distribution"),
        ("pr", "Production"),
        ("co", "Consumption"),
    ]

    id = models.AutoField(primary_key=True)
    year = models.IntegerField(blank=True, null=True)
    textile_specifications = models.CharField(blank=True, null=True)
    circulation = models.CharField(
        blank=True, null=True, choices=CIRCULATION_CHOICES, max_length=2
    )
    summary_of_record = models.TextField(blank=True, null=True)
    transcription = models.TextField(blank=True, null=True)
    keywords = TaggableManager(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    currency = models.CharField(max_length=765, blank=True, null=True)
    primary_subjects = models.ManyToManyField(
        Subject,
        related_name="primary_subject_records",
        blank=True,
    )
    secondary_subjects = models.ManyToManyField(
        Subject,
        related_name="secondary_subject_records",
        blank=True,
    )
    from_area = models.ForeignKey(
        Area,
        on_delete=models.CASCADE,
        related_name="from_textile_records",
        blank=True,
        null=True,
    )
    from_place = models.ForeignKey(
        Place,
        on_delete=models.CASCADE,
        related_name="from_textile_records",
        blank=True,
        null=True,
    )
    to_area = models.ForeignKey(
        Area,
        on_delete=models.CASCADE,
        related_name="to_textile_records",
        blank=True,
        null=True,
    )
    to_place = models.ForeignKey(
        Place,
        on_delete=models.CASCADE,
        related_name="to_textile_records",
        blank=True,
        null=True,
    )
    source_type = models.CharField(max_length=765, blank=True, null=True)
    description_of_source = models.TextField(blank=True, null=True)
    record_creator = models.CharField(max_length=765, blank=True, null=True)
    source_reference = models.CharField(blank=True, null=True, max_length=765)
    crosslinks = models.ManyToManyField(
        "self", related_name="crosslinked_records", blank=True
    )

    def __str__(self) -> str:
        return f"{self.year} - {self.associated_textile}"


class Textile(models.Model):
    # This model tracks the textiles that are associated with a TextileRecord. There can be multiple textiles associated with a single TextileRecord.
    id = models.AutoField(primary_key=True)
    textile_record = models.ForeignKey(
        TextileRecord, on_delete=models.CASCADE, related_name="textiles"
    )
    name = models.CharField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.name}"


class NamedActor(models.Model):
    # This model tracks named actors associated with a TextileRecord.
    id = models.AutoField(primary_key=True)
    textile_record = models.ForeignKey(
        TextileRecord, on_delete=models.CASCADE, related_name="named_actors"
    )
    name = models.CharField(blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.name}"


class Image(models.Model):
    id = models.AutoField(primary_key=True)
    textile_record = models.ForeignKey(
        TextileRecord, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="media/images/")
    description = models.TextField(blank=True, null=True)
    is_image_public = models.BooleanField(default=False)
    image_rights_documentation = models.FileField(
        upload_to="image_rights_documentation/", blank=True, null=True
    )

    def __str__(self) -> str:
        return f"Image for {self.textile_record}"
