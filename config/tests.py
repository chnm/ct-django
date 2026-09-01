from pathlib import Path
from tempfile import TemporaryDirectory

from django.conf import settings
from django.http import HttpResponseNotFound
from django.test import SimpleTestCase
from django.test import RequestFactory, override_settings
from django.urls import reverse
from whitenoise.middleware import WhiteNoiseMiddleware


class HealthCheckTest(SimpleTestCase):
    def test_health_check(self):
        response = self.client.get(reverse("health"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b"ok")


class ProductionStaticFilesTests(SimpleTestCase):
    def test_whitenoise_follows_security_middleware(self):
        security_middleware = "django.middleware.security.SecurityMiddleware"
        whitenoise_middleware = "whitenoise.middleware.WhiteNoiseMiddleware"
        security_index = settings.MIDDLEWARE.index(security_middleware)

        self.assertEqual(settings.MIDDLEWARE[security_index + 1], whitenoise_middleware)

    def test_whitenoise_serves_collected_static_file_with_debug_disabled(self):
        with TemporaryDirectory() as static_root:
            stylesheet = Path(static_root) / "css" / "test.css"
            stylesheet.parent.mkdir(parents=True)
            stylesheet.write_text("body { color: black; }", encoding="utf-8")

            with override_settings(DEBUG=False, STATIC_ROOT=static_root):
                middleware = WhiteNoiseMiddleware(
                    lambda request: HttpResponseNotFound()
                )
                request = RequestFactory().get("/static/css/test.css")
                response = middleware(request)

                try:
                    content = b"".join(response.streaming_content)
                finally:
                    response.close()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(content, b"body { color: black; }")
