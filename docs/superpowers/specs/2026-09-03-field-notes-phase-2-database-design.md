# Field Notes redesign — Phase 2: database list, quick-view, record page, swimlane

Date: 2026-09-03
Source: `design_handoff_connecting_threads/` (README sections 3–4, screenshots 04–05, `Connecting Threads Field Notes.dc.html` Database and Record screens)
Depends on: phase 1 (tokens, chrome, `.lbl`, `.btn-*`, `main` block) — merged on `feat/design-refresh`

## Context

Phase 1 landed the Field Notes tokens and site chrome. This phase brings the
Textiles Database list, a new inline quick-view that replaces the record
modal, and the full record page into the system, and introduces the
swimlane timeline as a reusable server-rendered SVG. The explorer, the map
inset, and timeline brushing are phase 4.

Decisions already made with the user:

- Records with no circulation phase (205 of 432) appear in the table with a
  grey "Unassigned" tag and are **left out of the swimlane**. The band header
  states how many records are placed.
- The record page's "This record in space" slot is a **placeholder** until
  phase 4: origin and destination as text with precision dots, plus a mono
  note that the map arrives with the explorer.
- The swimlane's year axis **follows the current filtered result set**,
  rounded outward to decades. No fixed range, no "outside range" count.

Data facts that shape the build (local database, 432 public records):

- `year` is a free-text string. `material.filters.extract_year_range` parses
  413 of them to a `(start, end)` span; 19 are unparseable and are omitted
  from the swimlane (counted in the header note). Parsed spans run 600–2022.
- 298 records have a plain four-digit year string; everything else counts as
  approximate.
- `id_manual` is null for 431 records, so the visible record number is the
  database `id`.
- 2 records have crosslinks; 223 have keywords. Linked items come from
  crosslinks first, then shared keywords.
- 1 record has a public image.
- No `Place` has coordinates yet; precision is inferred from whether
  `from_place`/`to_place` is set at all, not from coordinates.

## Scope

In:

- `material/timeline.py`: pure-Python helper that turns records into swimlane rows
- `templates/database/_swimlane.html`: SVG partial, used by the list page and the record page
- `templates/database/textiles.html`: list page rewrite (header, swimlane band, filter sidebar, table container)
- `material/tables.py` + `templates/database/textile_table.html` + cell partials: new columns and Field Notes styling
- `templates/database/_quick_view.html` + a `quick_view` view + URL: inline expansion
- `templates/database/textile_records_single.html`: record page rewrite
- `material/templatetags/database_tags.py`: `date_display`, `precision_dot`, `circulation_tag`
- Removal of the modal: its markup in `textiles.html`, `openModal`/`closeModal` in `static/js/database.js`, the `record_details` JSON view and URL
- Deletion of the unreferenced `templates/database/textile_records_list.html` and `theme/templates/database.html`
- Responsive stacking for the list page (filters above the table under `lg`) and the record page (rail below main under `lg`)
- Tests for the timeline helper, the template tags, the quick-view view, the list view context, and the record page

Out:

- Map inset, gazetteer, geocoding (phase 4)
- Timeline brushing and any explorer JS (phase 4)
- "Cite", "Share", "Open data" actions on the record page (no targets yet; omit the buttons)
- Changing filter semantics or the `TextileFilter` class beyond what the sidebar needs
- Removing legacy palette names (final phase)

## Circulation vocabulary

`TextileRecord.CIRCULATION_CHOICES` maps `pr` → Production (green), `td` →
Trade & Distribution (gold), `co` → Consumption (red). Null → "Unassigned"
(grey, `text-sub` on `bg-paper-2`). A single dict in `material/timeline.py`
is the source of truth for code → label, short label (PROD/TRAD/CONS), text
color token, tag background token, and SVG hex, so tags, lanes, and pills
never drift.

## Swimlane component

### Data (`material/timeline.py`)

```python
@dataclass
class Bar:
    record_id: int
    start: int
    end: int
    nominal: int          # start of the span; the dot sits here
    approximate: bool     # True unless year string is a plain 4-digit year
    phase: str            # "pr" | "td" | "co"

@dataclass
class Timeline:
    lanes: dict[str, list[Bar]]   # keys "pr", "td", "co" in that order
    domain: tuple[int, int]       # (lo, hi) rounded outward to decades
    placed: int                   # bars drawn
    total: int                    # records considered
    undated: int                  # records with unparseable year
    unassigned: int               # records with no phase

def build_timeline(records, highlight_id=None) -> Timeline
```

- `records` is an iterable of `TextileRecord` already filtered and
  `values`-light (only `id`, `year`, `circulation` are read).
- Domain: `lo = floor(min start / 10) * 10`, `hi = ceil(max end / 10) * 10`;
  if `hi - lo < 50`, widen symmetrically to 50 years so a single-decade
  result still draws an axis. Empty input → domain `(1700, 1900)` and zero
  bars.
- Ticks: every 100 years if the domain exceeds 300 years, else every 50,
  else every 10; always include `lo` and `hi`.
- `highlight_id` is passed through to the template so the record page can
  emphasise one bar; the helper does not reorder.

### Rendering (`templates/database/_swimlane.html`)

Inclusion partial taking `timeline`, optional `highlight_id`, optional
`compact` (record page).

- Wrapper: `border border-rule rounded-lg bg-white`. Header row: `.lbl`
  "Records over time · by circulation" left; right, `.lbl` in `text-faint`
  reading "{placed} of {total} records placed by circulation · {undated}
  undated" (omit the undated clause when 0). On the record page the right
  label reads "This record highlighted".
- SVG `viewBox="0 0 1000 H"` with `width="100%"`, `H = 60 + 3 × laneHeight`
  where `laneHeight` is 44 (28 when `compact`). Left gutter 64px holds the
  lane labels (PROD / TRAD / CONS, mono 11px, phase color). Lanes separated
  by `#efe9dc` rules. Axis ticks at the bottom in mono 11px `text-faint`
  with `#e4dfd3` gridlines.
- Bar: `<line>` from `x(start)` to `x(end)` at the lane's row, stroke phase
  hex, width 2. Approximate bars get 1px end-caps (short vertical lines) at
  both ends. A `<circle r="3">` at `x(nominal)`. Bars in the same lane are
  spread across up to 3 sub-rows by `index % 3` to reduce overlap (the
  prototype does the same).
- Highlight: when `highlight_id` matches, that bar's stroke width is 3 and a
  translucent band (`fill="#9a7328" opacity=".08"`) spans its date range
  across all lanes; every other bar gets `opacity=".25"`.
- Each bar carries a `<title>` "Record {id} · {year string}" for hover, and
  is wrapped in `<a href="/database/{id}/">` on the list page. No other
  interactivity in this phase.

### Where it renders

- List page: above the filters + table, built from the **filtered**
  queryset (the same queryset the table paginates, before pagination). It
  lives inside the htmx swap target so filter changes re-render it with the
  table.
- Record page: in the rail, built from all public records with
  `highlight_id=item.id`, `compact=True`.

## List page (`templates/database/textiles.html`)

Extends `base.html`, uses `content`. Layout inside the container:

1. **Header** `grid lg:grid-cols-[1fr_1fr] gap-8 items-end mb-8`. Left:
   `.lbl` "{total} records", H1 "Textiles Database"
   (`font-display font-semibold text-[40px] tracking-[-0.02em] text-ink`).
   Right: intro paragraph `font-serif text-[17px] text-sub max-w-[560px]`,
   copy: "Object and archival records of Madras textiles. Date ranges and
   location precision are shown for every row, so you can see what we
   know—and what we don't."
2. **Swap target** `div.table-container` (existing htmx target name) now
   holds the swimlane partial followed by the table. `single_table.html`
   (the htmx response) renders both; it receives `timeline` from the view.
3. **Two columns** `grid lg:grid-cols-[280px_1fr] gap-6`:
   - **Filters** `<aside>`: `border border-rule rounded-lg bg-white
     overflow-hidden`; header `bg-navy text-paper font-display font-medium
     px-5 py-3` "Search filters" with the existing mobile toggle button on
     the right (hidden `lg:`). Body `p-5 space-y-5`. Each control: `.lbl`
     label above, then the control. Controls, in order: Year range (the
     existing Alpine dual slider, restyled: track `bg-rule`, fill `bg-navy`,
     handles `bg-white border border-navy`), Primary textile type (select),
     Secondary textile type (select, dependent, existing JS), Circulation
     (three toggle pills as `<label>`s wrapping hidden checkboxes named
     `circulation` — see filter note), From area, To area, Source type
     (selects), Keyword / text (`text_search` input). Footer: `.btn-solid`
     "Apply filters" + `.btn-ghost text-madras-red` "Reset". Selects and the
     input use `rounded-[5px] border border-[#d8d3c6] bg-white px-3 py-2
     font-display text-[13.5px]`.
   - **Table** column.

Filter note: `TextileFilter.circulation` is a `CharFilter` with
`icontains`. The pills submit a single value each; to allow multi-select
the filter becomes `MultipleChoiceFilter(choices=CIRCULATION_CHOICES)` with
`lookup_expr="in"`. Reset clears all fields via the existing `resetForm`.

## Table (`material/tables.py`, `templates/database/textile_table.html`)

Columns and template partials:

| Column | Partial | Renders |
|---|---|---|
| Preview (74px) | `database/cells/preview.html` | `h-[30px] w-[42px] rounded object-cover` thumbnail if a public image exists; else a `border border-dashed border-rule bg-paper-2` box |
| Date (96px) | `database/cells/date.html` | `{{ record.year|date_display }}` |
| Textile type | existing `textile_type.html` restyled | names stacked, `font-display text-[14px]`; "Context record" in `text-faint` when none |
| Subtype | existing `textile_subtype.html` | as today |
| Origin → Destination | `database/cells/route.html` | `{% precision_dot record 'from' %} {{ from name }} → {% precision_dot record 'to' %} {{ to name }}`; missing side renders `—` in `text-faint` |
| Circulation (150px) | `database/cells/circulation.html` | `{% circulation_tag record %}` |
| Actions (78px) | `database/cells/actions.html` | quick-view button (`hx-get` the quick-view URL, `hx-target="closest tr"`, `hx-swap="afterend"`) and an "open" link to the record page, both `text-faint hover:text-navy` glyph buttons with `aria-label`s |

Styling in `textile_table.html` (overriding the tables2 template blocks):
table `w-full border-collapse font-display text-[13.5px]`; header row
`bg-[#f4f1ea]` with `.lbl` cells `px-4 py-3`; body rows alternate
`bg-white` / `bg-paper-3`, hover `bg-[#f6f3ec]`, `border-t border-[#efe9dc]`;
cells `px-4 py-3 align-middle`. The existing htmx sort/pagination
attributes are kept; pagination controls restyle to `.btn-ghost`-like pills
with the current page in `bg-navy text-paper`. A legend row under the table
(`.lbl` items: filled dot "located place", dashed ring "area only", dotted
gold "approximate date") sits left of the pagination.

## Template tags (`material/templatetags/database_tags.py`)

- `date_display(year_str)` → safe HTML. Plain four-digit string →
  `<span class="font-mono">1748</span>`. Empty → `<span class="font-mono
  text-faint">—</span>`. Otherwise → `<span class="font-mono text-madras-gold
  border-b border-dotted border-[#c9a24a]">{year_str}</span>` with the
  string escaped. Whitespace-trimmed before testing.
- `precision_dot(record, side)` (inclusion tag, `side` in `{"from","to"}`)
  → `<span class="inline-block h-[9px] w-[9px] rounded-full …" aria-hidden>`
  filled with the record's phase color when `record.<side>_place` is set,
  dashed ring (`border-[1.5px] border-dashed`) in the phase color when only
  `<side>_area` is set, nothing when neither. Phase color falls back to
  `text-sub`/`border-sub` for unassigned records.
- `circulation_tag(record)` (inclusion tag) → `<span class="inline-flex
  rounded px-2 py-1 font-mono text-[11.5px] font-semibold {tag bg} {text
  color}">{label}</span>`; label from `get_circulation_display` or
  "Unassigned".

## Quick-view (`quick_view` view, `templates/database/_quick_view.html`)

- URL `database/<int:item_id>/quick-view/`, name `textile_quick_view`,
  public records only (404 otherwise). Returns the partial with `item`.
- Partial is a single `<tr class="quick-view">` with one `<td colspan="7">`:
  `bg-paper-2 border-l-[3px] border-madras-gold px-8 py-6`. Inside: `.lbl`
  in `text-madras-gold` "Quick view · Record {id} · {year}"; summary in
  `font-serif text-[17px] text-ink max-w-[880px]` (or "No summary is
  available for this record." in `text-faint`); a chip row (`font-mono
  text-[12px] border border-rule bg-white rounded px-2 py-1`) for
  Circulation, Source, first primary subject, first keyword, and "Place:
  area only" in `text-madras-red bg-tag-red` when neither place is set;
  then `.btn-solid` "Open full record →" linking to the record page and a
  `.btn-ghost` "Collapse" button with `onclick="this.closest('tr').remove()"`.
- Opening a second row while one is open is allowed; each is independent.
  The action button does not toggle to `−` (the prototype's flourish);
  Collapse lives in the panel. Keyboard: the button is a real `<button>`,
  the inserted row starts with a focusable Collapse control, no focus trap.

## Record page (`templates/database/textile_records_single.html`)

Extends `base.html`, uses `content`. View `textile_records_single` gains
context: `timeline` (all public records, `highlight_id=item.id`),
`linked` (see rule), `date_certainty` ("exact year" or "approximate").

1. **Header** (`border-b border-rule pb-6 mb-8`): `← Return to database`
   link (`font-display text-madras-red`); `.lbl` "Database record · ID
   {id}"; H1 "Record {id}" (`font-display font-semibold text-[40px]`);
   fact line: circulation tag, then mono `{year} · {date_certainty}`, then
   `| Context record · no attached textile` when no primary textile type.
   The `archive` provenance notice, when present, stays as a `.lbl`-headed
   note under the fact line linking to the crawler page. No Cite / Share /
   Open data buttons.
2. **Body** `grid lg:grid-cols-[1.55fr_1fr] gap-10`, with `lg:border-r
   lg:border-rule lg:pr-10` on the main column.
   - **Main**: sections each headed by `.lbl` in `text-madras-red`:
     *Summary* (`font-serif text-[18px]`), *Record excerpt* (blockquote
     `font-serif italic border-l-[3px] border-madras-gold bg-[#faf6ec] px-6
     py-5`, source line right-aligned italic `text-faint`; "No transcription
     available." when empty), *Item metadata* — a `grid md:grid-cols-2
     border border-rule rounded-lg` where each cell has `.lbl` + value
     (`font-display text-[15px]`), cells: Primary textile types, Secondary
     textile types, Primary subjects, Secondary subjects, Keywords,
     Circulation, Source type, Year, then a full-width Reference cell
     (`md:col-span-2`, `font-serif italic`). Empty values read "None
     specified" in `text-faint`; textile types read "No textiles attached
     (context record)" when both are empty.
   - **Rail** (`bg-paper-3 rounded-lg p-6 space-y-8`):
     - *This record in space*: `.lbl`, then a `border border-dashed
       border-rule rounded-lg bg-white p-4`: route line as in the table
       (precision dots + names), and a `font-mono text-[11.5px] text-faint`
       line "Map view arrives with the spatial explorer." When neither area
       nor place is set: "No place is recorded for this record."
     - *This record in time*: `.lbl`, the swimlane partial (`compact`),
       then a `font-display text-[14px] text-sub` sentence "Fixed to
       {year}." for exact years or "Dated approximately: {year}." otherwise;
       "This record has no parseable date." when undated.
     - *Images*: `.lbl`, figures with captions (`font-mono text-[11.5px]`)
       when public images exist; else the dashed empty box with "No images
       are available for this record." in mono `text-faint`.
     - *Linked items*: `.lbl` "Linked items · {reason}" where reason is
       "crosslinked" or "shares keyword “{kw}”"; cards `bg-white border
       border-rule rounded-lg p-4` with `font-display font-semibold`
       "Record {id} · {first textile type or 'Context record'}", a mono line
       with precision dot + from-place-or-area + `·` + date, and the
       circulation tag right-aligned. Up to 4 cards. When none: "No linked
       items." in `text-faint`.

Linked items rule: `item.crosslinks` (public only) first; if fewer than 4,
fill with public records sharing the record's first keyword, excluding
itself, ordered by `id`. Reason label reflects the source of the first
card.

## Views and URLs (`material/views.py`, `config/urls.py`)

- `TextileTableView.get_context_data` adds `timeline =
  build_timeline(self.object_list)` (the filtered queryset before
  pagination; `FilterView` exposes it as `self.object_list`). `single_table.html`
  renders `_swimlane.html` then the table.
- New `quick_view(request, item_id)` as above.
- `textile_records_single` adds `timeline`, `linked`, `linked_reason`,
  `date_certainty`, and restricts to `is_public=True`.
- Remove `record_details` and its URL. Rename the `textile_single` URL
  comment from "modal view" to "record page".

## JavaScript (`static/js/database.js`)

Delete `openModal`, `closeModal`, and `scrollPosition`. Keep the mobile
filter toggle, the dependent secondary-type loader, keyword fuzzy search
(if still wired; delete if the sidebar no longer has the keyword select),
and `resetForm`. The year slider stays in `textiles.html` as Alpine.

## Responsive

- List page: under `lg` the filter aside stacks above the table; the
  existing mobile toggle collapses its body. The table scrolls horizontally
  inside `overflow-x-auto` with a `min-w-[900px]` table.
- Record page: under `lg` the rail stacks below main, no border.
- The swimlane scales with `width="100%"`; lane labels stay legible down to
  ~640px because the viewBox is fixed.

## Testing

- `material/tests.py` (or a new `material/test_timeline.py`):
  `build_timeline` — exact vs approximate, span from "ca. 1855-1879",
  unparseable year counted as undated, null phase counted as unassigned and
  not placed, domain rounding and the 50-year minimum, empty input.
- Template tags: `date_display` for plain, approximate, empty; `circulation_tag`
  label for each code and for null.
- Views: quick-view returns 200 with a `<tr` for a public record and 404 for
  a private one; list page context contains `timeline` and the htmx
  partial contains the swimlane header; record page 200 shows "Record {id}",
  the placeholder sentence, and linked-items fallback by keyword.
- Manual: compare `/database/` to screenshot 04 and a record page to 05;
  expand a quick-view; filter by circulation and year and confirm the
  swimlane re-renders; check under `lg` width.

## Files touched

- `material/timeline.py` (new)
- `material/templatetags/database_tags.py` (new)
- `material/tables.py`, `material/filters.py`, `material/views.py`, `config/urls.py`
- `templates/database/textiles.html`, `single_table.html`, `textile_table.html`, `textile_records_single.html`
- `templates/database/_swimlane.html`, `_quick_view.html`, `cells/{preview,date,route,circulation,actions}.html` (new)
- `templates/database/textile_type.html`, `textile_subtype.html`, `image_display.html` (restyle or delete)
- `templates/database/textile_records_list.html`, `theme/templates/database.html` (delete)
- `static/js/database.js`
- `material/tests.py`
