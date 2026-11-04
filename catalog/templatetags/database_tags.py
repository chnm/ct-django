"""Display helpers for catalog records on the public database pages.

The list and record views prefetch itemterm_set (with term), itemplace_set
(with place) and media_set, so these read from the prefetch cache.
"""

from django import template
from django.utils.html import format_html, format_html_join
from django.utils.safestring import mark_safe

from catalog.filters import SOURCE_TYPES
from catalog.timeline import PHASE_BY_LABEL, is_approximate, phase_for

register = template.Library()

_DOT = "inline-block h-[9px] w-[9px] rounded-full align-middle mr-1.5"


@register.simple_tag
def terms(item, role):
    return [link.term for link in item.itemterm_set.all() if link.role == role]


@register.simple_tag
def places(item, *roles):
    links = [link for link in item.itemplace_set.all() if link.role in roles]
    return sorted(links, key=lambda link: link.sequence)


@register.filter
def source_type(item):
    """Readable evidence level ('Primary source'); empty when unspecified."""
    return dict(SOURCE_TYPES).get(item.evidence_level, "")


@register.simple_tag
def area_only(item):
    """True when the record's route is known only to areas (no specific origin or destination place)."""
    route = places(item, "origin", "destination")
    return bool(route) and all(link.precision == "area" for link in route)


def phase_codes(item):
    return [PHASE_BY_LABEL.get(t.label) for t in terms(item, "circulation_stage")]


@register.simple_tag
def phase(item):
    return phase_for((phase_codes(item) or [None])[0])


@register.filter(name="date_display")
def date_display(item):
    """Stated single years render plain; anything else gets the dotted-gold
    approximate treatment; no date renders an em dash."""
    if not item.date_display:
        return mark_safe('<span class="font-mono text-faint">&mdash;</span>')
    if not is_approximate(item):
        return format_html('<span class="font-mono">{}</span>', item.date_display)
    return format_html(
        '<span class="font-mono text-madras-gold border-b border-dotted border-[#c9a24a]">{}</span>',
        item.date_display,
    )


@register.simple_tag
def precision_dot(link, item):
    """Filled dot for a specific place, dashed ring for an area. Colored by the record's phase."""
    color = phase(item).text_class.replace("text-", "")  # e.g. madras-green, sub
    if link.precision == "area":
        return format_html(
            '<span class="{} border-[1.5px] border-dashed border-{}" aria-hidden="true" title="Area only"></span>',
            _DOT,
            color,
        )
    return format_html(
        '<span class="{} bg-{}" aria-hidden="true" title="Located place"></span>',
        _DOT,
        color,
    )


@register.simple_tag
def circulation_tag(item):
    phases = [phase_for(code) for code in phase_codes(item)] or [phase_for(None)]
    return format_html_join(
        " ",
        '<span class="inline-flex whitespace-nowrap rounded px-2 py-1 font-mono text-[11.5px] font-semibold {} {}">{}</span>',
        ((p.bg_class, p.text_class, p.label) for p in phases),
    )
