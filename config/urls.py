from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from wagtail import urls as wagtail_urls
from wagtail.admin import urls as wagtailadmin_urls
from wagtail.documents import urls as wagtaildocs_urls

from material.views import database, index, textile_records_single

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("cms/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
    path("pages/", include(wagtail_urls)),
    path("", index, name="index"),
    path("database/", database, name="database"),
    path(
        "database/<int:item_id>/", textile_records_single, name="textile_records_single"
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
