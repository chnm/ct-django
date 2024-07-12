from django.core.paginator import EmptyPage, Paginator
from django.http import JsonResponse
from django.shortcuts import render
from django_filters.views import FilterView
from django_tables2 import RequestConfig
from taggit.models import Tag

from material.filters import TextileRecordFilter
from material.models import TextileRecord
from material.tables import TextileRecordTable


def index(request):
    return render(request, "index.html")


def database(request):
    queryset = TextileRecord.objects.all()
    filter = TextileRecordFilter(request.GET, queryset=queryset)
    table = TextileRecordTable(filter.qs)
    RequestConfig(request, paginate={"per_page": 25}).configure(table)
    return render(
        request,
        "database/textile_records_list.html",
        {"filter": filter, "table": table},
    )
