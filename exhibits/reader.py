"""Navigation and progress for the exhibit reader, derived from the page tree."""

from dataclasses import dataclass, field

from django.utils.html import strip_tags

WORDS_PER_MINUTE = 200


@dataclass
class Section:
    page: object
    number: int
    url: str
    title: str


@dataclass
class Reader:
    home: object
    chapter_number: int
    chapter_total: int
    sections: list[Section] = field(default_factory=list)
    total: int = 0
    reading_minutes: int = 1
    current: Section | None = None
    previous: Section | None = None
    next: Section | None = None
    progress: float = 0.0
    previous_chapter: object = None
    next_chapter: object = None

    @property
    def is_cover(self):
        return self.current is None


def reader_for(page):
    from exhibits.models import ExhibitHome, ExhibitPage

    if isinstance(page, ExhibitHome):
        home, current_page = page, None
    else:
        home, current_page = page.get_parent().specific, page

    section_pages = [
        p for p in home.get_children().live().specific() if isinstance(p, ExhibitPage)
    ]
    sections = [Section(p, i, p.url, p.title) for i, p in enumerate(section_pages, 1)]

    chapters = list(ExhibitHome.objects.live().order_by("exhibit_display_order", "path"))
    ids = [c.pk for c in chapters]
    idx = ids.index(home.pk) if home.pk in ids else 0
    words = sum(len(strip_tags(p.body or "").split()) for p in section_pages)

    reader = Reader(
        home=home,
        chapter_number=idx + 1,
        chapter_total=len(chapters),
        sections=sections,
        total=len(sections),
        reading_minutes=max(1, round(words / WORDS_PER_MINUTE)),
        previous_chapter=chapters[idx - 1] if idx > 0 else None,
        next_chapter=chapters[idx + 1] if idx + 1 < len(chapters) else None,
    )
    if current_page is None:
        reader.next = sections[0] if sections else None
        return reader

    position = next((i for i, s in enumerate(sections) if s.page.pk == current_page.pk), None)
    if position is None:  # unpublished or orphaned preview: behave like the cover
        reader.next = sections[0] if sections else None
        return reader
    reader.current = sections[position]
    reader.previous = sections[position - 1] if position > 0 else None
    reader.next = sections[position + 1] if position + 1 < len(sections) else None
    reader.progress = (position + 1) / len(sections)
    return reader
