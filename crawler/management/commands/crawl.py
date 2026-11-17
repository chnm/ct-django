from django.core.management.base import BaseCommand, CommandError

from crawler.models import CrawlSource
from crawler.runs import start_run


class Command(BaseCommand):
    help = "Crawl sources by name (default: every enabled source) in the foreground."

    def add_arguments(self, parser):
        parser.add_argument("sources", nargs="*", help='Source names, e.g. "V&A API".')

    def handle(self, sources, **options):
        qs = (
            CrawlSource.objects.filter(name__in=sources)
            if sources
            else CrawlSource.objects.filter(enabled=True)
        )
        missing = set(sources) - set(qs.values_list("name", flat=True))
        if missing:
            raise CommandError(f"No source named: {', '.join(sorted(missing))}")
        for source in qs:
            run = start_run(source, started_by="manage.py crawl", background=False)
            self.stdout.write(
                f"{source}: {run.get_status_display()}, {run.created} created, "
                f"{run.refreshed} refreshed, {run.errors} errors {run.message}".rstrip()
            )
