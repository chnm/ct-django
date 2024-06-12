from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from material.models import Area, Image, Place, Subject, TextileRecord
from material.resources import (
    AreaResource,
    ImageResource,
    PlaceResource,
    SubjectResource,
    TextileRecordResource,
)


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
        "summary_other",
        "associated_name",
        "quantitative_data",
    ]
    search_fields = ["year", "associated_textile", "summary_other", "associated_name"]
    list_filter = ["quantitative_data", "primary_subjects", "secondary_subjects"]


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    resource_class = ImageResource
    list_display = ["textile_record", "image", "description"]
