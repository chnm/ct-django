from django.apps import AppConfig
from wagtail.images.apps import WagtailImagesAppConfig


class ExhibitsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "exhibits"


class CustomImagesAppConfig(WagtailImagesAppConfig):
    default_attrs = {"decoding": "async", "loading": "lazy"}
