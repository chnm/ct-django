import logging

from django.http import JsonResponse
from django.shortcuts import render
from taggit.models import Tag

from catalog.models import Item
from exhibits.models import ExhibitHome, HomeAboutSnippet

logger = logging.getLogger(__name__)


def index(request):
    exhibits = ExhibitHome.objects.live().public().order_by("exhibit_display_order")
    # Get the first HomeAboutSnippet (or create a default one if none exists)
    try:
        about_snippet = HomeAboutSnippet.objects.first()
        if not about_snippet:
            # Create a default snippet if none exists
            about_snippet = HomeAboutSnippet.objects.create(
                title="Following a checked cloth across an ocean",
                subtitle="Fashioning Madras in India and the Caribbean",
                content="""
                <p>Connecting Threads is a collaborative digital history project dedicated to amplifying the contributions of Indian weavers and African Caribbean consumers to global histories of dress.</p>
                <p>Drawing on the work of an interdisciplinary team of researchers, the project has re-examined the history of the Madras handkerchief, an internationally popular dress accessory made of brightly coloured checked cotton.</p>
                <p>This exhibition explores the influence of Madras handkerchiefs on 18th and 19th century dress, from its origins in South India to Madras fashions in the Greater Caribbean and beyond.</p>
                """,
            )
    except Exception:
        # In case of any issues, provide a fallback snippet
        about_snippet = {
            "title": "Following a checked cloth across an ocean",
            "subtitle": "Fashioning Madras in India and the Caribbean",
            "content": """
            <p>Connecting Threads is a collaborative digital history project dedicated to amplifying the contributions of Indian weavers and African Caribbean consumers to global histories of dress.</p>
            <p>Drawing on the work of an interdisciplinary team of researchers, the project has re-examined the history of the Madras handkerchief, an internationally popular dress accessory made of brightly coloured checked cotton.</p>
            <p>This exhibition explores the influence of Madras handkerchiefs on 18th and 19th century dress, from its origins in South India to Madras fashions in the Greater Caribbean and beyond.</p>
            """,
        }

    return render(
        request,
        "index.html",
        {
            "exhibits": exhibits,
            "about_snippet": about_snippet,
            "record_count": Item.objects.public().count(),
        },
    )


def keyword_search(request):
    query = request.GET.get("q", "")
    if query:
        tags = Tag.objects.filter(name__icontains=query)
        results = [{"name": tag.name} for tag in tags]
    else:
        results = []
    return JsonResponse(results, safe=False)


def about_crawler(request):
    """Static page explaining how the web crawler works"""
    return render(request, "about_crawler.html")
