"""Numbers for the admin dashboard (templates/admin/index.html)."""

from collections import Counter
from datetime import timedelta

from django.db.models import Count
from django.utils import timezone
from reversion.models import Version

from catalog.models import Item, ItemPlace, ItemTerm, Media

INGEST_LABELS = {
    "manual_entry": "Manual entry",
    "crawler_vam_api": "V&A crawler",
    "crawler_cooper_hewitt_api": "Cooper Hewitt crawler",
}


def _pct(n, total):
    return round(n / total * 100, 1) if total else 0


def _top(qs, field, n=5):
    return [(row[field], row["count"]) for row in
            qs.values(field).annotate(count=Count("item_id", distinct=True)).order_by("-count")[:n]]  # fmt: skip


def get_admin_stats(request=None):
    active = Item.objects.exclude(record_status="merged")
    total = active.count()
    public = Item.objects.public().count()

    week_ago = timezone.now() - timedelta(days=7)
    versions = Version.objects.get_for_model(Item).select_related("revision")
    edited_this_week = (
        versions.filter(revision__date_created__gte=week_ago)
        .values("object_id")
        .distinct()
        .count()
    )
    recent = {}
    for v in versions.order_by("-revision__date_created")[:200]:
        recent.setdefault(v.object_id, v.revision.date_created)
        if len(recent) == 5:
            break
    recent_records = []
    for item in Item.objects.filter(pk__in=recent):
        item.edited_at = recent[item.pk]
        recent_records.append(item)
    recent_records.sort(key=lambda i: i.edited_at, reverse=True)

    images = Media.objects.filter(media_type="image")
    image_count = images.count()
    public_images = images.filter(item__in=Item.objects.public()).count()

    stages = _top(
        ItemTerm.objects.filter(role="circulation_stage", item__in=active),
        "term__label",
    )
    staged_total = sum(n for _, n in stages)
    by_ingest = Counter(active.values_list("ingest_method", flat=True))
    cloths = _top(
        ItemTerm.objects.filter(role="textile_type", item__in=active), "term__label"
    )
    cloth_total = sum(n for _, n in cloths)
    by_holder = Counter(active.values_list("holding_institution", flat=True))

    return {
        "title": "Connecting Threads Dashboard",
        "textile_record_count": total,
        "textile_recent_count": edited_this_week,
        "public_record_count": public,
        "public_percentage": round(_pct(public, total)),
        "staged_item_count": active.filter(record_status="staged").count(),
        "pending_review_count": active.filter(
            record_status="staged", review_status="unreviewed"
        ).count(),
        "image_count": image_count,
        "public_image_count": public_images,
        "public_image_percentage": round(_pct(public_images, image_count)),
        "circulation_counts": [(label, _pct(n, staged_total)) for label, n in stages],
        "creator_counts": [(INGEST_LABELS.get(k, k or "Not recorded"), n, _pct(n, total))
                           for k, n in by_ingest.most_common()],  # fmt: skip
        "from_areas": _top(
            ItemPlace.objects.filter(role="origin", item__in=active),
            "place__macro_region",
        ),
        "to_areas": _top(
            ItemPlace.objects.filter(role="destination", item__in=active),
            "place__macro_region",
        ),
        "recent_records": recent_records,
        "textile_types": [(label, n, _pct(n, cloth_total)) for label, n in cloths],
        "source_counts": [
            (k or "Not recorded", n, _pct(n, total))
            for k, n in by_holder.most_common(8)
        ],
    }
