from django.shortcuts import get_object_or_404, render
from django_filters.views import FilterView
from django_tables2 import SingleTableMixin

from material.filters import TextileFilter
from material.models import TextileRecord
from material.tables import TextileTable


def index(request):
    return render(request, "index.html")


def textile_records_single(request, item_id):
    item = get_object_or_404(TextileRecord, pk=item_id)
    return render(request, "database/textile_records_single.html", {"item": item})


class TextileTableView(SingleTableMixin, FilterView):
    paginate_by = 5
    table_class = TextileTable
    filterset_class = TextileFilter
    # queryset = TextileRecord.objects.all()

    def get_template_names(self):
        if self.request.htmx:
            template_name = "database/single_table.html"
        else:
            template_name = "database/textiles.html"
        return template_name
