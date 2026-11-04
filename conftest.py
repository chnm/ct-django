import pytest


@pytest.fixture(autouse=True)
def plain_static_storage(settings):
    """Tests render templates with {% static %}; the production
    CompressedManifestStaticFilesStorage needs a collectstatic manifest and
    hashes filenames, so use Django's plain storage for every test."""
    settings.STORAGES = {
        **settings.STORAGES,
        "staticfiles": {
            "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"
        },
    }


@pytest.fixture(autouse=True)
def tmp_media_root(settings, tmp_path):
    settings.MEDIA_ROOT = str(tmp_path / "media")
