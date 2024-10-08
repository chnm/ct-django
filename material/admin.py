from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from material.models import (
    ArchivalRecord,
    Area,
    Image,
    NamedActor,
    Place,
    PlacesAlias,
    PrimaryTextileType,
    SecondaryTextileType,
    Subject,
    TextileAlias,
    TextileRecord,
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


@admin.register(PrimaryTextileType)
class PrimaryTextileTypeAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "description",
    ]
    inlines = [TextileAliasInline]


@admin.register(SecondaryTextileType)
class SecondaryTextileTypeAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "description",
    ]
    inlines = [TextileAliasInline]


def make_public(modeladmin, request, queryset):
    queryset.update(is_public=True)


make_public.short_description = "Mark selected records as public"


def make_private(modeladmin, request, queryset):
    queryset.update(is_public=False)


make_private.short_description = "Mark selected records as private"


@admin.register(TextileRecord)
class TextileRecordAdmin(ImportExportModelAdmin):
    resource_class = TextileRecordResource
    list_display = [
        "id",
        "year",
        "summary_of_record",
        "is_public",
    ]
    search_fields = ["transcription", "summary_of_record"]
    list_filter = [
        "year",
        "primary_subjects",
        "secondary_subjects",
        "primary_textile_types",
        "secondary_textile_types",
        "source_type",
        "circulation",
        "from_area",
        "to_area",
        "is_public",
    ]
    inlines = [NamedActorsInline, ImagesInline, ArchivalRecordInline]
    ordering = ["year"]
    actions = [make_public, make_private]  # Register custom actions


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    resource_class = ImageResource
    list_display = ["textile_record", "image", "description"]
