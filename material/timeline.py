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


WIDTH, GUTTER, RIGHT_PAD = 1000, 64, 16
COMPACT_WIDTH, COMPACT_GUTTER, COMPACT_RIGHT_PAD = 520, 44, 12
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
    width, gutter, right_pad = (
        (COMPACT_WIDTH, COMPACT_GUTTER, COMPACT_RIGHT_PAD) if compact else (WIDTH, GUTTER, RIGHT_PAD)
    )
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
    plot_w = width - gutter - right_pad

    def x(year):
        return round(gutter + (year - lo) / (hi - lo) * plot_w, 1)

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
        width=width,
        height=axis_y + AXIS_H,
        gutter=gutter,
        axis_y=axis_y,
        placed=len(parsed),
        total=total,
        undated=undated,
        unassigned=unassigned,
        band=band,
        band_width=band_width,
    )
