from django.contrib import admin, messages
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone
from django.utils.html import format_html
from unfold.admin import ModelAdmin
from unfold.decorators import action, display

from .models import CrawlRun, CrawlSource
from .runs import AlreadyRunning, active_run, preview, start_run

STATUS_COLOURS = {"running": "#9a7328", "finished": "#3a6b52", "failed": "#9c3a2e",
                  "interrupted": "#9c3a2e"}  # fmt: skip


def status_badge(run):
    if run is None:
        return "Never run"
    when = timezone.localtime(run.started_at).strftime("%Y-%m-%d %H:%M")
    return format_html('<span style="color:{}">●</span> {} · {}',
                       STATUS_COLOURS.get(run.status, "#888"), run.get_status_display(), when)  # fmt: skip


def start(request, source):
    """Start a crawl from the admin and say what happened."""
    if not source.enabled:
        messages.warning(request, f"{source} is switched off; enable it first.")
        return
    try:
        start_run(source, started_by=request.user.get_username())
    except AlreadyRunning as e:
        messages.warning(request, str(e))
    else:
        messages.success(
            request,
            f"Started crawling {source}. New items appear under Crawled items as they "
            "arrive; this page shows the run's progress.",
        )


@admin.register(CrawlSource)
class CrawlSourceAdmin(ModelAdmin):
    list_display = ["name", "kind", "holding_institution", "enabled", "last_run"]
    list_filter = ["kind", "enabled"]
    search_fields = ["name", "holding_institution"]
    actions_row = ["run_crawl", "preview_crawl"]
    actions_detail = ["run_crawl", "preview_crawl"]
    fieldsets = [
        (None, {"fields": ["name", "kind", "enabled", "holding_institution", "short_name",
                           "rights_statement"]}),
        ("Where to fetch", {"fields": ["url", "params", "api_key_setting", "api_key_param"]}),
        ("Field mapping (Other JSON API only)", {"fields": ["mapping"]}),
    ]  # fmt: skip

    @display(description="Last run")
    def last_run(self, obj):
        return status_badge(obj.runs.first())

    @action(description="Run crawl", url_path="run", icon="play_arrow")
    def run_crawl(self, request, object_id):
        start(request, get_object_or_404(CrawlSource, pk=object_id))
        return redirect("admin:crawler_crawlrun_changelist")

    @action(description="Preview", url_path="preview", icon="visibility")
    def preview_crawl(self, request, object_id):
        source = get_object_or_404(CrawlSource, pk=object_id)
        try:
            records, error = preview(source), None
        except Exception as e:  # show the editor what the API said, don't 500
            records, error = [], f"{e.__class__.__name__}: {e}"
        return render(request, "admin/crawler/crawlsource/preview.html", {
            **self.admin_site.each_context(request),
            "opts": self.model._meta, "title": f"Preview: {source}", "source": source,
            "records": records, "error": error, "running": active_run(source),
        })  # fmt: skip


@admin.register(CrawlRun)
class CrawlRunAdmin(ModelAdmin):
    list_display = ["source", "status_badge", "started_at", "finished_at", "created",
                    "refreshed", "errors", "started_by"]  # fmt: skip
    list_filter = ["source", "status"]
    readonly_fields = [f.name for f in CrawlRun._meta.fields]

    @display(description="Status")
    def status_badge(self, obj):
        return status_badge(obj)

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False
