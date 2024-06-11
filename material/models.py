from django.db import models


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
    TEXTILE_CHOICES = [
        ("Madras", "Madras"),
        ("Pulicat", "Pulicat"),
        ("Gingham", "Gingham"),
    ]

    id = models.AutoField(primary_key=True)
    year = models.IntegerField(blank=True, null=True)
    associated_textile = models.CharField(
        blank=True, null=True, max_length=50, choices=TEXTILE_CHOICES
    )
    terminology_specific_info = models.TextField(blank=True, null=True)
    production_consumption_distribution = models.TextField(blank=True, null=True)
    summary_other = models.TextField(blank=True, null=True)
    summary_for_publication = models.TextField(blank=True, null=True)
    transcription = models.TextField(blank=True, null=True)
    quantitative_data = models.BooleanField(blank=True, null=True)
    quantitative_excerpt = models.TextField(blank=True, null=True)
    currency = models.CharField(blank=True, null=True, max_length=50)
    associated_name = models.CharField(blank=True, null=True, max_length=765)
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
    producer_other = models.TextField(blank=True, null=True)
    source_reference = models.CharField(blank=True, null=True, max_length=765)

    def __str__(self) -> str:
        return f"{self.year} - {self.associated_textile}"


class Image(models.Model):
    id = models.AutoField(primary_key=True)
    textile_record = models.ForeignKey(
        TextileRecord, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="images/")
    description = models.TextField(blank=True, null=True)

    def __str__(self) -> str:
        return f"Image for {self.textile_record}"
