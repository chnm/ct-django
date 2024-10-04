from django.shortcuts import render

from exhibits.models import GeneralPage


def about(request):
    about_page = GeneralPage.objects.live().filter(title="About").first()
    return render(request, "exhibits/general_page.html", {"page": about_page})


def events(request):
    events_page = GeneralPage.objects.live().filter(title="Launch Event").first()
    return render(request, "exhibits/general_page.html", {"page": events_page})
