# Field Notes redesign — Phase 1: foundation, site chrome, homepage

Date: 2026-09-03
Source: `design_handoff_connecting_threads/` (README + screenshots 01–03 + `Connecting Threads Field Notes.dc.html`)

## Context

The Claude Design handoff delivers a "Field Notes" visual system for the whole
site. It is being built in four phases, in this order:

1. **Foundation, site chrome, homepage** (this spec)
2. Database list with inline quick-view, and the full record page (includes the swimlane SVG component)
3. Exhibits chapter reader: top bar, control bar, contents sheet, restyled layouts
4. Spatial–chronological explorer: gazetteer, JSON endpoint, map + brushable timeline; adds the "Explore" nav item and the homepage explorer teaser

Each phase gets its own spec and plan. Phase 1 must not break the pages the
later phases restyle: they keep rendering with the old palette until their
phase lands.

## Scope

In:

- Tailwind theme tokens (colors, fonts) and a small base-layer stylesheet
- Google Fonts load for Space Grotesk, Newsreader, IBM Plex Mono
- `templates/base.html`: new nav, new footer, removal of the hero band and the top margin hack
- `templates/index.html`: hero, region cards, "What's inside" strip, funder logo bar
- `material.views.index`: adds record count and region count to context
- One view test for the homepage

Out (later phases or never):

- Explorer teaser section on the homepage and the "Explore" nav link (phase 4)
- Any restyling of database, record, exhibit, concepts, lessons, about pages
- Removing the old palette names (`madras-teal`, `primary-*`, `secondary-*`, `accent-*`, `supporting-*`, `neutral-*`) — done in the last phase once nothing references them
- Responsive breakpoints beyond what the existing mobile menu already handles; the design is desktop-first at 1440px, and pages stack with plain Tailwind `md:`/`lg:` grid utilities

## Design tokens

Added to `theme/static_src/tailwind.config.js` under `theme.extend`. Old names are left in place.

Colors:

| Name | Hex | Use |
|---|---|---|
| `paper` | `#fbfaf7` | page background, nav bar |
| `paper-2` | `#f8f5ee` | sunken sections |
| `paper-3` | `#faf8f2` | alternating rows, rails |
| `rule` | `#e4dfd3` | borders |
| `rule-2` | `#e7e2d6` | nav bottom rule |
| `ink` | `#1a1a1a` | primary text |
| `navy` | `#20303f` | headings accent, footer bg, primary buttons |
| `navy-2` | `#33475a` | footer divider |
| `sub` | `#5b5b52` | secondary text |
| `faint` | `#9a978c` | muted labels |
| `faint-2` | `#9a857f` | tagline, footer fine print |
| `label` | `#8a857a` | `.lbl` color |
| `madras-red` | `#9c3a2e` | accent / Consumption |
| `madras-gold` | `#9a7328` | accent / Trade |
| `madras-green` | `#3a6b52` | accent / Production |
| `tag-red` | `#f6ece9` | Consumption pill bg |
| `tag-gold` | `#f4efe3` | Trade pill bg |
| `tag-green` | `#eef3ef` | Production pill bg |
| `ghost-border` | `#cfc8b8` | ghost button border |

Note: `madras-red` already exists with a different hex (`#DEB3A0`). It is
overwritten. It is referenced in `base.html` (footer border, replaced by this
phase) and in `exhibit_page.html` (a close button). The exhibit close button
changes hue but stays legible; phase 3 replaces it anyway.

Fonts:

| Name | Stack |
|---|---|
| `display` | `"Space Grotesk", system-ui, sans-serif` |
| `serif` | `"Newsreader", Georgia, serif` |
| `mono` | `"IBM Plex Mono", ui-monospace, monospace` |
| `sans` | becomes the same stack as `display` |

Base layer in `theme/static_src/src/styles.css` (`@layer base` / `@layer components`):

- `body`: `bg-paper text-ink font-display antialiased`
- `.stripe`: `height:4px; background:linear-gradient(90deg,#9c3a2e 0 22%,#9a7328 22% 46%,#3a6b52 46% 68%,#20303f 68% 100%)`
- `.lbl`: `font-mono text-[10.5px] font-semibold uppercase tracking-[.14em] text-label`
- `.btn-solid`: navy fill, white text, `rounded-md`, Space Grotesk 500
- `.btn-ghost`: transparent, `border-ghost-border`, ink text, same shape
- `.plaid-1` … `.plaid-4`: the four CSS plaid tiles from the prototype (red, green, navy, gold), used as fallbacks for region cards without an image

## Site chrome (`templates/base.html`)

Remove:

- the `nav_hero` block and the dark image band
- the `nav_class` block; the nav is no longer absolute or white-on-dark
- `mt-28` on the content container
- the Noto Sans font link

Keep:

- the `index`, `exhibit`, `content`, `css`, `extrahead`, `extrajs`, `body_class`, `title` blocks
- htmx, Alpine, Font Awesome, Matomo, `static/css/style.css`
- the mobile menu button and its `onclick` toggle

Nav:

- `.stripe` on top, then a `bg-paper border-b border-rule-2` bar, inner width `max-w-7xl`, height ~72px
- Left: inline SVG loom-cross mark (four `<rect>`s: red, gold, green vertical + navy horizontal, ~30×34) linking home, then the wordmark "Connecting Threads" (`font-display font-semibold text-[19px] text-navy`) with the tagline "Fashioning Madras in India & the Caribbean" beneath in `.lbl` colored `text-faint-2`
- Right: Home, Database, Lesson Plans, Bibliography (Zotero, external), Concepts, About. `font-display font-medium text-sm text-[#3a3a34]`. Active link: `font-semibold text-navy` with a 2px `madras-red` bottom border. Active = `request.path` equals the link path, or starts with it for `/database/`, `/lessons/`, `/concepts/`.
- Launch Event leaves the nav and moves to the footer.
- Mobile menu: same links, `bg-paper`, stacked.

Footer:

- `.stripe`, then `bg-navy text-white`
- Row 1, four columns (`grid md:grid-cols-[1.4fr_1fr_1fr_1fr]`): wordmark + mark + one-line description ("A collaborative digital history of the Madras handkerchief and the people who made and wore it."); **Explore**: Exhibition (`/#exhibits`), Database, Concepts; **Project**: About, Lesson Plans, Bibliography, Launch Event; **Connect**: Contact the team (`/about/`). Column headings use `.lbl` in `text-faint-2`. Links are `font-display text-[15px]`. "Spatial explorer", "How to cite", and "Open data & API" from the design are omitted because they have no target yet.
- Divider `border-t border-navy-2`
- Row 2: `.lbl` "Supported by" then six funder names as text separated by `·`: National Endowment for the Humanities · AHRC / UKRI · Roy Rosenzweig Center · GMU · University of Edinburgh · V&A. Each links to its site where a URL exists in the current footer.
- Row 3: `font-mono text-[11.5px] text-faint-2` funding statement (existing copy) + `© 2024–{current year}`.

## Homepage (`templates/index.html`)

The page keeps `{% extends 'base.html' %}` and puts everything in `{% block index %}` so it renders full-width, as today. Remove the `nav_class` and `nav_hero` overrides and the carousel script include (`static/js/ct.js` is unused by the new page; the file is left alone).

Sections, top to bottom:

1. **Hero.** `grid lg:grid-cols-[1.05fr_1fr]`, `border-b border-rule`.
   - Left, `px-16 py-20`: `.lbl` eyebrow "Digital exhibition & research database"; H1 in `font-display font-semibold text-[52px] leading-[1.05] tracking-[-0.02em] text-ink` from `about_snippet.title`; intro from `about_snippet.content|safe` inside `prose font-serif text-[18px] text-sub`; stat strip `border-y border-rule py-5` with four items each a `font-display text-[28px]` value over a `.lbl` label: **span** "18th–19th c.", **records** `{{ record_count }}`, **regions** `{{ exhibits|length }}`, **partners** "6"; then buttons: `.btn-solid` "Enter the exhibition" → first exhibit's URL (falls back to `/#exhibits`), `.btn-ghost` "Explore the collection →" → `{% url 'database' %}`.
   - Right: hero image `static/img/hero-dolls.jpg` (copied from the handoff assets) `object-cover h-full min-h-[560px]`, with a caption chip bottom-left: `font-mono text-[11.5px] text-[#f2ede0] bg-[rgba(15,12,8,.74)] backdrop-blur px-3 py-2` reading "FIG. 1 — Creole dolls in madras dress, French Caribbean, 19th c. · V&A".
   - The editable snippet's default title in `material.views.index` changes to "Following a checked cloth across an ocean" so a fresh install matches the design. Existing databases keep whatever title editors set; the local dev DB is updated by hand.
2. **Regions** (`id="exhibits"`, the anchor existing links target). Heading "Explore the story by region" in `font-display font-semibold text-[34px] text-ink`. `grid md:grid-cols-2 lg:grid-cols-4 gap-6`. Each card: `bg-white border border-rule rounded-lg overflow-hidden`; top tile `h-52`: `{% image exhibit.image fill-640x420 %}` if set, else `.plaid-N` where N = `forloop.counter`; body `p-5`: `.lbl` "Chapter 0N" in a per-chapter accent (`text-madras-red`, `text-madras-green`, `text-navy`, `text-madras-gold`), title `font-display font-semibold text-[19px] text-ink`, and `exhibit.hero_text` in `font-mono text-[12px] text-faint` if present. Whole card is the link. The `exhibit.title != "Exhibits"` guard is dropped; the view already filters to `ExhibitHome`.
3. **What's inside.** `border-t border-rule`, `grid md:grid-cols-3 gap-12 px-16 py-16`. Three items: `.lbl` index in `text-madras-red` / `text-madras-gold` / `text-madras-green` ("01 / Exhibition", "02 / Database", "03 / Lesson Plans"), a `font-display font-semibold text-[26px]` heading ("A guided visual story", "{{ record_count }} object & archive records", "Five classroom units"), and a `font-serif text-[17px] text-sub` line each, copy per screenshot 03. Each item links to its section.
4. **Funder logo bar.** New, not in the design. `bg-white border-t border-rule py-10`: `.lbl` "Supported by" centered, then the six existing PNG logos from `static/img/` in a wrapping flex row, `h-12` to `h-16` each, grayscale-free, same alt text as today. This satisfies the funder logo requirement without putting dark logos on the navy footer.

## View change (`material/views.py`, `index`)

Add to context: `record_count = TextileRecord.objects.filter(is_public=True).count()`. `exhibits` is unchanged. Default snippet title updated as above.

## Testing

`material/tests.py` gains `IndexViewTest`: creates two `TextileRecord`s, one public, one not; GETs `/`; asserts 200, that the response uses `index.html`, and that the record count "1" appears in the stat strip context (`response.context["record_count"] == 1`).

Manual verification: `make tailwind` (or `npm run build` in `theme/static_src`) then `make preview`, compare `/` against screenshots 01 and 03, and load `/database/` and one exhibit page to confirm they still render with the old palette and no layout regression from removing the nav offset.

## Files touched

- `theme/static_src/tailwind.config.js`
- `theme/static_src/src/styles.css`
- `templates/base.html`
- `templates/index.html`
- `material/views.py`
- `material/tests.py`
- `static/img/hero-dolls.jpg` (new, copied from handoff)
