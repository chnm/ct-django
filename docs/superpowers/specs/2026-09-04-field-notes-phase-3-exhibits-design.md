# Field Notes redesign — Phase 3: exhibit chapter reader

Date: 2026-09-04
Source: `design_handoff_connecting_threads/` (README section 6, screenshots 06–10, `Connecting Threads Exhibits.dc.html`)
Depends on: phases 1–2 on `feat/design-refresh` (tokens, `.lbl`, `.btn-*`, `database_tags`, record page URL `textile_single`)

## Context

The exhibition is four Wagtail `ExhibitHome` chapters, each with `ExhibitPage`
sections as children. The current reader is a full-bleed splash cover, a
per-page layout switch with nine layouts, floating pill buttons (Caption /
View Full Image / Previous / Next / Skip / Take me to the beginning), and a
hidden up-arrow that reveals the site nav. This phase replaces that chrome
with the Field Notes reader: slim top bar, one control bar with progress,
a contents sheet, quiet image controls, and a composed chapter cover.

Decisions made with the user:

- **Tree order is the truth.** A chapter's sections are its live child pages
  in Wagtail tree order. Section numbers, Previous/Next, the progress line,
  and the contents list all derive from it. The manual `link_to_next_page`
  and `link_to_previous_page` fields are no longer read. `link_to_subsection`
  is still honoured (see content parity). The user will fix production tree
  order if it disagrees with reading order.
- **Add two optional fields** to `ExhibitPage`: `phase` (circulation choice,
  tints the section eyebrow) and `related_records` (many-to-many to
  `material.TextileRecord`, renders the "Related database records" block).
- **Content parity is a hard requirement.** Everything the live templates
  render today must still render. See the parity table.
- Images render `object-contain` on a dark mount, not cropped, except the
  cover image. The `*_zoomable` flags are ignored for now; "Full image"
  opens a lightbox with the original rendition.

Local data: chapter 1 ("Madras in South India", 19 sections) has been seeded
from the live site in reading order with real images, captions, layouts,
and two comparison sliders; chapters 2–4 have real titles and cover images
but no sections. Live chapter homes carry no body or citation text today,
but the fields exist and must keep rendering when set.

## Content parity table

| Model field | Rendered today | Rendered after this phase |
|---|---|---|
| `ExhibitHome.title` | splash H1 | cover title, top-bar context label, control bar |
| `ExhibitHome.image` + `image_caption` | splash background (caption unused) | cover image with caption chip |
| `ExhibitHome.hero_text` | CTA button label | "Enter chapter" button label when set, else "Enter chapter →" |
| `ExhibitHome.body` | not rendered | cover intro paragraph (rich text) |
| `ExhibitHome.citation_text` | "Cite this page" toggle | "Cite this chapter" toggle in the contents sheet footer and on the cover |
| `ExhibitHome.next_page` / `previous_page` | "Read Chapter" link, unused | not read; cover links to the first tree child |
| `ExhibitHome.gallery_images`, `tags` | not rendered | unchanged (not rendered) |
| `ExhibitPage.title` | H1 when `display_title` | H2 in the text panel when `display_title`; always in the control bar and contents |
| `ExhibitPage.body` | rich text | rich text, Newsreader |
| `ExhibitPage.image` + `image_caption` | plate + caption panel + full-image modal | plate + caption chip + lightbox |
| `ExhibitPage.image_first_column` / `image_second_column` + captions | two plates (three-column layouts) | gallery wall, two plates, each with its own controls |
| `ExhibitPage.image_comparisons` (+ captions) | `img-comparison-slider` (captions unused) | slider inside the plate; both captions shown in the caption chip as "A / B" |
| `ExhibitPage.layout` (9 values) | nine markup branches | one template, nine grid mappings (below) |
| `ExhibitPage.link_to_subsection` | "Skip to next section" pill | "Skip to {target title} →" link in the control bar, left of Previous, when set |
| `ExhibitPage.link_to_next_page` / `link_to_previous_page` | Previous / Next pills | not read (tree order) |
| `*_zoomable` | unused (no zoom implementation exists) | unchanged |

Nothing is deleted from the models.

## Scope

In:

- Migration adding `ExhibitPage.phase` and `ExhibitPage.related_records`
- `exhibits/reader.py`: `reader_for(page)` returning a `Reader` (below)
- `templates/base_exhibit.html`: reader chrome (top bar, control bar, contents sheet, lightbox)
- `exhibits/templates/exhibits/exhibit_home.html`: cover
- `exhibits/templates/exhibits/exhibit_page.html`: section page with layout mapping
- `exhibits/templates/exhibits/_plate.html`: one image plate with controls, used for single, gallery, comparison, and cover images
- `exhibit_index.html`: unchanged (it is the template for the plain "Exhibits" container page and is not part of the reader)
- Tests for the helper and both page types

Out:

- Deep zoom (`*_zoomable`), the `openseadragon` dependency stays unused
- General pages, concepts, lessons (later)
- Any change to `material` models or the record page
- Removing the manual link fields from the model or admin (a later cleanup once production order is confirmed)

## Data

### Fields (`exhibits/models.py`, migration `0009` or next number)

```python
phase = models.CharField(
    max_length=2, blank=True, choices=TextileRecord.CIRCULATION_CHOICES,
    help_text="Tints this section's eyebrow: Production, Trade & Distribution, or Consumption.",
)
related_records = ParentalManyToManyField(
    "material.TextileRecord", blank=True, related_name="exhibit_sections",
    help_text="Database records to list under this section.",
)
```

Panels: `FieldPanel("phase")` after `layout`; `FieldPanel("related_records")` after `body`, using the default multiple-select widget (an autocomplete chooser is out of scope).

### Helper (`exhibits/reader.py`)

```python
@dataclass
class Section:
    page: ExhibitPage
    number: int        # 1-based
    url: str
    title: str

@dataclass
class Reader:
    home: ExhibitHome
    chapter_number: int     # 1-based position among live ExhibitHome ordered by exhibit_display_order
    chapter_total: int
    sections: list[Section]
    total: int              # len(sections)
    reading_minutes: int    # max(1, round(words / 200)), words over all section bodies (tags stripped)
    current: Section | None # None on the cover
    previous: Section | None
    next: Section | None    # on the cover: the first section
    progress: float         # 0.0 on the cover, number/total otherwise
    previous_chapter: ExhibitHome | None
    next_chapter: ExhibitHome | None

def reader_for(page) -> Reader   # page is an ExhibitHome or an ExhibitPage
```

`sections` = `home.get_children().live().specific()` filtered to
`ExhibitPage`, in tree order. `ExhibitHome.get_context` and
`ExhibitPage.get_context` add `reader = reader_for(self)`.

## Reader chrome (`templates/base_exhibit.html`)

Full-height flex column: `min-h-screen flex flex-col bg-paper`.

- **Stripe** `.stripe`.
- **Top bar** `flex items-center justify-between px-7 py-3 border-b border-rule-2 bg-paper`. Left: mark (22×26 SVG, same rects), wordmark `font-display text-[15px] font-semibold text-navy` linking home, a `h-5 w-px bg-[#e0dacd]` divider, then `.lbl text-faint-2` context label: "Exhibition · Chapter 0N" on the cover, the chapter title on sections. Right: `<a href="/#exhibits">` "Exit exhibition ✕" `font-mono text-[12px] text-label hover:text-madras-red`.
- **Content** `<main class="flex-1 min-h-0">{% block content %}`.
- **Control bar** `relative bg-paper border-t border-rule px-7 py-3.5 grid grid-cols-[1fr_auto_1fr] items-center gap-4`, `sticky bottom-0`. A `2px` progress line on its top edge: `absolute inset-x-0 top-0 h-[2px] bg-[#e9e3d6]` with an inner `bg-madras-red` div at `width: {progress*100}%`. Left: `.lbl` "Section 0N / 0T" (cover: "Chapter 0N of 0T") plus `<a href="/#exhibits" class="font-mono text-[11px] text-madras-red">↺ Start</a>`, then the title `font-display text-[15px] font-semibold text-navy`. Center: `.btn-ghost` "☰ Contents" toggling the sheet. Right: optional "Skip to {title} →" (`font-mono text-[12px] text-sub`), `.btn-ghost` "← Previous" (or "← Previous chapter" on the cover; disabled `opacity-40 pointer-events-none` when none), `.btn-solid` "Next →" (cover: "Begin →"; last section: "Next chapter →" to the next chapter's cover, or "All chapters →" to `/#exhibits` when none).
- **Contents sheet** (Alpine `x-data="{ toc: false, cite: false, lightbox: null }"` on `<body>`): scrim `fixed inset-x-0 top-[60px] bottom-[64px] bg-[rgba(24,28,22,.5)] backdrop-blur-sm z-30` (covers content only), sheet `absolute bottom-0 left-1/2 -translate-x-1/2 w-[860px] max-w-full rounded-t-xl bg-paper p-8`. Header: `.lbl text-madras-red` "Chapter 0N · Contents", H2 chapter title, `.iconbtn` close (×). Body: `grid md:grid-cols-2 gap-x-10 gap-y-1`; each item `font-mono text-[11px] w-6` number + `font-display text-[15px]` title; current = `font-semibold text-navy` with a `bg-madras-red` dot before the title, visited (number < current) = `text-sub`, upcoming = `text-faint`. Footer `flex justify-between border-t border-rule pt-4`: `↺ Take me to the beginning` → `/#exhibits`; `Cite this chapter` (only when `citation_text`, toggles a `font-serif text-sm` block under the footer); `All chapters →` → `/#exhibits`. `@keydown.escape.window` closes; `x-trap` not required (sheet is a navigation aid, not a form); focus moves to the close button on open via `x-effect`.
- **Keyboard**: `@keydown.left.window`/`@keydown.right.window` follow Previous/Next when they exist and no input is focused.
- **Lightbox**: `x-show="lightbox"` fixed overlay `bg-[rgba(15,12,8,.9)]` with the image at `max-h-[90vh] max-w-[92vw] object-contain`, caption in mono under it, close on click, Escape, or the × button. `lightbox` holds the original image URL + caption set by a plate's "Full image" button.
- Head: Google Fonts link, Tailwind CSS, `style.css`, htmx and Alpine script tags, and the Matomo snippet (the current exhibit base omits analytics; reader pages should be tracked like the rest of the site). Font Awesome is dropped here — nothing in the new reader uses it.

## Chapter cover (`exhibit_home.html`)

`grid lg:grid-cols-[1.02fr_1fr] h-full`. Left `flex flex-col justify-center px-16 py-12`: `.lbl text-madras-red` "Chapter 0N · The Exhibition"; H1 `font-display text-[58px] font-semibold leading-none tracking-[-0.025em] text-ink`; `{{ page.body|richtext }}` in `prose font-serif text-[19px] text-sub max-w-[560px]` when set; row: `.btn-solid` "{hero_text or 'Enter chapter'} →" to `reader.next.url` (or `/#exhibits` when the chapter has no sections), `.lbl` "{total} sections · about {reading_minutes} min"; when `citation_text`, a `.lbl` "Cite this chapter" toggle showing the text. Right: the plate partial with `page.image`, `object-cover`, caption chip from `image_caption`.

Top-bar label "Exhibition · Chapter 0N". Control bar: "Chapter 0N of 0T", chapter title, Contents, "← Previous chapter" (to `previous_chapter.url` or disabled), "Begin →".

## Section page (`exhibit_page.html`)

Layout → grid mapping (image side follows the layout name):

| `layout` | Grid | Plates |
|---|---|---|
| `left_image_one_third` / `right_image_one_third` | `lg:grid-cols-[1fr_2fr]` / `[2fr_1fr]` | one plate, full height |
| `left_image_two_thirds` / `right_image_two_thirds` | `[1.7fr_1fr]` / `[1fr_1.7fr]` | one plate, full height |
| `half_and_half` | `[1fr_1fr]` | one plate |
| `three_column_images_left` / `_right` | `[1.55fr_1fr]` / `[1fr_1.55fr]` | gallery wall `bg-[#f4f1ea] p-8` holding two plates `grid grid-cols-2 gap-5`, each with `shadow-md` |
| `wide_image` / `full_screen` | stacked: plate `max-h-[62vh]` then text in `max-w-[720px] mx-auto px-8 py-10` | one plate |

If a layout expects an image that is missing, the plate column collapses and the text fills the row. If `image_comparisons` exist they replace the single plate (first comparison only, as today). Under `lg` every layout stacks: plate(s) then text.

Text panel `flex flex-col justify-center px-10 py-12 lg:px-14` (`overflow-y-auto` so long bodies scroll inside the stage): eyebrow `.lbl` "Section 0N · {phase label}" when `phase` is set, tinted by `phase_for(page.phase).text_class`, else "Section 0N · {chapter title}" in `text-label`; H2 title when `display_title` (`font-display text-[40px] font-semibold tracking-[-0.02em] text-navy`, 30px in the gallery layout); body `prose prose-p:font-serif prose-p:text-[17px] prose-p:leading-[1.62] prose-a:underline prose-a:decoration-[#c7c0b0] prose-a:underline-offset-[3px] prose-em:italic max-w-none`; related records block when `related_records.exists`: `.lbl text-madras-gold` "Related database records", cards `border border-rule bg-white rounded-lg p-4` with `.lbl` "Entry no. {id}" and `font-serif text-navy` first line of `summary_of_record` (truncated to 120 chars) linking to `textile_single`.

## Plate partial (`exhibits/_plate.html`)

Params: `image` (Wagtail image), `caption`, `fit` ("cover" | "contain", default contain), `comparison` (optional `ImageComparison`), `figure_number` (int, optional).

```
<figure class="relative h-full bg-[#2b2620]" x-data="{ cap: false }">
  {% if comparison %} <img-comparison-slider> two originals {% else %} {% image image width-1600 as r %}<img src="{{ r.url }}" alt="{{ image.title }}" class="h-full w-full object-{fit}"> {% endif %}
  <div class="absolute right-4 top-4 flex gap-2"> (.imgctl) Caption (toggle cap, aria-pressed) · Full image ↗ (sets $root lightbox) </div>
  <figcaption x-show="cap" class="absolute bottom-4 left-4 rounded bg-[rgba(15,12,8,.74)] backdrop-blur px-3 py-2 font-mono text-[11.5px] text-[#f2ede0]">FIG. {n} — {caption}</figcaption>
</figure>
```

`.imgctl` in the theme stylesheet: `font-mono text-[11px] text-[#f2ede0] bg-[rgba(22,30,40,.6)] backdrop-blur rounded px-2.5 py-1.5 hover:bg-[rgba(22,30,40,.85)]`. The Caption button is hidden when there is no caption. Comparison captions render as "{first} / {second}". Renditions: `width-1600` for plates, `original` for the lightbox. `img-comparison-slider` script and CSS stay on the jsDelivr URLs used today, loaded only when a comparison is present.

## Responsive

Under `lg`: top bar keeps mark + wordmark + Exit; context label hides. Section grids stack. Control bar collapses to two rows: counter + title, then Skip/Previous/Next; Contents button moves to the second row. Sheet is full-width with `rounded-t-xl`.

## Testing

- `exhibits/test_reader.py`: `reader_for` on a chapter with three sections — numbering, previous/next at both ends, progress, chapter number/total across two chapters, reading time floor of 1, cover `current is None` and `next` is the first section, empty chapter.
- `exhibits/tests.py`: cover renders "Chapter 01 of 02", "3 sections", the Enter link to section 1, citation toggle only when set; section page renders "Section 02 / 03", phase-tinted eyebrow class when `phase="pr"`, neutral otherwise, related-records card with the record id and a link to `textile_single`, "Skip to" link only when `link_to_subsection` is set, contents list with all three titles and the current-state dot, disabled Previous on section 1, "Next chapter →" on the last section when another chapter exists; `display_title=False` omits the H2 but the control bar still shows the title; comparison slider markup when a comparison exists.
- Manual: walk the seeded chapter 1 (`/exhibits/madras-in-south-india/` then Begin) comparing against screenshots 06–10; open Contents; open a Full image; check a three-column page and a wide-image page; check under `lg`.

## Files touched

- `exhibits/models.py`, `exhibits/migrations/000N_exhibitpage_phase_related_records.py`
- `exhibits/reader.py` (new), `exhibits/test_reader.py` (new), `exhibits/tests.py`
- `templates/base_exhibit.html`
- `exhibits/templates/exhibits/exhibit_home.html`, `exhibit_page.html`, `_plate.html` (new)
- `theme/static_src/src/styles.css` (`.imgctl`, `.iconbtn`)
