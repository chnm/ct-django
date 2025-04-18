# crawler/admin.py
from django.contrib import admin, messages
from django.shortcuts import redirect
from django.urls import path
from django.utils.html import format_html

from .models import StagedMuseumItem
from .services import MuseumAPIClient


@admin.register(StagedMuseumItem)
class StagedMuseumItemAdmin(admin.ModelAdmin):
    list_display = [
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
    ]
    actions = ["mark_as_reviewed", "publish_to_textile_records"]
    change_list_template = "admin/crawler/stagedmuseumitem/change_list.html"

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

    def fetch_status(self, obj):
        return format_html(
            '<span style="color: {};">●</span> {}',
            "green" if obj.api_response else "red",
            "Fetched" if obj.api_response else "Not fetched",
        )

    fetch_status.short_description = "Fetch Status"

    def fetch_cooper_hewitt(self, request):
        try:
            client = MuseumAPIClient()
            created, updated = client.fetch_cooper_hewitt()
            messages.success(
                request,
                f"Successfully fetched Cooper-Hewitt data. Created: {created}, Updated: {updated}",
            )
        except Exception as e:
            messages.error(request, f"Error fetching from Cooper-Hewitt: {str(e)}")
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
            messages.error(request, f"Error fetching from V&A: {str(e)}")
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
            messages.error(request, f"Error fetching data: {str(e)}")
        return redirect("admin:crawler_stagedmuseumitem_changelist")

    def mark_as_reviewed(self, request, queryset):
        queryset.update(is_reviewed=True, reviewed_by=request.user)
        messages.success(request, f"{queryset.count()} items marked as reviewed")

    mark_as_reviewed.short_description = "Mark selected items as reviewed"

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
                errors.append(
                    f"Error publishing item {item.id} - {item.title}: {str(e)}"
                )

        if published_count:
            messages.success(
                request,
                f"Successfully published {published_count} items to TextileRecord",
            )

        if errors:
            messages.error(
                request, "Some items could not be published:\n" + "\n".join(errors)
            )

    publish_to_textile_records.short_description = (
        "Publish selected items to TextileRecord"
    )
