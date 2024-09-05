from django.db import models
from taggit.managers import TaggableManager


class Area(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True, default="Unnamed Area")

    def __str__(self) -> str:
        if self.name is not None:
            return str(self.name)
        else:
            return "No area name provided"

    class Meta:
        # default sort by name
        ordering = ["name"]


class Place(models.Model):
    id = models.AutoField(primary_key=True)
    city = models.CharField(max_length=765, unique=True, default="Unnamed City")
    country = models.CharField(max_length=765, blank=True, null=True)
    area = models.ForeignKey(
        Area, on_delete=models.CASCADE, related_name="places", blank=True, null=True
    )
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)

    def __str__(self) -> str:
        if self.country is None:
            return str(self.city)
        elif self.city is None and self.country is None:
            return "No place name provided"
        else:
            return f"{self.city}, {self.country}"

    # Automatically derive the latitude/longitude from the available data.
    def save(self, *args, **kwargs):
        if self.city is not None and self.country is not None:
            from geopy.geocoders import Nominatim

            geolocator = Nominatim(user_agent="textiles")
            location = geolocator.geocode(f"{self.city}, {self.country}")
            if location is not None:
                self.latitude = location.latitude
                self.longitude = location.longitude
        elif self.country is not None:
            from geopy.geocoders import Nominatim

            geolocator = Nominatim(user_agent="textiles")
            location = geolocator.geocode(self.country)
            if location is not None:
                self.latitude = location.latitude
                self.longitude = location.longitude
        else:
            pass
        super(Place, self).save(*args, **kwargs)

    class Meta:
        unique_together = (
            "city",
            "area",
        )
        # default sort by name
        ordering = ["city"]


class Subject(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=350, unique=True, null=True, blank=True)

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
    primary_textile_types = models.ManyToManyField(
        "PrimaryTextileType", related_name="textile_records", blank=True, default=[]
    )
    secondary_textile_types = models.ManyToManyField(
        "SecondaryTextileType", related_name="textile_records", blank=True, default=[]
    )
    textile_specifications = models.CharField(blank=True, null=True, max_length=255)
    circulation = models.CharField(
        blank=True, null=True, choices=CIRCULATION_CHOICES, max_length=2
    )
    summary_of_record = models.TextField(blank=True, null=True)
    transcription = models.TextField(blank=True, null=True)
    keywords = TaggableManager(blank=True)
    price = models.TextField(blank=True, null=True)
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
    crosslinks = models.ManyToManyField("self", blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"Item ID {self.id}"

    class Meta:
        # default sort by year
        ordering = ["year"]


class PrimaryTextileType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(blank=True, null=True, max_length=255)
    description = models.TextField(blank=True, null=True, verbose_name="Notes")

    def __str__(self) -> str:
        return f"{self.name}"

    class Meta:
        ordering = ["name"]


class SecondaryTextileType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(blank=True, null=True, max_length=255)
    description = models.TextField(blank=True, null=True, verbose_name="Notes")

    def __str__(self) -> str:
        return f"{self.name}"

    class Meta:
        ordering = ["name"]


class NamedActor(models.Model):
    # This model tracks named actors associated with a TextileRecord.
    id = models.AutoField(primary_key=True)
    textile_record = models.ForeignKey(
        TextileRecord, on_delete=models.CASCADE, related_name="named_actors"
    )
    name = models.CharField(blank=True, null=True, max_length=500)

    def __str__(self) -> str:
        return f"{self.name}"


class PlacesAlias(models.Model):
    id = models.AutoField(primary_key=True)
    place = models.ForeignKey(
        Place, on_delete=models.CASCADE, related_name="place_aliases"
    )
    alias = models.CharField(max_length=765, unique=True)

    def __str__(self) -> str:
        return f"{self.alias} for {self.place}"


class TextileAlias(models.Model):
    id = models.AutoField(primary_key=True)
    textile_record_primary = models.ForeignKey(
        PrimaryTextileType,
        on_delete=models.CASCADE,
        related_name="primary_alias",
        default=None,
    )
    textile_record_secondary = models.ForeignKey(
        SecondaryTextileType,
        on_delete=models.CASCADE,
        related_name="secondary_alias",
        default=None,
    )
    alias = models.CharField(max_length=765, unique=True)

    def __str__(self) -> str:
        return f"{self.alias} for {self.textile_record}"

    class Meta:
        verbose_name_plural = "Textile Aliases"


class ArchivalRecord(models.Model):
    id = models.AutoField(primary_key=True)
    textile_record = models.ForeignKey(
        TextileRecord, on_delete=models.CASCADE, related_name="archival_records"
    )
    archival_reference = models.CharField(
        blank=True,
        null=True,
        max_length=765,
        help_text="The archival citation of a source.",
    )
    source_reference = models.CharField(
        max_length=765,
        blank=True,
        null=True,
        help_text="The bibliographic citation of a source.",
    )
    document = models.FileField(upload_to="media/records/")

    def __str__(self) -> str:
        return f"{self.archival_reference} for {self.textile_record}"


class Image(models.Model):
    id = models.AutoField(primary_key=True)
    textile_record = models.ForeignKey(
        TextileRecord, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="images/")
    description = models.CharField(blank=True, null=True, max_length=500)
    caption = models.CharField(blank=True, null=True, max_length=500)
    alt_text = models.CharField(blank=True, null=True, max_length=500)
    is_image_public = models.BooleanField(
        default=False, help_text="Can this image be publicly viewable?"
    )
    image_rights_documentation = models.FileField(
        upload_to="documentation/", blank=True, null=True
    )

    def __str__(self) -> str:
        return f"Image for {self.textile_record}"
