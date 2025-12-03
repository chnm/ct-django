from django.contrib import admin
from django.db import models as db_models
from django.utils.html import format_html

from import_export.admin import ImportExportModelAdmin
from unfold.admin import ModelAdmin
from unfold.admin import TabularInline
from unfold.decorators import display
from prose.widgets import RichTextEditor

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
    TextileType,
    TextileRecord,
)
from material.resources import (
    AreaResource,
    ImageResource,
    PlaceResource,
    SubjectResource,
    TextileRecordResource,
)


class NamedActorsInline(TabularInline):
    model = NamedActor
    extra = 0


class ImagesInline(TabularInline):
    model = Image
    extra = 0


class PlacesAliasInline(TabularInline):
    model = PlacesAlias
    extra = 0


class TextileAliasInline(TabularInline):
    model = TextileAlias
    extra = 0

class ArchivalRecordInline(TabularInline):
    model = ArchivalRecord
    extra = 0


@admin.register(Area)
class AreaAdmin(ModelAdmin):
    resource_class = AreaResource
    list_display = ["name"]


@admin.register(Place)
class PlaceAdmin(ModelAdmin):
    resource_class = PlaceResource
    list_display = ["id", "city", "country", "area", "latitude", "longitude"]
    inlines = [PlacesAliasInline]


@admin.register(Subject)
class SubjectAdmin(ModelAdmin):
    resource_class = SubjectResource
    list_display = ["name"]
    search_fields = ["name"]


@admin.register(PrimaryTextileType)
class PrimaryTextileTypeAdmin(ModelAdmin):
    list_display = [
        "name",
        "description",
    ]
    inlines = [TextileAliasInline]


@admin.register(SecondaryTextileType)
class SecondaryTextileTypeAdmin(ModelAdmin):
    list_display = [
        "name",
        "description",
    ]
    inlines = [TextileAliasInline]


@admin.action(description="Mark selected records as public")
def make_public(modeladmin, request, queryset):
    queryset.update(is_public=True)


@admin.action(description="Mark selected records as private")
def make_private(modeladmin, request, queryset):
    queryset.update(is_public=False)


@admin.action(description="Unpublish selected records from crawler")
def unpublish_from_crawler(modeladmin, request, queryset):
    """
    Unpublish records that came from the crawler
    Finds the associated StagedMuseumItem and marks it as unpublished
    """
    from django.contrib import messages

    from crawler.models import StagedMuseumItem

    unpublished_count = 0
    not_from_crawler = 0

    for record in queryset:
        # Find related staged items
        staged_items = StagedMuseumItem.objects.filter(published_to=record)

        if staged_items.exists():
            # This record came from the crawler
            for item in staged_items:
                item.unpublish()
                unpublished_count += 1

            # Delete the TextileRecord
            record.delete()
        else:
            # This record didn't come from the crawler
            not_from_crawler += 1

    if unpublished_count > 0:
        messages.success(
            request,
            f"Successfully unpublished {unpublished_count} records from crawler",
        )

    if not_from_crawler > 0:
        messages.warning(
            request,
            f"{not_from_crawler} records were not from the crawler and were not affected",
        )

@admin.register(TextileType)
class TextileTypeAdmin(ModelAdmin):
    list_display = [
        "name",
        "description",
    ]


@admin.register(TextileRecord)
class TextileRecordAdmin(ModelAdmin, ImportExportModelAdmin):
    resource_class = TextileRecordResource
    list_display = [
        "thumbnail_preview",
        "id_manual",
        "id",
        "year",
        "summary_of_record",
        "is_public",
        "creator",
    ]
    search_fields = ["id_manual", "transcription", "summary_of_record"]
    list_filter = [
        "year",
        "primary_subjects",
        "secondary_subjects",
        "textile_type",
        "source_type",
        "circulation",
        "from_area",
        "to_area",
        "is_public",
        "creator",  # Add filter for creator to easily find crawler items
    ]
    readonly_fields = ["id",]
    exclude = ["primary_textile_types", "secondary_textile_types"]
    filter_horizontal = ["crosslinks", "primary_subjects", "secondary_subjects", "textile_type"]
    inlines = [NamedActorsInline, ImagesInline, ArchivalRecordInline]
    ordering = ["year"]
    actions = [make_public, make_private, unpublish_from_crawler]  # Add the new action
    formfield_overrides = {
        db_models.TextField: {"widget": RichTextEditor},
    }

    @display(description="Thumbnail")
    def thumbnail_preview(self, obj):
        # Check for images related to this textile record
        first_image = obj.images.filter(is_image_public=True).first()
        if not first_image:
            # Fallback to any image (even if not public for admin view)
            first_image = obj.images.first()
        
        if first_image and first_image.image:
            return format_html(
                '<img src="{}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);" />',
                first_image.image.url
            )
        else:
            # Check if this record came from the crawler (has staged_source)
            staged_sources = obj.staged_source.all()
            if staged_sources.exists():
                staged_item = staged_sources.first()
                if staged_item.image:
                    return format_html(
                        '<img src="{}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);" />',
                        staged_item.image.url
                    )
                elif staged_item.thumbnail:
                    return format_html(
                        '<img src="{}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);" />',
                        staged_item.thumbnail
                    )
            
            return format_html(
                '<div style="width: 60px; height: 60px; background-color: #f3f4f6; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #9ca3af; font-size: 12px;">No Image</div>'
            )


@admin.register(Image)
class ImageAdmin(ModelAdmin):
    resource_class = ImageResource
    list_display = ["textile_record", "image", "description"]


@admin.register(NamedActor)
class NamedActorAdmin(ModelAdmin):
    list_display = ["name", "textile_record"]
    search_fields = ["name"]
    list_filter = ["textile_record"]
