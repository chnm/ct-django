from django.contrib import admin
from taggit.admin import TaggableManager

from .models import Area, Image, Place, TextileRecord


@admin.register(Area)
class AreaAdmin(admin.ModelAdmin):
    list_display = ["name"]


@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    list_display = ["city", "country", "area"]


@admin.register(TextileRecord)
class TextileRecordAdmin(admin.ModelAdmin):
    list_display = ["year", "associated_textile", "from_area", "to_area"]
    search_fields = ["primary_subjects__name", "secondary_subjects__name"]


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ["textile_record", "image", "description"]
