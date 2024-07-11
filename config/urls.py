from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from wagtail import urls as wagtail_urls
from wagtail.admin import urls as wagtailadmin_urls
from wagtail.documents import urls as wagtaildocs_urls

from material.views import database, index

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("cms/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
    path("pages/", include(wagtail_urls)),
    path("", index, name="index"),
    path("database/", database, name="database"),
    # path("textile-records/", textile_records_list, name="textile_records_list"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
