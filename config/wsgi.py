"""
WSGI config for config project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""

import os
import threading

from django.core.wsgi import get_wsgi_application

# Gunicorn's gthread workers run requests in pool threads. The image's musl
# libc gives threads a 128 KiB stack, which a full admin upload through boto3
# overflows (SIGSEGV, no traceback). Match glibc's 8 MiB default before any
# are started.
threading.stack_size(8 * 1024 * 1024)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

application = get_wsgi_application()
