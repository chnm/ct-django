import django_tables2 as tables

from material.models import TextileRecord


def _col(template, header, width=None, td_extra=""):
    attrs = {"td": {"class": f"px-4 py-3 align-middle {td_extra}".strip()}}
    if width:
        attrs["th"] = {"style": f"width:{width}"}
    return tables.TemplateColumn(
        template_name=template, verbose_name=header, orderable=False, attrs=attrs
    )


class TextileTable(tables.Table):
    preview = _col("database/cells/preview.html", "Preview", "74px")
    year = _col("database/cells/date.html", "Date", "96px")
    textile_type = _col("database/textile_type.html", "Textile type")
    textile_subtype = _col("database/textile_subtype.html", "Subtype")
    route = _col("database/cells/route.html", "Origin → Destination")
    circulation = _col("database/cells/circulation.html", "Circulation", "150px")
    actions = _col("database/cells/actions.html", "Actions", "78px", "text-right")

    class Meta:
        model = TextileRecord
        template_name = "database/textile_table.html"
        fields = (
            "preview",
            "year",
            "textile_type",
            "textile_subtype",
            "route",
            "circulation",
            "actions",
        )
        attrs = {
            "class": "w-full min-w-[900px] border-collapse font-display text-[13.5px] text-ink"
        }
        empty_text = "No results match the search criteria."
