from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from wagtail import urls as wagtail_urls
from wagtail.admin import urls as wagtailadmin_urls
from wagtail.documents import urls as wagtaildocs_urls

from exhibits.views import about, concepts, events, lessons
from material.views import (
    TextileTableView,
    get_secondary_textile_types,
    index,
    keyword_search,
    record_details,
    textile_records_single,
)

urlpatterns = [
    path("", index, name="index"),
    path("admin/", admin.site.urls),
    path("accounts/", include("allauth.urls")),
    # Wagtail URLs
    path("cms/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
    path("exhibits/", include(wagtail_urls)),
    path("about/", about, name="about"),
    path("concepts/", concepts, name="concepts"),
    path("events/", events, name="event"),
    path("lessons/", lessons, name="lessons"),
    # Site pages
    path("database/", TextileTableView.as_view(), name="database"),
    path(
        "database/<int:item_id>/", textile_records_single, name="textile_single"
    ),  # modal view
    path("api/keywords/", keyword_search, name="keyword_search"),
    path(
        "record-details/<int:record_id>/", record_details, name="record_details"
    ),  # page
    path(
        "get-secondary-textile-types/<int:primary_id>/",
        get_secondary_textile_types,
        name="get_secondary_textile_types",
    ),
    # Log in / log out controls
    path("logout/", index, name="logout"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
