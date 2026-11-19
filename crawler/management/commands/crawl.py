from django.core.management.base import BaseCommand

from crawler.services import MuseumAPIClient


class Command(BaseCommand):
    help = "Fetch Connecting Threads objects from museum APIs and stage them in the catalog."

    def add_arguments(self, parser):
        parser.add_argument(
            "sources", nargs="*", choices=["vam", "cooper_hewitt"], default=["vam"]
        )

    def handle(self, sources, **options):
        client = MuseumAPIClient()
        for source in sources:
            created, updated = getattr(client, f"fetch_{source}")()
            self.stdout.write(f"{source}: {created} created, {updated} refreshed")
