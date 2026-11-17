"""Start, run and preview crawls of a CrawlSource.

The admin's Run button calls start_run(), which records a CrawlRun and does the
work in a background thread so the page returns at once; `manage.py crawl` runs
the same thing in the foreground. Each object is staged as it arrives, so an
interrupted run loses nothing: running it again picks up where it stopped.
"""

import logging
import threading
from datetime import timedelta
from itertools import islice

from django.db import connection
from django.utils import timezone

from .adapters import ADAPTERS, Skipped
from .models import CrawlRun
from .services import MuseumAPIClient
from .staging import stage

logger = logging.getLogger(__name__)

STALE = timedelta(
    minutes=15
)  # a running crawl that stops reporting is treated as interrupted
SAVE_EVERY = 5  # objects between progress saves


class AlreadyRunning(Exception):
    pass


def active_run(source):
    """The source's run in progress, marking it interrupted if it stopped reporting."""
    run = source.runs.filter(status="running").first()
    if run and timezone.now() - run.updated_at > STALE:
        run.status, run.finished_at = "interrupted", timezone.now()
        run.message = (
            "Stopped reporting (probably a server restart). Run again to continue."
        )
        run.save()
        return None
    return run


def start_run(source, started_by="", background=True):
    # shortcut: two clicks in the same instant could both pass this check; add a
    # select_for_update on the source if that ever happens.
    if active_run(source):
        raise AlreadyRunning(f"{source} is already running.")
    run = CrawlRun.objects.create(source=source, started_by=started_by)
    if background:
        threading.Thread(target=_run_in_thread, args=(run.pk,), daemon=True).start()
    else:
        execute_run(run)
    return run


def _run_in_thread(run_pk):
    try:
        execute_run(CrawlRun.objects.select_related("source").get(pk=run_pk))
    finally:
        connection.close()  # the thread's own database connection


def execute_run(run, client=None):
    client = client or MuseumAPIClient()
    adapter = ADAPTERS[run.source.kind]
    try:
        for n, fetched in enumerate(adapter(run.source, client), 1):
            if isinstance(fetched, Skipped):
                run.errors += 1
                run.message = f"Skipped a record: {fetched.reason}"
                continue
            try:
                _, created = stage(fetched, download=client.download_image)
                run.created += created
                run.refreshed += not created
            except Exception as e:  # one bad record shouldn't stop the crawl
                run.errors += 1
                run.message = f"Last error ({fetched.identifier}): {e}"
                logger.exception(
                    "Could not stage %s %s", run.source, fetched.identifier
                )
            if n % SAVE_EVERY == 0:
                run.save()  # progress, and the heartbeat active_run() looks at
        run.status = "finished"
    except Exception as e:
        run.status = "failed"
        run.message = f"{e.__class__.__name__}: {e}"
        logger.exception("Crawl of %s failed", run.source)
    run.finished_at = timezone.now()
    run.save()
    return run


def preview(source, count=3):
    """The first few records as the crawler would stage them, without saving anything."""
    return list(islice(ADAPTERS[source.kind](source, MuseumAPIClient()), count))
