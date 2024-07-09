from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from material.models import (
    Area,
    Image,
    NamedActor,
    Place,
    Subject,
    TextileRecord,
    TextileSubtype,
    TextileType,
)
from material.resources import (
    AreaResource,
    ImageResource,
    PlaceResource,
    SubjectResource,
    TextileRecordResource,
)


class TextileInline(admin.TabularInline):
    model = TextileType


class TextileSubtypeInline(admin.TabularInline):
    model = TextileSubtype


class NamedActorsInline(admin.TabularInline):
    model = NamedActor


class ImagesInline(admin.TabularInline):
    model = Image


@admin.register(Area)
class AreaAdmin(admin.ModelAdmin):
    resource_class = AreaResource
    list_display = ["name"]


@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    resource_class = PlaceResource
    list_display = ["city", "country", "area"]


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    resource_class = SubjectResource
    list_display = ["name"]
    search_fields = ["name"]


@admin.register(TextileRecord)
class TextileRecordAdmin(ImportExportModelAdmin):
    resource_class = TextileRecordResource
    list_display = [
        "id",
        "year",
    ]
    search_fields = ["transcription", "summary_of_record"]
    list_filter = ["year", "primary_subjects", "secondary_subjects"]
    inlines = [TextileInline, TextileSubtypeInline, NamedActorsInline, ImagesInline]


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    resource_class = ImageResource
    list_display = ["textile_record", "image", "description"]
