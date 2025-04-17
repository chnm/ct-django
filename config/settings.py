import os
from pathlib import Path
from django.utils.translation import gettext_lazy as _
from django.urls import reverse_lazy

import environ
from dotenv import load_dotenv

load_dotenv()


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

env = environ.FileAwareEnv(DEBUG=(bool, False))

# Update this existing value
DEBUG = env("DEBUG")

# Update this existing value
SECRET_KEY = env(
    "DJANGO_SECRET_KEY",
    default="django-insecure meayau2fu^q2$7e4e&s41gsc12umxc2jopbaq^@$0xjd0twpb2",
)

ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS", default=["localhost"])
CSRF_TRUSTED_ORIGINS = env.list(
    "DJANGO_CSRF_TRUSTED_ORIGINS", default=["http://localhost"]
)

COOPER_HEWITT_API_KEY = env("THREADBARE_KEY", default="")

# Application definition

INSTALLED_APPS = [
    "unfold",
    "unfold.contrib.filters",
    "unfold.contrib.forms",
    "unfold.contrib.inlines",
    "unfold.contrib.import_export",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "storages",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "django_htmx",
    "wagtail.contrib.forms",
    "wagtail.contrib.redirects",
    "wagtail.embeds",
    "wagtail.sites",
    "wagtail.users",
    "wagtail.snippets",
    "wagtail.documents",
    "wagtail.images",
    "wagtail.search",
    "wagtail.admin",
    "wagtail",
    "modelcluster",
    "import_export",
    "taggit",
    "tailwind",
    "fontawesomefree",
    "django_tables2",
    "django_filters",
    # local apps
    "theme",
    "material",
    "exhibits",
    "crawler",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "wagtail.contrib.redirects.middleware.RedirectMiddleware",
    "allauth.account.middleware.AccountMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django_htmx.middleware.HtmxMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            "templates",
            "exhibits/templates",
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "django.template.context_processors.request",
            ],
        },
    },
]

AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",  # this is the default backend
    "allauth.account.auth_backends.AuthenticationBackend",
)

# Django Unfold configuration
X_FRAME_OPTIONS = "SAMEORIGIN"
SILENCED_SYSTEM_CHECKS = ["security.W019"]

# Unfold customization options
UNFOLD = {
    "SITE_TITLE": "Connecting Threads Admin",
    "SITE_HEADER": "Connecting Threads",
    "SITE_URL": "/",
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": False,
        "navigation": [
            {
                "title": _("Dashboard"),
                "items": [
                    {
                        "title": _("Dashboard"),
                        "icon": "dashboard",
                        "link": reverse_lazy("admin:index"),
                    },
                ],
            },
            {
                "title": _("Collection Data"),
                "items": [
                    {
                        "title": _("Textile Records"),
                        "icon": "inventory_2",
                        "link": reverse_lazy("admin:material_textilerecord_changelist"),
                    },
                    {
                        "title": _("Primary Textile Types"),
                        "icon": "category",
                        "link": reverse_lazy(
                            "admin:material_primarytextiletype_changelist"
                        ),
                    },
                    {
                        "title": _("Secondary Textile Types"),
                        "icon": "style",
                        "link": reverse_lazy(
                            "admin:material_secondarytextiletype_changelist"
                        ),
                    },
                    {
                        "title": _("Images"),
                        "icon": "image",
                        "link": reverse_lazy("admin:material_image_changelist"),
                    },
                ],
            },
            {
                "title": _("Geographic Data"),
                "items": [
                    {
                        "title": _("Areas"),
                        "icon": "public",
                        "link": reverse_lazy("admin:material_area_changelist"),
                    },
                    {
                        "title": _("Places"),
                        "icon": "location_on",
                        "link": reverse_lazy("admin:material_place_changelist"),
                    },
                ],
            },
            {
                "title": _("Metadata"),
                "items": [
                    {
                        "title": _("Subjects"),
                        "icon": "bookmarks",
                        "link": reverse_lazy("admin:material_subject_changelist"),
                    },
                    {
                        "title": _("Named Actors"),
                        "icon": "people_alt",
                        "link": reverse_lazy("admin:material_namedactor_changelist"),
                    },
                ],
            },
            {
                "title": _("Web Crawler"),
                "collapsible": True,
                "items": [
                    {
                        "title": _("Staged Museum Items"),
                        "icon": "sync",
                        "link": reverse_lazy(
                            "admin:crawler_stagedmuseumitem_changelist"
                        ),
                    },
                ],
            },
            {
                "title": _("Wagtail CMS"),
                "collapsible": True,
                "items": [
                    {
                        "title": _("CMS Dashboard"),
                        "icon": "edit",
                        "link": "/cms/",
                    },
                ],
            },
            {
                "title": _("System"),
                "collapsible": True,
                "collapsed": True,
                "items": [
                    {
                        "title": _("Users"),
                        "icon": "person",
                        "link": reverse_lazy("admin:auth_user_changelist"),
                    },
                    {
                        "title": _("Groups"),
                        "icon": "group",
                        "link": reverse_lazy("admin:auth_group_changelist"),
                    },
                    {
                        "title": _("Django Models"),
                        "icon": "apps",
                        "link": "#",
                        "children": [
                            {
                                "title": _("Authentication"),
                                "link": reverse_lazy("admin:app_list", args=("auth",)),
                            },
                        ],
                    },
                ],
            },
        ],
    },
}

# ALLAUTH configuration
ACCOUNT_AUTHENTICATION_METHOD = "username"  # or 'email', or 'username_email'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = "mandatory"  # or 'optional', 'none'
ACCOUNT_LOGOUT_REDIRECT_URL = "/"  # URL to redirect to after logging out
LOGIN_REDIRECT_URL = "/"  # URL to redirect to after logging in

# settings.py

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
        "file": {
            "class": "logging.FileHandler",
            "filename": "debug.log",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "crawler": {
            "handlers": ["console", "file"],
            "level": "INFO",
            "propagate": True,
        },
    },
}

WSGI_APPLICATION = "config.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "HOST": env("DB_HOST", default="localhost"),
        "PORT": env("DB_PORT", default="5432"),
        "NAME": env("DB_NAME", default="connthreads"),
        "USER": env("DB_USER", default="connthreads"),
        "PASSWORD": env("DB_PASS", default="password"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "America/New_York"

USE_I18N = True

USE_TZ = True

TAILWIND_APP_NAME = "theme"
INTERNAL_IPS = [
    "127.0.0.1",
]


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = "static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_DIRS = (os.path.join(BASE_DIR, "static"),)

# Media files
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
    },
}
OBJ_STORAGE = env("OBJ_STORAGE", default=False)
if OBJ_STORAGE:
    AWS_ACCESS_KEY_ID = env("OBJ_STORAGE_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = env("OBJ_STORAGE_SECRET_ACCESS_KEY")
    AWS_STORAGE_BUCKET_NAME = env("OBJ_STORAGE_BUCKET_NAME")
    AWS_S3_ENDPOINT_URL = env("OBJ_STORAGE_ENDPOINT_URL")

    MEDIA_URL = f"{AWS_S3_ENDPOINT_URL}/{AWS_STORAGE_BUCKET_NAME}/"

    # override default storage backend for media
    STORAGES["default"] = {
        "BACKEND": "storages.backends.s3.S3Storage",
    }
else:
    MEDIA_URL = "media/"
    MEDIA_ROOT = os.path.join(BASE_DIR, "mediafiles")


# Wagtail
WAGTAIL_SITE_NAME = "Connecting Threads"
WAGTAIL_BASE_URL = "http://localhost:8000"
WAGTAILADMIN_BASE_URL = "http://localhost:8000"
WAGTAILEMBEDS_RESPONSIVE_HTML = True
WAGTAILIMAGES_MAX_UPLOAD_SIZE = 20 * 1024 * 1024  # 20mb

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {process:d} {thread:d} {message}",
            "style": "{",
        },
        "simple": {
            "format": "{levelname} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        "file": {
            "level": "DEBUG",
            "class": "logging.handlers.RotatingFileHandler",
            "filename": "debug.log",
            "maxBytes": 1024 * 1024 * 5,  # 5 MB
            "backupCount": 5,
            "formatter": "verbose",
        },
    },
    "loggers": {
        "django": {
            "handlers": ["console", "file"],
            "level": "INFO",
            "propagate": True,
        },
        "django.request": {
            "handlers": ["console", "file"],
            "level": "ERROR",
            "propagate": False,
        },
        "material": {
            "handlers": ["console", "file"],
            "level": "DEBUG",
            "propagate": True,
        },
    },
}


# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
