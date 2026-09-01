# crawler/admin.py
from django.contrib import admin, messages
from django.shortcuts import redirect
from django.urls import path
from django.utils.html import format_html
from import_export.admin import ImportExportModelAdmin
from reversion.admin import VersionAdmin
from unfold.admin import ModelAdmin
from unfold.decorators import display

from config.admin_utils import admin_thumbnail, admin_thumbnail_placeholder

from .models import StagedMuseumItem
from .resources import StagedMuseumItemResource
from .services import MuseumAPIClient


@admin.register(StagedMuseumItem)
class StagedMuseumItemAdmin(VersionAdmin, ModelAdmin, ImportExportModelAdmin):
    resource_class = StagedMuseumItemResource
    list_display = [
        "thumbnail_preview",
        "id",
        "title",
        "archive",
        "fetch_status",
        "is_reviewed",
        "published",
        "initial_date_fetched",
        "date_updated",
    ]
    list_filter = [
        "archive",
        "is_reviewed",
        "published",
    ]
    search_fields = ["title", "description", "id"]
    readonly_fields = [
        "initial_date_fetched",
        "date_updated",
        "api_response",
        "published",
        "published_to",
        "image",
    ]
    actions = ["mark_as_reviewed", "publish_to_textile_records"]
    change_list_template = "admin/crawler/stagedmuseumitem/change_list.html"

    fieldsets = (
        (
            "Basic Information",
            {
                "fields": ("id", "title", "description", "url", "image"),
            },
        ),
        (
            "Museum Data",
            {
                "fields": ("archive", "date", "item_type", "medium", "country"),
            },
        ),
        (
            "Review Process",
            {
                "fields": ("is_reviewed", "review_notes", "reviewed_by"),
            },
        ),
        (
            "Publishing",
            {
                "fields": ("published", "published_to"),
                "classes": ("collapse",),
            },
        ),
        (
            "Metadata",
            {
                "fields": ("initial_date_fetched", "date_updated"),
                "classes": ("collapse",),
            },
        ),
        (
            "API Response",
            {
                "fields": ("api_response",),
                "classes": ("collapse",),
            },
        ),
    )

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "fetch-cooper-hewitt/",
                self.admin_site.admin_view(self.fetch_cooper_hewitt),
                name="fetch-cooper-hewitt",
            ),
            path(
                "fetch-vam/",
                self.admin_site.admin_view(self.fetch_vam),
                name="fetch-vam",
            ),
            path(
                "fetch-all/",
                self.admin_site.admin_view(self.fetch_all),
                name="fetch-all",
            ),
        ]
        return custom_urls + urls

    @display(description="Fetch Status")
    def fetch_status(self, obj):
        return format_html(
            '<span style="color: {};">●</span> {}',
            "green" if obj.api_response else "red",
            "Fetched" if obj.api_response else "Not fetched",
        )

    @display(description="Thumbnail")
    def thumbnail_preview(self, obj):
        if obj.image:
            return admin_thumbnail(obj.image.url)
        elif obj.thumbnail:
            return admin_thumbnail(obj.thumbnail)
        else:
            return admin_thumbnail_placeholder()

    def fetch_cooper_hewitt(self, request):
        try:
            client = MuseumAPIClient()
            created, updated = client.fetch_cooper_hewitt()
            messages.success(
                request,
                f"Successfully fetched Cooper-Hewitt data. Created: {created}, Updated: {updated}",
            )
        except Exception as e:
            messages.error(request, f"Error fetching from Cooper-Hewitt: {e!s}")
        return redirect("admin:crawler_stagedmuseumitem_changelist")

    def fetch_vam(self, request):
        try:
            client = MuseumAPIClient()
            created, updated = client.fetch_vam()
            messages.success(
                request,
                f"Successfully fetched V&A data. Created: {created}, Updated: {updated}",
            )
        except Exception as e:
            messages.error(request, f"Error fetching from V&A: {e!s}")
        return redirect("admin:crawler_stagedmuseumitem_changelist")

    def fetch_all(self, request):
        try:
            client = MuseumAPIClient()
            ch_created, ch_updated = client.fetch_cooper_hewitt()
            va_created, va_updated = client.fetch_vam()
            messages.success(
                request,
                f"Successfully fetched all museum data.\n"
                f"Cooper-Hewitt - Created: {ch_created}, Updated: {ch_updated}\n"
                f"V&A - Created: {va_created}, Updated: {va_updated}",
            )
        except Exception as e:
            messages.error(request, f"Error fetching data: {e!s}")
        return redirect("admin:crawler_stagedmuseumitem_changelist")

    @admin.action(description="Mark selected items as reviewed")
    def mark_as_reviewed(self, request, queryset):
        queryset.update(is_reviewed=True, reviewed_by=request.user)
        messages.success(request, f"{queryset.count()} items marked as reviewed")

    @admin.action(description="Publish selected items to TextileRecord")
    def publish_to_textile_records(self, request, queryset):
        published_count = 0
        errors = []

        for item in queryset:
            if not item.is_reviewed:
                errors.append(
                    f"Item {item.id} - {item.title} must be reviewed before publishing"
                )
                continue

            if item.published:
                errors.append(f"Item {item.id} - {item.title} is already published")
                continue

            try:
                item.publish(request.user)
                published_count += 1
            except Exception as e:
                errors.append(f"Error publishing item {item.id} - {item.title}: {e!s}")

        if published_count:
            messages.success(
                request,
                f"Successfully published {published_count} items to TextileRecord",
            )

        if errors:
            messages.error(
                request, "Some items could not be published:\n" + "\n".join(errors)
            )
