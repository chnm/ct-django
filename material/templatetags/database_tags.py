from django import template
from django.utils.html import format_html
from django.utils.safestring import mark_safe

from material.timeline import is_exact_year, phase_for

register = template.Library()

_DOT = "inline-block h-[9px] w-[9px] rounded-full align-middle mr-1.5"


@register.filter(name="date_display")
def date_display(year):
    """Exact four-digit years render plain; anything else gets the dotted-gold
    approximate treatment; empty renders an em dash."""
    if not year or not year.strip():
        return mark_safe('<span class="font-mono text-faint">&mdash;</span>')
    if is_exact_year(year):
        return format_html('<span class="font-mono">{}</span>', year.strip())
    return format_html(
        '<span class="font-mono text-madras-gold border-b border-dotted border-[#c9a24a]">{}</span>',
        year.strip(),
    )


@register.simple_tag
def phase(record):
    return phase_for(record.circulation)


@register.simple_tag
def precision_dot(record, side):
    """Filled dot when a specific place is recorded, dashed ring when only an
    area is, nothing when neither. Colored by the record's phase."""
    p = phase_for(record.circulation)
    color = p.text_class.replace("text-", "")  # e.g. madras-green, sub
    if getattr(record, f"{side}_place_id"):
        return format_html(
            '<span class="{} bg-{}" aria-hidden="true" title="Located place"></span>',
            _DOT,
            color,
        )
    if getattr(record, f"{side}_area_id"):
        return format_html(
            '<span class="{} border-[1.5px] border-dashed border-{}" aria-hidden="true" title="Area only"></span>',
            _DOT,
            color,
        )
    return ""


@register.simple_tag
def circulation_tag(record):
    p = phase_for(record.circulation)
    return format_html(
        '<span class="inline-flex whitespace-nowrap rounded px-2 py-1 font-mono text-[11.5px] font-semibold {} {}">{}</span>',
        p.bg_class,
        p.text_class,
        p.label,
    )
