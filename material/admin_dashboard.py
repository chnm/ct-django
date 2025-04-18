from datetime import timedelta
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib import admin
from django.db.models import Count
from django.shortcuts import render
from django.utils import timezone

from material.models import (
    TextileRecord,
    Image,
    PrimaryTextileType,
)
from crawler.models import StagedMuseumItem


def get_admin_stats(request=None):
    """
    Gather statistics for the dashboard.
    This function can be called by the admin index view or standalone.
    """
    # Get current time and time 7 days ago for recent stats
    now = timezone.now()
    seven_days_ago = now - timedelta(days=7)

    # Basic record counts
    textile_record_count = TextileRecord.objects.count()
    textile_recent_count = TextileRecord.objects.filter(
        created_at__gte=seven_days_ago
    ).count()
    public_record_count = TextileRecord.objects.filter(is_public=True).count()
    public_percentage = round(
        (public_record_count / textile_record_count * 100)
        if textile_record_count > 0
        else 0
    )

    # Crawler statistics
    staged_item_count = StagedMuseumItem.objects.count()
    pending_review_count = StagedMuseumItem.objects.filter(is_reviewed=False).count()

    # Image statistics
    image_count = Image.objects.count()
    public_image_count = Image.objects.filter(is_image_public=True).count()
    public_image_percentage = round(
        (public_image_count / image_count * 100) if image_count > 0 else 0
    )

    # Circulation distribution
    circulation_data = (
        TextileRecord.objects.values("circulation")
        .annotate(count=Count("id"))
        .order_by("-count")
    )

    # Clean up circulation data for display
    circulation_counts = []
    total_with_circulation = sum(
        item["count"] for item in circulation_data if item["circulation"]
    )

    for item in circulation_data:
        circ_type = item["circulation"]
        count = item["count"]
        if circ_type:
            readable_type = dict(TextileRecord.CIRCULATION_CHOICES).get(
                circ_type, circ_type
            )
            # Calculate percentage
            percentage = (
                (count / total_with_circulation * 100)
                if total_with_circulation > 0
                else 0
            )
            circulation_counts.append((readable_type, round(percentage, 1)))

    # Creator type distribution
    creator_data = (
        TextileRecord.objects.values("creator")
        .annotate(count=Count("id"))
        .order_by("-count")
    )

    creator_counts = []
    for item in creator_data:
        creator_type = item["creator"] or "Unknown"
        count = item["count"]
        percentage = (
            (count / textile_record_count * 100) if textile_record_count > 0 else 0
        )
        creator_counts.append((creator_type.capitalize(), count, round(percentage, 1)))

    # Geographic distribution - Top 5 from/to areas
    from_areas = list(
        TextileRecord.objects.filter(from_area__isnull=False)
        .values("from_area__name")
        .annotate(count=Count("id"))
        .order_by("-count")[:5]
    )
    from_areas = [(item["from_area__name"], item["count"]) for item in from_areas]

    to_areas = list(
        TextileRecord.objects.filter(to_area__isnull=False)
        .values("to_area__name")
        .annotate(count=Count("id"))
        .order_by("-count")[:5]
    )
    to_areas = [(item["to_area__name"], item["count"]) for item in to_areas]

    # Recent records
    recent_records = TextileRecord.objects.order_by("-updated_at")[:5]

    # Textile types distribution
    textile_types_data = (
        PrimaryTextileType.objects.annotate(record_count=Count("textile_records"))
        .filter(record_count__gt=0)
        .order_by("-record_count")[:5]
    )

    textile_types = []
    total_with_types = sum(type_obj.record_count for type_obj in textile_types_data)

    for type_obj in textile_types_data:
        percentage = (
            (type_obj.record_count / total_with_types * 100)
            if total_with_types > 0
            else 0
        )
        textile_types.append(
            (type_obj.name, type_obj.record_count, round(percentage, 1))
        )

    return {
        "title": "Connecting Threads Dashboard",
        "textile_record_count": textile_record_count,
        "textile_recent_count": textile_recent_count,
        "public_record_count": public_record_count,
        "public_percentage": public_percentage,
        "staged_item_count": staged_item_count,
        "pending_review_count": pending_review_count,
        "image_count": image_count,
        "public_image_count": public_image_count,
        "public_image_percentage": public_image_percentage,
        "circulation_counts": circulation_counts,
        "creator_counts": creator_counts,
        "from_areas": from_areas,
        "to_areas": to_areas,
        "recent_records": recent_records,
        "textile_types": textile_types,
    }


@staff_member_required
def admin_dashboard(request):
    """
    Custom admin dashboard that can be used as a standalone view.
    """
    context = get_admin_stats(request)
    # Add admin context
    context["app_list"] = admin.site.get_app_list(request)

    return render(request, "admin/index.html", context)
