# Field Notes Phase 2 (Database, Quick-View, Record Page, Swimlane) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the Textiles Database list, an inline quick-view that replaces the record modal, and the full record page into the Field Notes system, with a reusable server-rendered swimlane timeline.

**Architecture:** A pure-Python helper (`material/timeline.py`) computes swimlane geometry so the SVG partial stays logic-free. Three template tags render dates, precision dots, and circulation tags identically everywhere. The list page keeps django-tables2 + htmx; the htmx response swaps the table in place and the swimlane out-of-band. The quick-view is an htmx-inserted `<tr>`. The record page is a rewrite of the existing `/database/<id>/` template.

**Tech Stack:** Django 6, django-tables2 (`querystring_replace` tag), django-filter, htmx (already loaded), Alpine (already loaded, used by the year slider), Tailwind 3.4 via django-tailwind, pytest-django.

**Spec:** `docs/superpowers/specs/2026-09-03-field-notes-phase-2-database-design.md`

## Global Constraints

- Records with null `circulation` show a grey "Unassigned" tag and are never drawn in the swimlane.
- The swimlane's domain follows the records it is given, rounded outward to decades, minimum 50 years wide; empty input → `(1700, 1900)`.
- A date string is "exact" only when, stripped, it is exactly four digits. Everything else is "approximate" (dotted gold underline).
- Visible record number is `record.id`.
- Linked items: crosslinks (public) first, then records sharing the record's first keyword, max 4.
- No map, no brushing, no Cite/Share/Open data buttons.
- Phase colors: Production `#3a6b52` / `text-madras-green` / `bg-tag-green`; Trade & Distribution `#9a7328` / `text-madras-gold` / `bg-tag-gold`; Consumption `#9c3a2e` / `text-madras-red` / `bg-tag-red`; Unassigned `#9a978c` / `text-sub` / `bg-paper-2`.
- Tailwind classes exist from phase 1: `bg-paper`, `bg-paper-2`, `bg-paper-3`, `border-rule`, `text-ink`, `text-navy`, `bg-navy`, `text-sub`, `text-faint`, `text-faint-2`, `text-label`, `.lbl`, `.btn-solid`, `.btn-ghost`, `font-display`, `font-serif`, `font-mono`, `text-madras-red/gold/green`, `bg-tag-red/gold/green`.
- Run tests with `uv run python -m pytest -q` (23 pass at the start of this plan). Build CSS with `cd theme/static_src && npm run build`. Dev server: `uv run python manage.py runserver 8000` (visit with `?djdt=hide` to hide the debug toolbar).
- Every commit message ends with:
  ```
  Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01G3Wtr5UtiqmvbDKSRf3NLt
  ```

---

## File map

| File | Responsibility |
|---|---|
| `material/timeline.py` | `PHASES`, `UNASSIGNED`, `phase_for()`, `is_exact_year()`, `build_timeline()` (create) |
| `material/test_timeline.py` | Tests for the helper (create) |
| `material/templatetags/database_tags.py` | `date_display`, `precision_dot`, `circulation_tag` (create) |
| `templates/database/_swimlane.html` | SVG partial (create) |
| `templates/database/single_table.html` | htmx response: table + out-of-band swimlane (rewrite) |
| `templates/database/textile_table.html` | django-tables2 template (rewrite, standalone) |
| `templates/database/cells/*.html` | preview, date, route, circulation, actions (create) |
| `templates/database/textile_type.html`, `textile_subtype.html` | restyle (modify) |
| `templates/database/image_display.html`, `pagination.html`, `textile_records_list.html`, `theme/templates/database.html` | delete |
| `material/tables.py` | new columns (rewrite) |
| `material/filters.py` | circulation → `MultipleChoiceFilter` (modify) |
| `templates/database/textiles.html` | list page (rewrite) |
| `static/js/database.js` | drop modal + keyword fuzzy code (modify) |
| `templates/database/_quick_view.html` | quick-view row (create) |
| `templates/database/textile_records_single.html` | record page (rewrite) |
| `material/views.py`, `config/urls.py` | `quick_view`, context additions, remove `record_details` (modify) |
| `material/tests.py` | view + tag tests (modify) |

---

### Task 1: Timeline helper

**Files:**
- Create: `material/timeline.py`
- Create: `material/test_timeline.py`

**Interfaces:**
- Produces:
  - `PHASES: dict[str, Phase]` keyed `"pr" | "td" | "co"`, `UNASSIGNED: Phase`; `Phase` has `code, label, short, hex, text_class, bg_class`.
  - `phase_for(code: str | None) -> Phase`
  - `is_exact_year(year: str | None) -> bool`
  - `build_timeline(records, highlight_id=None, compact=False) -> Timeline` where `records` is an iterable of objects with `.id`, `.year`, `.circulation`.
  - `Timeline` fields: `lanes: list[Lane]`, `ticks: list[Tick]`, `domain: tuple[int,int]`, `width: int`, `height: int`, `gutter: int`, `axis_y: int`, `placed: int`, `total: int`, `undated: int`, `unassigned: int`, `band: tuple[float,float] | None`, `band_width: float | None`.
  - `Lane` fields: `code, short, hex, y_top, y_bottom, y_label, bars: list[Bar]`.
  - `Bar` fields: `record_id, year_text, start, end, approximate, x1, x2, xn, y, highlighted, dimmed`.
  - `Tick` fields: `x, label`.

- [ ] **Step 1: Write the failing tests**

Create `material/test_timeline.py`:

```python
from types import SimpleNamespace

from material.timeline import (
    PHASES,
    UNASSIGNED,
    build_timeline,
    is_exact_year,
    phase_for,
)


def rec(id, year, circulation="pr"):
    return SimpleNamespace(id=id, year=year, circulation=circulation)


def test_phase_lookup():
    assert phase_for("td").label == "Trade & Distribution"
    assert phase_for(None) is UNASSIGNED
    assert phase_for("zz") is UNASSIGNED
    assert list(PHASES) == ["pr", "td", "co"]


def test_is_exact_year():
    assert is_exact_year("1748")
    assert is_exact_year(" 1748 ")
    assert not is_exact_year("ca. 1748")
    assert not is_exact_year("1855-1879")
    assert not is_exact_year("18th century")
    assert not is_exact_year("")
    assert not is_exact_year(None)


def test_exact_and_approximate_bars():
    t = build_timeline([rec(1, "1748"), rec(2, "ca. 1855-1879", "td")])
    prod, trade = t.lanes[0], t.lanes[1]
    assert prod.code == "pr" and trade.code == "td"
    (b1,) = prod.bars
    (b2,) = trade.bars
    assert (b1.start, b1.end, b1.approximate) == (1748, 1748, False)
    assert (b2.start, b2.end, b2.approximate) == (1855, 1879, True)
    assert b2.x1 < b2.x2 and b2.xn == b2.x1
    assert t.placed == 2 and t.total == 2


def test_undated_and_unassigned_are_counted_not_drawn():
    t = build_timeline([rec(1, "unknown"), rec(2, "1800", None), rec(3, "1800")])
    assert t.undated == 1
    assert t.unassigned == 1
    assert t.placed == 1
    assert sum(len(lane.bars) for lane in t.lanes) == 1


def test_domain_rounds_outward_to_decades_and_is_at_least_fifty_years():
    t = build_timeline([rec(1, "1748"), rec(2, "1752")])
    assert t.domain == (1725, 1775)  # 1740-1760 widened symmetrically to 50
    t = build_timeline([rec(1, "1701"), rec(2, "1899")])
    assert t.domain == (1700, 1900)


def test_empty_input_has_default_domain_and_no_bars():
    t = build_timeline([])
    assert t.domain == (1700, 1900)
    assert t.placed == 0 and all(lane.bars == [] for lane in t.lanes)
    assert t.ticks[0].label == "1700" and t.ticks[-1].label == "1900"


def test_ticks_scale_with_domain():
    labels = [k.label for k in build_timeline([rec(1, "600"), rec(2, "2022")]).ticks]
    assert labels[0] == "600" and labels[-1] == "2030"
    assert all(int(v) % 100 == 0 for v in labels[1:-1])  # century ticks over a wide domain
    assert "1000" in labels and len(labels) <= 20


def test_highlight_dims_others_and_sets_band():
    t = build_timeline([rec(1, "1748"), rec(2, "1800", "co")], highlight_id=2)
    bars = [b for lane in t.lanes for b in lane.bars]
    by_id = {b.record_id: b for b in bars}
    assert by_id[2].highlighted and not by_id[2].dimmed
    assert by_id[1].dimmed and not by_id[1].highlighted
    assert t.band == (by_id[2].x1, by_id[2].x2)


def test_compact_reduces_height():
    full = build_timeline([rec(1, "1748")])
    compact = build_timeline([rec(1, "1748")], compact=True)
    assert compact.height < full.height


def test_bars_in_a_lane_spread_over_three_rows():
    t = build_timeline([rec(i, str(1700 + i)) for i in range(6)])
    ys = [b.y for b in t.lanes[0].bars]
    assert len(set(ys)) == 3
```

- [ ] **Step 2: Run to verify they fail**

Run: `uv run python -m pytest material/test_timeline.py -q`
Expected: collection error, `ModuleNotFoundError: No module named 'material.timeline'`.

- [ ] **Step 3: Implement the helper**

Create `material/timeline.py`:

```python
"""Swimlane timeline data for the database pages.

Pure Python: turns records into lane/bar geometry for the SVG partial in
templates/database/_swimlane.html so the template holds no arithmetic.
"""

from dataclasses import dataclass, field
from math import ceil, floor

from material.filters import extract_year_range


@dataclass(frozen=True)
class Phase:
    code: str | None
    label: str
    short: str
    hex: str
    text_class: str
    bg_class: str


PHASES: dict[str, Phase] = {
    "pr": Phase("pr", "Production", "PROD", "#3a6b52", "text-madras-green", "bg-tag-green"),
    "td": Phase("td", "Trade & Distribution", "TRAD", "#9a7328", "text-madras-gold", "bg-tag-gold"),
    "co": Phase("co", "Consumption", "CONS", "#9c3a2e", "text-madras-red", "bg-tag-red"),
}
UNASSIGNED = Phase(None, "Unassigned", "—", "#9a978c", "text-sub", "bg-paper-2")


def phase_for(code):
    return PHASES.get(code, UNASSIGNED)


def is_exact_year(year):
    return bool(year) and year.strip().isdigit() and len(year.strip()) == 4


@dataclass
class Bar:
    record_id: int
    year_text: str
    start: int
    end: int
    approximate: bool
    x1: float
    x2: float
    xn: float
    y: float
    highlighted: bool
    dimmed: bool


@dataclass
class Lane:
    code: str
    short: str
    hex: str
    y_top: float
    y_bottom: float
    y_label: float
    bars: list[Bar] = field(default_factory=list)


@dataclass
class Tick:
    x: float
    label: str


@dataclass
class Timeline:
    lanes: list[Lane]
    ticks: list[Tick]
    domain: tuple[int, int]
    width: int
    height: int
    gutter: int
    axis_y: int
    placed: int
    total: int
    undated: int
    unassigned: int
    band: tuple[float, float] | None
    band_width: float | None


WIDTH = 1000
GUTTER = 64
RIGHT_PAD = 16
TOP = 8
AXIS_H = 26
ROWS = 3
DEFAULT_DOMAIN = (1700, 1900)
MIN_SPAN = 50


def _domain(spans):
    if not spans:
        return DEFAULT_DOMAIN
    lo = floor(min(s for s, _ in spans) / 10) * 10
    hi = ceil(max(e for _, e in spans) / 10) * 10
    if hi - lo < MIN_SPAN:
        mid = (lo + hi) / 2
        lo, hi = int(mid - MIN_SPAN / 2), int(mid + MIN_SPAN / 2)
    return lo, hi


def _tick_step(lo, hi):
    span = hi - lo
    if span > 300:
        return 100
    if span > 100:
        return 50
    return 10


def _ticks(lo, hi, x):
    step = _tick_step(lo, hi)
    first = ceil(lo / step) * step
    values = [lo] + [v for v in range(first, hi + 1, step) if lo < v < hi] + [hi]
    return [Tick(x(v), str(v)) for v in values]


def build_timeline(records, highlight_id=None, compact=False):
    lane_h = 28 if compact else 44
    parsed = []  # (record, start, end)
    undated = unassigned = 0
    for r in records:
        if r.circulation not in PHASES:
            unassigned += 1
            continue
        start, end = extract_year_range(r.year)
        if start is None:
            undated += 1
            continue
        parsed.append((r, start, end))
    total = len(parsed) + undated + unassigned

    lo, hi = _domain([(s, e) for _, s, e in parsed])
    plot_w = WIDTH - GUTTER - RIGHT_PAD

    def x(year):
        return round(GUTTER + (year - lo) / (hi - lo) * plot_w, 1)

    lanes = []
    band = None
    band_width = None
    for i, phase in enumerate(PHASES.values()):
        y_top = TOP + i * lane_h
        lane = Lane(
            code=phase.code,
            short=phase.short,
            hex=phase.hex,
            y_top=y_top,
            y_bottom=y_top + lane_h,
            y_label=y_top + lane_h / 2 + 4,
        )
        members = [(r, s, e) for r, s, e in parsed if r.circulation == phase.code]
        row_gap = lane_h / (ROWS + 1)
        for n, (r, s, e) in enumerate(members):
            highlighted = highlight_id is not None and r.id == highlight_id
            bar = Bar(
                record_id=r.id,
                year_text=r.year or "",
                start=s,
                end=e,
                approximate=not is_exact_year(r.year),
                x1=x(s),
                x2=x(e),
                xn=x(s),
                y=round(y_top + row_gap * ((n % ROWS) + 1), 1),
                highlighted=highlighted,
                dimmed=highlight_id is not None and not highlighted,
            )
            if highlighted:
                band = (bar.x1, bar.x2)
                band_width = round(bar.x2 - bar.x1, 1)
            lane.bars.append(bar)
        lanes.append(lane)

    axis_y = TOP + len(PHASES) * lane_h
    return Timeline(
        lanes=lanes,
        ticks=_ticks(lo, hi, x),
        domain=(lo, hi),
        width=WIDTH,
        height=axis_y + AXIS_H,
        gutter=GUTTER,
        axis_y=axis_y,
        placed=len(parsed),
        total=total,
        undated=undated,
        unassigned=unassigned,
        band=band,
        band_width=band_width,
    )
```

- [ ] **Step 4: Run the tests**

Run: `uv run python -m pytest material/test_timeline.py -v`
Expected: 10 passed.

- [ ] **Step 5: Commit**

```bash
git add material/timeline.py material/test_timeline.py
git commit -m "feat(database): swimlane timeline helper with phase vocabulary"
```

---

### Task 2: Template tags

**Files:**
- Create: `material/templatetags/database_tags.py`
- Test: `material/tests.py` (append)

**Interfaces:**
- Consumes: `phase_for`, `is_exact_year` from Task 1.
- Produces, after `{% load database_tags %}`:
  - filter `{{ year|date_display }}` → safe HTML span.
  - simple tag `{% precision_dot record "from" %}` / `"to"` → safe HTML span or empty string.
  - simple tag `{% circulation_tag record %}` → safe HTML span.
  - simple tag `{% phase record as p %}` → the `Phase` object (for templates that need `p.hex`, `p.text_class`).

- [ ] **Step 1: Write the failing tests**

Append to `material/tests.py`:

```python
from django.template import Context, Template


class DatabaseTagsTest(TestCase):
    def render(self, tpl, **ctx):
        return Template("{% load database_tags %}" + tpl).render(Context(ctx))

    def test_date_display_exact_approximate_empty(self):
        self.assertEqual(
            self.render("{{ y|date_display }}", y="1748"),
            '<span class="font-mono">1748</span>',
        )
        html = self.render("{{ y|date_display }}", y="ca. 1855-1879")
        self.assertIn("border-dotted", html)
        self.assertIn("text-madras-gold", html)
        self.assertIn("ca. 1855-1879", html)
        self.assertIn("&mdash;", self.render("{{ y|date_display }}", y=""))
        self.assertIn("&lt;b&gt;", self.render("{{ y|date_display }}", y="<b>x"))

    def test_precision_dot_place_area_none(self):
        area = Area.objects.create(name="India")
        place = Place.objects.create(city="Madras", country="India", area=area, latitude=1, longitude=1)
        r = TextileRecord.objects.create(year="1748", circulation="pr", from_place=place, from_area=area, to_area=area)
        self.assertIn("rounded-full", self.render("{% precision_dot r 'from' %}", r=r))
        self.assertIn("bg-madras-green", self.render("{% precision_dot r 'from' %}", r=r))
        self.assertIn("border-dashed", self.render("{% precision_dot r 'to' %}", r=r))
        r2 = TextileRecord.objects.create(year="1748")
        self.assertEqual(self.render("{% precision_dot r 'to' %}", r=r2).strip(), "")

    def test_circulation_tag_labels(self):
        r = TextileRecord.objects.create(year="1748", circulation="td")
        html = self.render("{% circulation_tag r %}", r=r)
        self.assertIn("Trade &amp; Distribution", html)
        self.assertIn("bg-tag-gold", html)
        r2 = TextileRecord.objects.create(year="1748")
        html = self.render("{% circulation_tag r %}", r=r2)
        self.assertIn("Unassigned", html)
        self.assertIn("bg-paper-2", html)
```

Note: `Place.save()` geocodes when coordinates are missing; the test passes `latitude`/`longitude` so no network call happens.

- [ ] **Step 2: Run to verify they fail**

Run: `uv run python -m pytest material/tests.py::DatabaseTagsTest -q`
Expected: `TemplateSyntaxError: 'database_tags' is not a registered tag library`.

- [ ] **Step 3: Implement the tags**

Create `material/templatetags/database_tags.py`:

```python
from django import template
from django.utils.html import escape, format_html
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
            '<span class="{} bg-{}" aria-hidden="true" title="Located place"></span>', _DOT, color
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
```

Tailwind must see the dynamic class names `bg-madras-green`, `bg-madras-gold`, `bg-madras-red`, `bg-sub`, `border-madras-green`, `border-madras-gold`, `border-madras-red`, `border-sub`. Add this comment line to the top of `templates/database/cells/route.html` (created in Task 4) so the JIT scanner finds them: `{# tailwind: bg-madras-green bg-madras-gold bg-madras-red bg-sub border-madras-green border-madras-gold border-madras-red border-sub #}`. For this task, add the same comment as the first line of `templates/database/_swimlane.html` when Task 3 creates it; until then the tests don't need CSS.

- [ ] **Step 4: Run the tests**

Run: `uv run python -m pytest material/tests.py::DatabaseTagsTest -v`
Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add material/templatetags/database_tags.py material/tests.py
git commit -m "feat(database): date, precision-dot and circulation template tags"
```

---

### Task 3: Swimlane partial wired into the list view

**Files:**
- Create: `templates/database/_swimlane.html`
- Rewrite: `templates/database/single_table.html`
- Modify: `material/views.py` (`TextileTableView.get_context_data`)
- Test: `material/tests.py` (append)

**Interfaces:**
- Consumes: `build_timeline` from Task 1.
- Produces: partial `database/_swimlane.html` taking `timeline` (and optional `highlight_label`); list view context key `timeline`; htmx response `single_table.html` renders `<div class="table-container">` + out-of-band `<div id="swimlane" hx-swap-oob="true">`.

- [ ] **Step 1: Write the failing tests**

Append to `material/tests.py`:

```python
class DatabaseListViewTest(TestCase):
    def setUp(self):
        TextileRecord.objects.create(year="1748", circulation="pr", is_public=True)
        TextileRecord.objects.create(year="ca. 1800", circulation="td", is_public=True)
        TextileRecord.objects.create(year="1900", is_public=True)  # unassigned

    def test_list_context_has_timeline_and_renders_swimlane(self):
        response = self.client.get("/database/")
        self.assertEqual(response.status_code, 200)
        t = response.context["timeline"]
        self.assertEqual((t.placed, t.total, t.unassigned), (2, 3, 1))
        html = response.content.decode()
        self.assertIn('id="swimlane"', html)
        self.assertIn("2 of 3 records placed by circulation", html)

    def test_htmx_response_swaps_table_and_swimlane_out_of_band(self):
        response = self.client.get("/database/?circulation=pr", HTTP_HX_REQUEST="true")
        html = response.content.decode()
        self.assertTrue(html.lstrip().startswith('<div class="table-container"'))
        self.assertIn('hx-swap-oob="true"', html)
        self.assertIn("1 of 1 records placed by circulation", html)
```

The second test also depends on Task 5's `MultipleChoiceFilter` change (`?circulation=pr` must filter to one record). Until Task 5 lands, the existing `icontains` filter also matches `pr` exactly, so the assertion holds either way.

- [ ] **Step 2: Run to verify they fail**

Run: `uv run python -m pytest material/tests.py::DatabaseListViewTest -q`
Expected: `KeyError: 'timeline'`.

- [ ] **Step 3: Create the SVG partial**

Create `templates/database/_swimlane.html`:

```html
{# tailwind: bg-madras-green bg-madras-gold bg-madras-red bg-sub border-madras-green border-madras-gold border-madras-red border-sub #}
{# Context: timeline (material.timeline.Timeline), optional highlight_label (str) #}
<div class="rounded-lg border border-rule bg-white">
  <div class="flex flex-wrap items-center justify-between gap-2 px-5 pt-4 pb-1">
    <span class="lbl">Records over time &middot; by circulation</span>
    <span class="lbl text-faint">
      {% if highlight_label %}{{ highlight_label }}{% else %}{{ timeline.placed }} of {{ timeline.total }} records placed by circulation{% if timeline.undated %} &middot; {{ timeline.undated }} undated{% endif %}{% endif %}
    </span>
  </div>
  <svg viewBox="0 0 {{ timeline.width }} {{ timeline.height }}" width="100%" role="img"
       aria-label="Timeline of records by circulation phase, {{ timeline.domain.0 }} to {{ timeline.domain.1 }}"
       class="block px-2 pb-2" style="height:auto">
    {% if timeline.band %}
      <rect x="{{ timeline.band.0 }}" y="0" width="{{ timeline.band_width }}" height="{{ timeline.axis_y }}" fill="#9a7328" opacity=".08"/>
    {% endif %}
    {% for tick in timeline.ticks %}
      <line x1="{{ tick.x }}" x2="{{ tick.x }}" y1="0" y2="{{ timeline.axis_y }}" stroke="#e4dfd3" stroke-width="1"/>
      <text x="{{ tick.x }}" y="{{ timeline.axis_y|add:18 }}" text-anchor="middle" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="11" fill="#9a978c">{{ tick.label }}</text>
    {% endfor %}
    {% for lane in timeline.lanes %}
      <line x1="0" x2="{{ timeline.width }}" y1="{{ lane.y_bottom }}" y2="{{ lane.y_bottom }}" stroke="#efe9dc" stroke-width="1"/>
      <text x="12" y="{{ lane.y_label }}" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="11" font-weight="600" fill="{{ lane.hex }}">{{ lane.short }}</text>
      {% for bar in lane.bars %}
        <g opacity="{% if bar.dimmed %}.25{% else %}1{% endif %}">
          <title>Record {{ bar.record_id }} &middot; {{ bar.year_text }}</title>
          <a href="{% url 'textile_single' item_id=bar.record_id %}">
            <line x1="{{ bar.x1 }}" x2="{{ bar.x2 }}" y1="{{ bar.y }}" y2="{{ bar.y }}" stroke="{{ lane.hex }}" stroke-width="{% if bar.highlighted %}3{% else %}2{% endif %}" stroke-linecap="round"/>
            {% if bar.approximate %}
              <line x1="{{ bar.x1 }}" x2="{{ bar.x1 }}" y1="{{ bar.y|add:-4 }}" y2="{{ bar.y|add:4 }}" stroke="{{ lane.hex }}" stroke-width="1"/>
              <line x1="{{ bar.x2 }}" x2="{{ bar.x2 }}" y1="{{ bar.y|add:-4 }}" y2="{{ bar.y|add:4 }}" stroke="{{ lane.hex }}" stroke-width="1"/>
            {% endif %}
            <circle cx="{{ bar.xn }}" cy="{{ bar.y }}" r="{% if bar.highlighted %}4{% else %}3{% endif %}" fill="{{ lane.hex }}"/>
          </a>
        </g>
      {% endfor %}
    {% endfor %}
  </svg>
</div>
```

The `|add:-4` filters on floats work because Django's `add` coerces both sides with `int()` first; bar `y` values are always whole or half numbers, which is fine at this scale.

- [ ] **Step 4: Rewrite `single_table.html`**

```html
{% load render_table from django_tables2 %}
<div class="table-container">
  {% render_table table %}
</div>
<div id="swimlane" hx-swap-oob="true">
  {% include "database/_swimlane.html" with timeline=timeline %}
</div>
```

- [ ] **Step 5: Add `timeline` to the list view context**

In `material/views.py`, add `from material.timeline import build_timeline` to the imports, and in `TextileTableView.get_context_data`, before `return context`, add:

```python
        context["timeline"] = build_timeline(self.object_list)
```

`FilterView` sets `self.object_list` to the filtered queryset before pagination; `build_timeline` only reads `id`, `year`, `circulation`.

Also, in `templates/database/textiles.html`, temporarily add directly above the existing `<div class="flex flex-col lg:flex-row gap-6">` line:

```html
    <div id="swimlane" class="mb-6">
      {% include "database/_swimlane.html" with timeline=timeline %}
    </div>
```

(Task 5 rewrites this file entirely; this keeps the page working and the tests meaningful now.)

- [ ] **Step 6: Run the tests, then the full suite**

Run: `uv run python -m pytest material/tests.py::DatabaseListViewTest -v`
Expected: 2 passed.
Run: `uv run python -m pytest -q`
Expected: all pass (38 = 23 + 10 + 3 + 2).

- [ ] **Step 7: Commit**

```bash
git add templates/database/_swimlane.html templates/database/single_table.html templates/database/textiles.html material/views.py material/tests.py
git commit -m "feat(database): server-rendered swimlane on the list page with htmx out-of-band refresh"
```

---

### Task 4: Table columns and cells

**Files:**
- Rewrite: `material/tables.py`
- Rewrite: `templates/database/textile_table.html`
- Create: `templates/database/cells/preview.html`, `date.html`, `route.html`, `circulation.html`, `actions.html`
- Modify: `templates/database/textile_type.html`, `textile_subtype.html`
- Delete: `templates/database/image_display.html`, `templates/database/pagination.html`, `templates/database/textile_records_list.html`, `theme/templates/database.html`
- Test: `material/tests.py` (append to `DatabaseListViewTest`)

**Interfaces:**
- Consumes: template tags from Task 2.
- Produces: the table markup; the Actions cell links to URL name `textile_quick_view` (created in Task 6). Until Task 6 exists the `{% url %}` would fail, so this task creates a stub URL + view for it (see Step 4) that Task 6 replaces.

- [ ] **Step 1: Write the failing test**

Append inside `DatabaseListViewTest`:

```python
    def test_table_columns_and_cells(self):
        area = Area.objects.create(name="Caribbean")
        TextileRecord.objects.create(year="1755", circulation="co", is_public=True, from_area=area, to_area=area)
        html = self.client.get("/database/").content.decode()
        for header in ["Preview", "Date", "Textile type", "Subtype", "Origin", "Circulation", "Actions"]:
            self.assertIn(header, html)
        self.assertIn("border-dotted", html)          # approximate date
        self.assertIn("border-dashed", html)          # area-only precision ring
        self.assertIn("Unassigned", html)             # null circulation tag
        self.assertIn("Consumption", html)
        self.assertIn("quick-view/", html)            # actions cell
        self.assertNotIn("openModal", html)
```

- [ ] **Step 2: Run to verify it fails**

Run: `uv run python -m pytest material/tests.py::DatabaseListViewTest::test_table_columns_and_cells -q`
Expected: FAIL on "Origin" (old header is "Textile Type"/no route column).

- [ ] **Step 3: Cell partials**

`templates/database/cells/preview.html`:
```html
{% with img=record.images.first %}
{% if img and img.is_image_public %}
  <a href="{% url 'textile_single' item_id=record.id %}"><img src="{{ img.image.url }}" alt="{{ img.alt_text|default:'' }}" class="h-[30px] w-[42px] rounded object-cover"></a>
{% else %}
  <span class="block h-[30px] w-[42px] rounded border border-dashed border-rule bg-paper-2" aria-hidden="true"></span>
{% endif %}
{% endwith %}
```

`templates/database/cells/date.html`:
```html
{% load database_tags %}{{ record.year|date_display }}
```

`templates/database/cells/route.html`:
```html
{# tailwind: bg-madras-green bg-madras-gold bg-madras-red bg-sub border-madras-green border-madras-gold border-madras-red border-sub #}
{% load database_tags %}
<span class="whitespace-nowrap">
  {% if record.from_place or record.from_area %}{% precision_dot record "from" %}{{ record.from_place.city|default:record.from_area.name }}{% else %}<span class="text-faint">&mdash;</span>{% endif %}
  <span class="mx-1 text-faint">&rarr;</span>
  {% if record.to_place or record.to_area %}{% precision_dot record "to" %}{{ record.to_place.city|default:record.to_area.name }}{% else %}<span class="text-faint">&mdash;</span>{% endif %}
</span>
```

`templates/database/cells/circulation.html`:
```html
{% load database_tags %}{% circulation_tag record %}
```

`templates/database/cells/actions.html`:
```html
<div class="flex items-center justify-end gap-1">
  <button type="button"
          hx-get="{% url 'textile_quick_view' item_id=record.id %}"
          hx-target="closest tr"
          hx-swap="afterend"
          class="rounded p-1 text-faint hover:text-navy"
          aria-label="Quick view record {{ record.id }}">
    <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="8" cy="8" r="6"/><circle cx="8" cy="8" r="2" fill="currentColor"/></svg>
  </button>
  <a href="{% url 'textile_single' item_id=record.id %}" class="rounded p-1 text-faint hover:text-navy" aria-label="Open record {{ record.id }}">
    <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12L12 4M6 4h6v6"/></svg>
  </a>
</div>
```

Restyle `templates/database/textile_type.html`:
```html
{% if record.primary_textile_types.all %}
  {% for type in record.primary_textile_types.all %}<span class="block">{{ type.name }}</span>{% endfor %}
{% else %}
  <span class="block text-faint">Context record</span>
{% endif %}
```

Restyle `templates/database/textile_subtype.html`:
```html
{% if record.secondary_textile_types.all %}
  {% for type in record.secondary_textile_types.all %}<span class="block">{{ type.name }}</span>{% endfor %}
{% else %}
  <span class="block text-faint">&mdash;</span>
{% endif %}
```

Delete: `git rm templates/database/image_display.html templates/database/pagination.html templates/database/textile_records_list.html theme/templates/database.html`.

- [ ] **Step 4: Stub the quick-view URL (replaced in Task 6)**

In `config/urls.py`, after the `textile_single` path add:

```python
    path("database/<int:item_id>/quick-view/", textile_records_single, name="textile_quick_view"),
```

(It reuses the existing view purely so `{% url %}` resolves; Task 6 points it at the real view.)

- [ ] **Step 5: Rewrite `material/tables.py`**

```python
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
        fields = ("preview", "year", "textile_type", "textile_subtype", "route", "circulation", "actions")
        attrs = {"class": "w-full min-w-[900px] border-collapse font-display text-[13.5px] text-ink"}
        empty_text = "No results match the search criteria."
```

- [ ] **Step 6: Rewrite `templates/database/textile_table.html` as a standalone template**

```html
{% load django_tables2 i18n %}
<div class="overflow-x-auto rounded-lg border border-rule bg-white">
  <table {{ table.attrs.as_html }}>
    <thead class="bg-[#f4f1ea]">
      <tr>
        {% for column in table.columns %}
          <th {{ column.attrs.th.as_html }} class="lbl px-4 py-3 text-left font-semibold">{{ column.header }}</th>
        {% endfor %}
      </tr>
    </thead>
    <tbody>
      {% for row in table.paginated_rows %}
        <tr class="border-t border-[#efe9dc] even:bg-paper-3 hover:bg-[#f6f3ec]">
          {% for column, cell in row.items %}
            <td {{ column.attrs.td.as_html }}>{{ cell }}</td>
          {% endfor %}
        </tr>
      {% empty %}
        <tr><td colspan="{{ table.columns|length }}" class="px-4 py-8 text-center font-serif text-sub">{{ table.empty_text }}</td></tr>
      {% endfor %}
    </tbody>
  </table>
  <div class="flex flex-wrap items-center justify-between gap-4 border-t border-rule px-4 py-3">
    <div class="flex flex-wrap items-center gap-4 lbl text-faint">
      <span><span class="inline-block h-[9px] w-[9px] rounded-full bg-sub align-middle mr-1.5"></span>located place</span>
      <span><span class="inline-block h-[9px] w-[9px] rounded-full border-[1.5px] border-dashed border-sub align-middle mr-1.5"></span>area only</span>
      <span><span class="font-mono normal-case tracking-normal text-madras-gold border-b border-dotted border-[#c9a24a] mr-1.5">c.1740s</span>approximate date</span>
    </div>
    {% if table.page and table.paginator.num_pages > 1 %}
      <nav class="flex items-center gap-1 font-display text-sm" aria-label="Pagination">
        {% if table.page.has_previous %}
          <button type="button" class="rounded border border-ghost-border px-3 py-1 hover:bg-paper-2"
                  hx-get="{% querystring_replace table.prefixed_page_field=table.page.previous_page_number %}"
                  hx-target="div.table-container" hx-swap="outerHTML" hx-indicator=".progress">&laquo; {% trans 'previous' %}</button>
        {% endif %}
        {% for p in table.page|table_page_range:table.paginator %}
          {% if p == '...' %}
            <span class="px-2 text-faint">&hellip;</span>
          {% else %}
            <button type="button"
                    class="rounded px-3 py-1 {% if table.page.number == p %}bg-navy text-paper{% else %}hover:bg-paper-2{% endif %}"
                    hx-get="{% querystring_replace table.prefixed_page_field=p %}"
                    hx-target="div.table-container" hx-swap="outerHTML" hx-indicator=".progress"
                    {% if table.page.number == p %}aria-current="page"{% endif %}>{{ p }}</button>
          {% endif %}
        {% endfor %}
        {% if table.page.has_next %}
          <button type="button" class="rounded border border-ghost-border px-3 py-1 hover:bg-paper-2"
                  hx-get="{% querystring_replace table.prefixed_page_field=table.page.next_page_number %}"
                  hx-target="div.table-container" hx-swap="outerHTML" hx-indicator=".progress">{% trans 'next' %} &raquo;</button>
        {% endif %}
      </nav>
    {% endif %}
  </div>
</div>
```

Column sorting is dropped (every column was already `orderable=False`).

- [ ] **Step 7: Run the tests, build CSS, run the suite**

Run: `uv run python -m pytest material/tests.py::DatabaseListViewTest -v`
Expected: 3 passed.
Run: `cd theme/static_src && npm run build && cd ../.. && uv run python -m pytest -q`
Expected: all pass.

- [ ] **Step 8: Commit**

```bash
git add -A material/tables.py templates/database config/urls.py theme/templates material/tests.py
git commit -m "feat(database): Field Notes table columns, cells, legend and pagination"
```

---

### Task 5: List page, filter sidebar, and JS cleanup

**Files:**
- Rewrite: `templates/database/textiles.html`
- Modify: `material/filters.py` (circulation filter)
- Modify: `material/views.py` (`get_context_data` — drop `years`, `keywords` context no longer used; keep the rest)
- Modify: `static/js/database.js`
- Test: `material/tests.py` (append to `DatabaseListViewTest`)

**Interfaces:**
- Consumes: `#swimlane` partial and `div.table-container` from Task 3, table from Task 4.
- Produces: the finished list page. Filter GET parameters: `year_range=lo-hi`, `primary_textile_types`, `secondary_textile_types`, `circulation` (repeatable: `pr`, `td`, `co`), `from_area`, `to_area`, `source_type`, `text_search`. `keyword=<name>` continues to work as a URL parameter (used by record-page links) but has no sidebar control.

- [ ] **Step 1: Write the failing test**

Append inside `DatabaseListViewTest`:

```python
    def test_circulation_filter_accepts_multiple_values(self):
        response = self.client.get("/database/?circulation=pr&circulation=td")
        self.assertEqual(response.context["timeline"].placed, 2)
        response = self.client.get("/database/?circulation=co")
        self.assertEqual(response.context["timeline"].placed, 0)

    def test_sidebar_has_field_notes_controls_and_no_modal(self):
        html = self.client.get("/database/").content.decode()
        self.assertIn("Search filters", html)
        self.assertIn('name="circulation" value="pr"', html)
        self.assertIn('name="text_search"', html)
        self.assertNotIn('id="detailsModal"', html)
        self.assertNotIn('name="keyword"', html)
```

- [ ] **Step 2: Run to verify they fail**

Run: `uv run python -m pytest material/tests.py::DatabaseListViewTest -q`
Expected: the multi-value test fails (`icontains` on a list → 0 or error), the sidebar test fails on "Search filters".

- [ ] **Step 3: Change the circulation filter**

In `material/filters.py`, replace the `circulation = django_filters.CharFilter(...)` definition with:

```python
    circulation = django_filters.MultipleChoiceFilter(
        field_name="circulation",
        choices=TextileRecord.CIRCULATION_CHOICES,
        label="Circulation",
    )
```

`MultipleChoiceFilter` ORs the selected values by default.

- [ ] **Step 4: Rewrite `templates/database/textiles.html`**

Keep the existing Alpine year-slider block verbatim (the `<div x-data="{ min: ..., getPercent ... }">` element and everything inside it through the hidden `year_range` input), but change these classes inside it: track `bg-primary-200` → `bg-rule`; fill `bg-primary-500`/`bg-secondary` (whichever the block uses for the selected range) → `bg-navy`; handles' `bg-white border-2 border-primary-500`-style classes → `bg-white border border-navy`; the value labels' `bg-primary-100 text-primary-700`-style classes → `font-mono text-[12px] text-sub`. Do not touch the JS logic in it.

The file becomes:

```html
{% extends "base.html" %}
{% load render_table from django_tables2 %}
{% load i18n static %}
{% block title %}Textiles Database{% endblock title %}

{% block content %}
  <header class="mb-8 grid items-end gap-6 lg:grid-cols-2">
    <div>
      <div class="lbl mb-3">{{ timeline.total }} records</div>
      <h1 class="font-display text-[40px] font-semibold leading-none tracking-[-0.02em] text-ink">Textiles Database</h1>
    </div>
    <p class="max-w-[560px] font-serif text-[17px] leading-[1.55] text-sub lg:justify-self-end">Object and archival records of Madras textiles. Date ranges and location precision are shown for every row, so you can see what we know&mdash;and what we don&rsquo;t.</p>
  </header>

  <div id="swimlane" class="mb-6">
    {% include "database/_swimlane.html" with timeline=timeline %}
  </div>

  <div class="grid gap-6 lg:grid-cols-[280px_1fr]">
    <aside class="self-start overflow-hidden rounded-lg border border-rule bg-white lg:sticky lg:top-4">
      <div class="flex items-center justify-between bg-navy px-5 py-3 font-display text-[15px] font-medium text-paper">
        <span>Search filters</span>
        <button id="mobile-filter-toggle" type="button" class="lg:hidden" aria-controls="filter-content" aria-expanded="true" aria-label="Toggle filters">
          <svg class="h-5 w-5 transition-transform" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
        </button>
      </div>
      <div id="filter-content" class="p-5">
        <form method="get" hx-get="{% url 'database' %}" hx-target="div.table-container" hx-swap="outerHTML" hx-indicator=".progress" class="space-y-5">

          <div>
            <div class="lbl mb-2">Year range</div>
            {# ---- existing Alpine dual slider block goes here, restyled as described above ---- #}
          </div>

          <div>
            <label class="lbl mb-2 block" for="{{ filter.form.primary_textile_types.id_for_label }}">Primary textile type</label>
            <select id="{{ filter.form.primary_textile_types.id_for_label }}" name="{{ filter.form.primary_textile_types.html_name }}" data-primary-id class="fn-select">
              {% for value, name in filter.form.primary_textile_types.field.choices %}
                <option value="{{ value }}" {% if value|stringformat:"s" == filter.form.primary_textile_types.value|stringformat:"s" %}selected{% endif %}>{% if value == "" %}All types{% else %}{{ name }}{% endif %}</option>
              {% endfor %}
            </select>
          </div>

          <div>
            <label class="lbl mb-2 block" for="{{ filter.form.secondary_textile_types.id_for_label }}">Secondary textile type</label>
            <select id="{{ filter.form.secondary_textile_types.id_for_label }}" name="{{ filter.form.secondary_textile_types.html_name }}" data-secondary-id class="fn-select" {% if not filter.form.primary_textile_types.value %}disabled{% endif %}>
              <option value="">Select secondary textile type</option>
              {% for value, name in filter.form.secondary_textile_types.field.choices %}
                {% if value != "" %}<option value="{{ value }}" {% if value|stringformat:"s" == filter.form.secondary_textile_types.value|stringformat:"s" %}selected{% endif %}>{{ name }}</option>{% endif %}
              {% endfor %}
            </select>
          </div>

          <fieldset>
            <legend class="lbl mb-2">Circulation</legend>
            <div class="flex flex-wrap gap-2">
              {% for code, label in circulation_types %}
                <label class="cursor-pointer">
                  <input type="checkbox" name="circulation" value="{{ code }}" class="peer sr-only" {% if code in filter.form.circulation.value %}checked{% endif %}>
                  <span class="inline-flex rounded border border-transparent px-2 py-1 font-mono text-[11.5px] font-semibold opacity-60 peer-checked:opacity-100 peer-checked:border-current peer-focus-visible:ring-2 peer-focus-visible:ring-navy {% if code == 'pr' %}bg-tag-green text-madras-green{% elif code == 'td' %}bg-tag-gold text-madras-gold{% else %}bg-tag-red text-madras-red{% endif %}">{{ label }}</span>
                </label>
              {% endfor %}
            </div>
          </fieldset>

          <div>
            <label class="lbl mb-2 block" for="{{ filter.form.from_area.id_for_label }}">From area</label>
            <select id="{{ filter.form.from_area.id_for_label }}" name="{{ filter.form.from_area.html_name }}" class="fn-select">
              {% for value, name in filter.form.from_area.field.choices %}
                <option value="{{ value }}" {% if value|stringformat:"s" == filter.form.from_area.value|stringformat:"s" %}selected{% endif %}>{% if value == "" %}Any origin{% else %}{{ name }}{% endif %}</option>
              {% endfor %}
            </select>
          </div>

          <div>
            <label class="lbl mb-2 block" for="{{ filter.form.to_area.id_for_label }}">To area</label>
            <select id="{{ filter.form.to_area.id_for_label }}" name="{{ filter.form.to_area.html_name }}" class="fn-select">
              {% for value, name in filter.form.to_area.field.choices %}
                <option value="{{ value }}" {% if value|stringformat:"s" == filter.form.to_area.value|stringformat:"s" %}selected{% endif %}>{% if value == "" %}Any destination{% else %}{{ name }}{% endif %}</option>
              {% endfor %}
            </select>
          </div>

          <div>
            <label class="lbl mb-2 block" for="id_source_type">Source type</label>
            <select name="source_type" id="id_source_type" class="fn-select">
              <option value="">Primary &amp; secondary</option>
              {% for source_type in source_types %}
                <option value="{{ source_type }}" {% if source_type == request.GET.source_type %}selected{% endif %}>{{ source_type }}</option>
              {% endfor %}
            </select>
          </div>

          <div>
            <label class="lbl mb-2 block" for="text_search">Keyword / text</label>
            <input type="text" name="text_search" id="text_search" value="{{ request.GET.text_search|default:'' }}" placeholder="e.g. weavers, head-tie&hellip;" class="fn-select">
          </div>

          <div class="flex gap-2 pt-1">
            <button type="submit" class="btn-solid flex-1 text-center">Apply filters</button>
            <button type="button" class="btn-ghost text-madras-red" onclick="resetForm()">Reset</button>
          </div>
        </form>
      </div>
    </aside>

    <div>
      <div class="progress"><div class="indeterminate"></div></div>
      <div class="table-container">
        {% render_table table %}
      </div>
    </div>
  </div>
{% endblock content %}

{% block extrajs %}
  <script src="{% static 'js/database.js' %}"></script>
{% endblock extrajs %}
```

Add the `.fn-select` class to `theme/static_src/src/styles.css` inside `@layer components`:

```css
  .fn-select {
    @apply block w-full rounded-[5px] border border-[#d8d3c6] bg-white px-3 py-2 font-display text-[13.5px] text-ink disabled:cursor-not-allowed disabled:opacity-50;
  }
```

Also drop the now-unused `{% block extracss %}` slider style from the old file (it targeted `.year-slider-handle`); if the slider block references that class, replace `.year-slider-handle:focus` styling with the Tailwind classes `focus:outline-none focus:ring-2 focus:ring-navy/30` on the handle elements.

- [ ] **Step 5: Trim the view context and the JS**

In `material/views.py` `TextileTableView.get_context_data`, delete the `keywords = Tag.objects...` line and `context["keywords"]`, `context["selected_keyword"]`, and `context["years"]` (the sidebar no longer renders them). Keep `years` computation only as far as it feeds `min_year`/`max_year`. Remove the `Tag` import if `keyword_search` no longer needs it (it does — leave the import).

In `static/js/database.js`: delete `fuzzySearch`, `selectKeyword`, `let scrollPosition`, `openModal`, `closeModal` (everything from the `function fuzzySearch` line to the end of the file except `resetForm`). In the mobile-toggle block, also flip `aria-expanded` on the button when toggling: after `filterContent.classList.toggle("hidden");` add `filterToggle.setAttribute("aria-expanded", filterContent.classList.contains("hidden") ? "false" : "true");`. In the secondary-select code, replace the class-juggling (`cursor-not-allowed`, `opacity-50`, `bg-gray-100`, `bg-white`) with just toggling `secondarySelect.disabled` — the `.fn-select` class styles the disabled state.

- [ ] **Step 6: Run the tests, build CSS, run the suite**

Run: `uv run python -m pytest material/tests.py::DatabaseListViewTest -v`
Expected: 5 passed.
Run: `cd theme/static_src && npm run build && cd ../.. && uv run python -m pytest -q`
Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add templates/database/textiles.html material/filters.py material/views.py static/js/database.js theme/static_src/src/styles.css material/tests.py
git commit -m "feat(database): Field Notes list page with filter sidebar; drop the record modal"
```

---

### Task 6: Quick-view

**Files:**
- Create: `templates/database/_quick_view.html`
- Modify: `material/views.py` (add `quick_view`, remove `record_details`)
- Modify: `config/urls.py` (point `textile_quick_view` at `quick_view`; remove `record_details` path and import)
- Test: `material/tests.py` (append)

**Interfaces:**
- Consumes: URL name `textile_quick_view` (stubbed in Task 4), tags from Task 2.
- Produces: `quick_view(request, item_id)` returning the `<tr>` partial; 404 for non-public records.

- [ ] **Step 1: Write the failing tests**

Append to `material/tests.py`:

```python
class QuickViewTest(TestCase):
    def test_public_record_returns_row_partial(self):
        r = TextileRecord.objects.create(year="1680", circulation="td", is_public=True, summary_of_record="Local consumption of coarse textiles.")
        response = self.client.get(f"/database/{r.id}/quick-view/")
        self.assertEqual(response.status_code, 200)
        html = response.content.decode()
        self.assertTrue(html.lstrip().startswith("<tr"))
        self.assertIn(f"Quick view &middot; Record {r.id}", html)
        self.assertIn("Local consumption", html)
        self.assertIn("Open full record", html)
        self.assertIn("Place: area only", html)

    def test_private_record_is_404(self):
        r = TextileRecord.objects.create(year="1680", is_public=False)
        self.assertEqual(self.client.get(f"/database/{r.id}/quick-view/").status_code, 404)

    def test_record_details_endpoint_is_gone(self):
        r = TextileRecord.objects.create(year="1680", is_public=True)
        self.assertEqual(self.client.get(f"/record-details/{r.id}/").status_code, 404)
```

- [ ] **Step 2: Run to verify they fail**

Run: `uv run python -m pytest material/tests.py::QuickViewTest -q`
Expected: first test fails (stub returns the full record page, not `<tr`); third fails with 200.

- [ ] **Step 3: Create the partial**

`templates/database/_quick_view.html`:

```html
{% load database_tags %}
<tr class="quick-view">
  <td colspan="7" class="border-l-[3px] border-madras-gold bg-paper-2 px-8 py-6">
    <div class="lbl mb-3 text-madras-gold">Quick view &middot; Record {{ item.id }}{% if item.year %} &middot; {{ item.year }}{% endif %}</div>
    <p class="mb-4 max-w-[880px] font-serif text-[17px] leading-[1.55] text-ink">
      {% if item.summary_of_record %}{{ item.summary_of_record }}{% else %}<span class="text-faint">No summary is available for this record.</span>{% endif %}
    </p>
    <div class="mb-5 flex flex-wrap gap-2 font-mono text-[12px]">
      <span class="rounded border border-rule bg-white px-2 py-1">Circulation: {{ item.get_circulation_display|default:"Unassigned" }}</span>
      {% if item.source_type %}<span class="rounded border border-rule bg-white px-2 py-1">Source: {{ item.source_type }}</span>{% endif %}
      {% with s=item.primary_subjects.first %}{% if s %}<span class="rounded border border-rule bg-white px-2 py-1">Subject: {{ s.name }}</span>{% endif %}{% endwith %}
      {% with k=item.keywords.first %}{% if k %}<span class="rounded border border-rule bg-white px-2 py-1">Keyword: {{ k.name }}</span>{% endif %}{% endwith %}
      {% if not item.from_place and not item.to_place %}<span class="rounded bg-tag-red px-2 py-1 text-madras-red">Place: area only</span>{% endif %}
    </div>
    <div class="flex flex-wrap gap-2">
      <a href="{% url 'textile_single' item_id=item.id %}" class="btn-solid">Open full record &rarr;</a>
      <button type="button" class="btn-ghost" onclick="this.closest('tr').remove()">Collapse</button>
    </div>
  </td>
</tr>
```

- [ ] **Step 4: View and URL**

In `material/views.py`, delete the whole `record_details` function and add:

```python
def quick_view(request, item_id):
    item = get_object_or_404(TextileRecord, pk=item_id, is_public=True)
    return render(request, "database/_quick_view.html", {"item": item})
```

In `config/urls.py`: replace `record_details` with `quick_view` in the `from material.views import (...)` list; delete the `path("record-details/<int:record_id>/", ...)` entry; change the stub line to:

```python
    path("database/<int:item_id>/quick-view/", quick_view, name="textile_quick_view"),
```

and update the `textile_single` comment from `# modal view` to `# record page`.

- [ ] **Step 5: Run the tests and the suite**

Run: `uv run python -m pytest material/tests.py::QuickViewTest -v`
Expected: 3 passed.
Run: `uv run python -m pytest -q`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add templates/database/_quick_view.html material/views.py config/urls.py material/tests.py
git commit -m "feat(database): inline quick-view row replaces the record-details modal"
```

---

### Task 7: Record page

**Files:**
- Rewrite: `templates/database/textile_records_single.html`
- Modify: `material/views.py` (`textile_records_single`)
- Test: `material/tests.py` (append)

**Interfaces:**
- Consumes: `build_timeline`, `is_exact_year`, `extract_year_range`, tags from Task 2, `_swimlane.html` with `highlight_label`.
- Produces: context keys `item`, `timeline`, `linked` (list of records), `linked_reason` (str or ""), `date_certainty` ("exact year" | "approximate" | "undated").

- [ ] **Step 1: Write the failing tests**

Append to `material/tests.py`:

```python
class RecordPageTest(TestCase):
    def setUp(self):
        self.area = Area.objects.create(name="India")
        self.item = TextileRecord.objects.create(
            year="1680", circulation="td", is_public=True, from_area=self.area, to_area=self.area,
            summary_of_record="Local consumption.", transcription="Coarse cloth was sold weekly.",
            source_reference="Ramaswamy, Vijaya.",
        )
        self.item.keywords.add("Weavers")
        self.other = TextileRecord.objects.create(year="18th century", circulation="pr", is_public=True)
        self.other.keywords.add("Weavers")
        self.private = TextileRecord.objects.create(year="1700", is_public=False)
        self.private.keywords.add("Weavers")

    def test_record_page_context_and_sections(self):
        response = self.client.get(f"/database/{self.item.id}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context["date_certainty"], "exact year")
        self.assertEqual([r.id for r in response.context["linked"]], [self.other.id])
        self.assertEqual(response.context["linked_reason"], 'shares keyword “Weavers”')
        self.assertTrue(response.context["timeline"].band)
        html = response.content.decode()
        self.assertIn(f"Record {self.item.id}", html)
        self.assertIn("Map view arrives with the spatial explorer.", html)
        self.assertIn("This record highlighted", html)
        self.assertIn("Coarse cloth was sold weekly.", html)
        self.assertIn("No images are available for this record.", html)
        self.assertNotIn("Cite", html)

    def test_crosslinks_come_first(self):
        linked = TextileRecord.objects.create(year="1690", circulation="co", is_public=True)
        self.item.crosslinks.add(linked)
        response = self.client.get(f"/database/{self.item.id}/")
        self.assertEqual([r.id for r in response.context["linked"]], [linked.id, self.other.id])
        self.assertEqual(response.context["linked_reason"], "crosslinked")

    def test_private_record_is_404(self):
        self.assertEqual(self.client.get(f"/database/{self.private.id}/").status_code, 404)
```

- [ ] **Step 2: Run to verify they fail**

Run: `uv run python -m pytest material/tests.py::RecordPageTest -q`
Expected: `KeyError: 'date_certainty'` and the private record returning 200.

- [ ] **Step 3: Update the view**

Replace `textile_records_single` in `material/views.py` with:

```python
def textile_records_single(request, item_id):
    item = get_object_or_404(TextileRecord, pk=item_id, is_public=True)
    public = TextileRecord.objects.filter(is_public=True)

    linked = list(item.crosslinks.filter(is_public=True).order_by("id")[:4])
    linked_reason = "crosslinked" if linked else ""
    keyword = item.keywords.first()
    if keyword and len(linked) < 4:
        extra = (
            public.filter(keywords__name=keyword.name)
            .exclude(id=item.id)
            .exclude(id__in=[r.id for r in linked])
            .order_by("id")
            .distinct()[: 4 - len(linked)]
        )
        extra = list(extra)
        if extra and not linked:
            linked_reason = f"shares keyword “{keyword.name}”"
        linked += extra

    start, _ = extract_year_range(item.year)
    if start is None:
        date_certainty = "undated"
    elif is_exact_year(item.year):
        date_certainty = "exact year"
    else:
        date_certainty = "approximate"

    return render(
        request,
        "database/textile_records_single.html",
        {
            "item": item,
            "timeline": build_timeline(public, highlight_id=item.id, compact=True),
            "linked": linked,
            "linked_reason": linked_reason,
            "date_certainty": date_certainty,
        },
    )
```

Add to the imports at the top of `material/views.py`: `from material.filters import TextileFilter, extract_year_range` (extend the existing line) and `from material.timeline import build_timeline, is_exact_year` (extend the line added in Task 3).

- [ ] **Step 4: Rewrite the template**

`templates/database/textile_records_single.html`:

```html
{% extends "base.html" %}
{% load database_tags %}
{% block title %}Record {{ item.id }} · Textiles Database{% endblock title %}

{% block content %}
  <header class="mb-8 border-b border-rule pb-6">
    <a href="{% url 'database' %}" class="font-display text-sm text-madras-red hover:underline">&larr; Return to database</a>
    <div class="lbl mt-6 mb-2">Database record &middot; ID {{ item.id }}</div>
    <h1 class="font-display text-[40px] font-semibold leading-none tracking-[-0.02em] text-ink">Record {{ item.id }}</h1>
    <div class="mt-4 flex flex-wrap items-center gap-3 font-mono text-[13px] text-sub">
      {% circulation_tag item %}
      <span>{{ item.year|default:"undated" }} &middot; {{ date_certainty }}</span>
      {% if not item.primary_textile_types.exists %}<span class="text-faint">|</span><span>Context record &middot; no attached textile</span>{% endif %}
    </div>
    {% if item.archive %}
      <p class="mt-4 max-w-[720px] font-serif text-[15px] text-sub">The following data is derived from the {{ item.archive }}. <a href="{% url 'about_crawler' %}" class="text-madras-red hover:underline">How the crawler works</a>.</p>
    {% endif %}
  </header>

  <div class="grid gap-10 lg:grid-cols-[1.55fr_1fr]">
    <main class="space-y-10 lg:border-r lg:border-rule lg:pr-10">
      <section>
        <h2 class="lbl mb-3 text-madras-red">Summary</h2>
        {% if item.summary_of_record %}
          <p class="font-serif text-[18px] leading-[1.6] text-ink">{{ item.summary_of_record }}</p>
        {% else %}
          <p class="font-serif text-[18px] text-faint">No summary is available for this item.</p>
        {% endif %}
      </section>

      <section>
        <h2 class="lbl mb-3 text-madras-red">Record excerpt</h2>
        {% if item.transcription %}
          <blockquote class="border-l-[3px] border-madras-gold bg-[#faf6ec] px-6 py-5 font-serif text-[17px] italic leading-[1.6] text-ink">{{ item.transcription|linebreaksbr }}</blockquote>
        {% else %}
          <blockquote class="border-l-[3px] border-rule px-6 py-5 font-serif italic text-faint">No transcription available.</blockquote>
        {% endif %}
        {% if item.source_reference %}<p class="mt-2 text-right font-serif text-sm italic text-faint">Source: {{ item.source_reference }}</p>{% endif %}
      </section>

      <section>
        <h2 class="lbl mb-3 text-madras-red">Item metadata</h2>
        <dl class="grid overflow-hidden rounded-lg border border-rule md:grid-cols-2 [&>div]:border-b [&>div]:border-rule [&>div]:p-4 md:[&>div:nth-child(odd)]:border-r">
          <div><dt class="lbl mb-1">Primary textile types</dt><dd class="font-display text-[15px]">{% for t in item.primary_textile_types.all %}{{ t.name }}{% if not forloop.last %}, {% endif %}{% empty %}<span class="text-faint">{% if item.secondary_textile_types.exists %}None specified{% else %}No textiles attached (context record){% endif %}</span>{% endfor %}</dd></div>
          <div><dt class="lbl mb-1">Secondary textile types</dt><dd class="font-display text-[15px]">{% for t in item.secondary_textile_types.all %}{{ t.name }}{% if not forloop.last %}, {% endif %}{% empty %}<span class="text-faint">None specified</span>{% endfor %}</dd></div>
          <div><dt class="lbl mb-1">Primary subjects</dt><dd class="font-display text-[15px]">{% for s in item.primary_subjects.all %}{{ s.name }}{% if not forloop.last %}, {% endif %}{% empty %}<span class="text-faint">None specified</span>{% endfor %}</dd></div>
          <div><dt class="lbl mb-1">Secondary subjects</dt><dd class="font-display text-[15px]">{% for s in item.secondary_subjects.all %}{{ s.name }}{% if not forloop.last %}, {% endif %}{% empty %}<span class="text-faint">None specified</span>{% endfor %}</dd></div>
          <div><dt class="lbl mb-1">Keywords</dt><dd class="font-display text-[15px]">{% for k in item.keywords.all %}<a href="{% url 'database' %}?keyword={{ k.name|urlencode }}" class="hover:underline">{{ k.name }}</a>{% if not forloop.last %}, {% endif %}{% empty %}<span class="text-faint">None specified</span>{% endfor %}</dd></div>
          <div><dt class="lbl mb-1">Circulation</dt><dd class="font-display text-[15px]">{{ item.get_circulation_display|default:"Unassigned" }}</dd></div>
          <div><dt class="lbl mb-1">Source type</dt><dd class="font-display text-[15px]">{{ item.source_type|default:"None specified" }}</dd></div>
          <div><dt class="lbl mb-1">Year</dt><dd class="font-display text-[15px]">{{ item.year|date_display }}</dd></div>
          <div class="md:col-span-2 md:!border-r-0 !border-b-0"><dt class="lbl mb-1">Reference</dt><dd class="font-serif text-[15px] italic">{{ item.source_reference|default:"None specified" }}</dd></div>
        </dl>
      </section>
    </main>

    <aside class="space-y-8 rounded-lg bg-paper-3 p-6">
      <section>
        <h2 class="lbl mb-3">This record in space</h2>
        <div class="rounded-lg border border-dashed border-rule bg-white p-4">
          {% if item.from_place or item.from_area or item.to_place or item.to_area %}
            <div class="font-display text-[15px]">
              {% if item.from_place or item.from_area %}{% precision_dot item "from" %}{{ item.from_place.city|default:item.from_area.name }}{% else %}<span class="text-faint">&mdash;</span>{% endif %}
              <span class="mx-1 text-faint">&rarr;</span>
              {% if item.to_place or item.to_area %}{% precision_dot item "to" %}{{ item.to_place.city|default:item.to_area.name }}{% else %}<span class="text-faint">&mdash;</span>{% endif %}
            </div>
            {% if not item.from_place and not item.to_place %}<p class="mt-2 font-serif text-sm text-sub">Located to an area only &mdash; no specific place or route is documented.</p>{% endif %}
          {% else %}
            <p class="font-serif text-sm text-sub">No place is recorded for this record.</p>
          {% endif %}
          <p class="mt-3 font-mono text-[11.5px] text-faint">Map view arrives with the spatial explorer.</p>
        </div>
      </section>

      <section>
        <h2 class="lbl mb-3">This record in time</h2>
        {% include "database/_swimlane.html" with timeline=timeline highlight_label="This record highlighted" %}
        <p class="mt-3 font-display text-[14px] text-sub">
          {% if date_certainty == "exact year" %}Fixed to <strong class="text-ink">{{ item.year }}</strong>.{% elif date_certainty == "approximate" %}Dated approximately: <strong class="text-ink">{{ item.year }}</strong>.{% else %}This record has no parseable date.{% endif %}
        </p>
      </section>

      <section>
        <h2 class="lbl mb-3">Images</h2>
        {% with images=item.images.all %}
          {% if images %}
            <div class="space-y-4">
              {% for image in images %}{% if image.is_image_public %}
                <figure class="overflow-hidden rounded-lg border border-rule bg-white">
                  <img src="{{ image.image.url }}" alt="{{ image.alt_text|default:image.caption|default:'' }}" class="w-full">
                  {% if image.caption %}<figcaption class="px-3 py-2 font-mono text-[11.5px] text-sub">{{ image.caption }}</figcaption>{% endif %}
                </figure>
              {% endif %}{% endfor %}
            </div>
          {% else %}
            <div class="rounded-lg border border-dashed border-rule bg-white p-6 text-center font-mono text-[12px] text-faint">No images are available for this record.</div>
          {% endif %}
        {% endwith %}
      </section>

      <section>
        <h2 class="lbl mb-3">Linked items{% if linked_reason %} &middot; {{ linked_reason }}{% endif %}</h2>
        {% if linked %}
          <div class="space-y-3">
            {% for r in linked %}
              <a href="{% url 'textile_single' item_id=r.id %}" class="flex items-start justify-between gap-3 rounded-lg border border-rule bg-white p-4 no-underline hover:shadow-sm">
                <div>
                  <div class="font-display text-[15px] font-semibold text-ink">Record {{ r.id }} &middot; {% with t=r.primary_textile_types.first %}{{ t.name|default:"Context record" }}{% endwith %}</div>
                  <div class="mt-1 font-mono text-[12px] text-sub">{% precision_dot r "from" %}{{ r.from_place.city|default:r.from_area.name|default:"—" }} &middot; {{ r.year|date_display }}</div>
                </div>
                {% circulation_tag r %}
              </a>
            {% endfor %}
          </div>
        {% else %}
          <p class="font-serif text-sm text-faint">No linked items.</p>
        {% endif %}
      </section>
    </aside>
  </div>
{% endblock content %}
```

- [ ] **Step 5: Run the tests, build CSS, run the suite**

Run: `uv run python -m pytest material/tests.py::RecordPageTest -v`
Expected: 3 passed.
Run: `cd theme/static_src && npm run build && cd ../.. && uv run python -m pytest -q`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add templates/database/textile_records_single.html material/views.py material/tests.py
git commit -m "feat(database): Field Notes record page with highlighted swimlane and linked items"
```

---

### Task 8: Visual verification

**Files:** none expected; fixes go to the files above.

- [ ] **Step 1: Build and serve**

Run: `cd theme/static_src && npm run build && cd ../.. && uv run python manage.py runserver 8000` (background).

- [ ] **Step 2: List page**

Open `http://127.0.0.1:8000/database/?djdt=hide` at ~1440px and compare with `design_handoff_connecting_threads/screenshots/04-database_table.png`: header with count and intro, swimlane band with three lanes and axis, navy filter header, seven columns, alternating rows, tags, precision dots, legend and pagination in the footer. Toggle two circulation pills and Apply: the table and the swimlane both update without a full reload. Drag the year slider and Apply: the axis re-scales.

- [ ] **Step 3: Quick-view**

Click a row's quick-view button: a gold-bordered panel appears beneath the row with summary, chips, and both buttons. Collapse removes it. Open two at once; both stay.

- [ ] **Step 4: Record page**

Open a record with keywords (e.g. `/database/5/`) and compare with `05-database_page_item.png`: header, tag and certainty line, three main sections, rail with placeholder space box, compact swimlane with a highlighted bar and gold band, images empty state, linked cards.

- [ ] **Step 5: Narrow width**

At ~700px: filters stack above the table, the table scrolls horizontally, the record rail stacks below main.

- [ ] **Step 6: Fix and commit anything found**

Run: `uv run python -m pytest -q` after any fix.
```bash
git add -A templates/database material static theme/static_src/src
git commit -m "fix(database): visual adjustments after screenshot review"
```
Skip the commit if nothing changed.

---

## Self-review

**Spec coverage:** vocabulary dict (T1), helper with domain/ticks/rows/highlight (T1), partial with header note and highlight label (T3), list page header/swimlane/sidebar/table (T3–T5), multi-select circulation (T5), table columns and cell rules incl. legend and pagination (T4), quick-view row with chips/buttons and 404 for private (T6), record page header/body/rail incl. placeholder, compact highlighted swimlane, images, linked-items rule and reason (T7), modal + JSON endpoint removal (T5, T6), dead template deletion (T4), JS trimming (T5), responsive stacking (T5 grid, T7 grid, T8 check), tests for each unit (T1–T7). No gaps.

**Placeholders:** the "existing Alpine dual slider block goes here" comment in T5 refers to code that already exists in the repo and is to be preserved, not written; the class substitutions are spelled out. No TBDs.

**Consistency:** `build_timeline(records, highlight_id=None, compact=False)` used identically in T3 and T7; `Timeline.band`/`band_width` defined in T1 and consumed in T3's partial; URL names `textile_single`, `textile_quick_view`, `database` used consistently; template tag names `date_display`, `precision_dot`, `circulation_tag` match across T2, T4, T6, T7; context keys `timeline`, `linked`, `linked_reason`, `date_certainty` match T7's view and template.
