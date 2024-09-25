from django.shortcuts import render

from exhibits.models import ExhibitHome, GeneralPage


def about(request):
    about_page = GeneralPage.objects.live().filter(title="About").first()
    return render(request, "exhibits/general_page.html", {"page": about_page})


def concepts(request):
    concepts_page = GeneralPage.objects.live().filter(title="Concepts").first()
    return render(request, "exhibits/general_page.html", {"page": concepts_page})


def events(request):
    events_page = GeneralPage.objects.live().filter(title="Launch Event").first()
    return render(request, "exhibits/general_page.html", {"page": events_page})


def lessons(request):
    lessons_page = GeneralPage.objects.live().filter(title="Lesson Plans").first()
    return render(request, "exhibits/general_page.html", {"page": lessons_page})


# def exhibit_one_third_left(request):
#     exhibit_page = ExhibitPageImageOneThirdLeft.objects.live().first()
#     return render(request, "exhibits/exhibit_page_image_one_third_left.html", {"page": exhibit_page})
