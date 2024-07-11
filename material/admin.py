from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from material.models import (
    ArchivalRecord,
    Area,
    Image,
    NamedActor,
    Place,
    PlacesAlias,
    Subject,
    TextileAlias,
    TextileRecord,
    TextileType,
)
from material.resources import (
    AreaResource,
    ImageResource,
    PlaceResource,
    SubjectResource,
    TextileRecordResource,
)


class NamedActorsInline(admin.TabularInline):
    model = NamedActor


class ImagesInline(admin.TabularInline):
    model = Image


class PlacesAliasInline(admin.TabularInline):
    model = PlacesAlias


class TextileAliasInline(admin.TabularInline):
    model = TextileAlias


class ArchivalRecordInline(admin.TabularInline):
    model = ArchivalRecord


@admin.register(Area)
class AreaAdmin(admin.ModelAdmin):
    resource_class = AreaResource
    list_display = ["name"]


@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    resource_class = PlaceResource
    list_display = ["id", "city", "country", "area", "latitude", "longitude"]
    inlines = [PlacesAliasInline]


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    resource_class = SubjectResource
    list_display = ["name"]
    search_fields = ["name"]


@admin.register(TextileType)
class TextileTypeAdmin(admin.ModelAdmin):
    list_display = ["name", "description"]
    inlines = [TextileAliasInline]


@admin.register(TextileRecord)
class TextileRecordAdmin(ImportExportModelAdmin):
    resource_class = TextileRecordResource
    list_display = [
        "id",
        "year",
        "price",
        "currency",
        "record_creator",
        "source_reference",
    ]
    search_fields = ["transcription", "summary_of_record"]
    list_filter = ["year", "primary_subjects", "secondary_subjects"]
    inlines = [NamedActorsInline, ImagesInline, ArchivalRecordInline]
    ordering = ["year"]


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    resource_class = ImageResource
    list_display = ["textile_record", "image", "description"]
