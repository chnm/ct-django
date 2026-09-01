from django.http import HttpResponse


def health(request):
    """Return a lightweight liveness response for container health checks."""
    return HttpResponse("ok", content_type="text/plain")
