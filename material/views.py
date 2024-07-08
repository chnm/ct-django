from django.core.paginator import Paginator
from django.shortcuts import render

from material.models import TextileRecord


def index(request):
    return render(request, "index.html")


def database(request):
    records = TextileRecord.objects.all()
    paginator = Paginator(records, 25)
    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)

    return render(request, "database.html", {"textile_records": page_obj})
