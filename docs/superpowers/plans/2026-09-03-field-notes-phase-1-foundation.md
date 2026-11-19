# Field Notes Phase 1 (Foundation, Chrome, Homepage) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Land the Field Notes design tokens, the new site nav and footer, and the redesigned homepage without breaking the pages later phases restyle.

**Architecture:** Tokens go into the existing django-tailwind theme config plus a small `@layer` stylesheet for the handful of things utilities can't express (stripe, label, buttons, plaid tiles). `base.html` gets a static light nav and a navy footer, and loses the absolute-positioned hero band. `index.html` is rewritten inside its existing full-width `index` block, fed by two new context values from the `index` view.

**Tech Stack:** Django 6 templates, Wagtail 7 (`{% image %}`, `ExhibitHome`), Tailwind CSS 3.4 via django-tailwind (`theme/static_src`), Google Fonts, pytest-django.

**Spec:** `docs/superpowers/specs/2026-09-03-field-notes-phase-1-foundation-design.md`

## Global Constraints

- Old palette names (`madras-teal`, `madras-indigo`, `madras-earth`, `madras-mustard`, `primary-*`, `secondary-*`, `accent-*`, `supporting-*`, `neutral-*`) stay in `tailwind.config.js`. Only `madras-red` changes value, to `#9c3a2e`.
- No "Explore" nav link and no explorer teaser section. Those are phase 4.
- Footer omits "Spatial explorer", "How to cite", "Open data & API".
- Stat strip span is the literal string `18th–19th c.` (en dash). Partners is the literal `6`.
- Funder logos appear only in the white bar on the homepage, never in the navy footer.
- Keep the `index`, `exhibit`, `content`, `css`, `extrahead`, `extrajs`, `body_class`, `title` blocks in `base.html`. Remove `nav_hero` and `nav_class`.
- Fonts: Space Grotesk (500, 600), Newsreader (400, 400 italic), IBM Plex Mono (500, 600) from Google Fonts.
- Run tests with `uv run python -m pytest`. Build CSS with `cd theme/static_src && npm run build`. Dev server with `uv run python manage.py runserver`.
- Every commit message ends with:
  ```
  Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01G3Wtr5UtiqmvbDKSRf3NLt
  ```

---

## File map

| File | Responsibility |
|---|---|
| `theme/static_src/tailwind.config.js` | Color and font tokens (modify) |
| `theme/static_src/src/styles.css` | `@layer base` body defaults; `@layer components` for `.stripe`, `.stripe-footer`, `.lbl`, `.btn-solid`, `.btn-ghost`, `.plaid-1..4` (modify) |
| `templates/base.html` | Font links, nav, footer, content container (modify) |
| `templates/partials/nav_link.html` | One nav link with active-state logic; used by desktop and mobile menus (create) |
| `templates/index.html` | Homepage sections (rewrite) |
| `material/views.py` | `index` adds `record_count`; new default snippet title (modify) |
| `material/tests.py` | `IndexViewTest`, `SiteChromeTest` (modify) |
| `static/img/hero-dolls.jpg` | Hero image copied from the handoff (create) |

---

### Task 1: Design tokens, fonts, and base stylesheet

**Files:**
- Modify: `theme/static_src/tailwind.config.js`
- Modify: `theme/static_src/src/styles.css`
- Modify: `templates/base.html:8-11` (font links only; the rest of the file changes in Task 2)

**Interfaces:**
- Produces Tailwind utilities `bg-paper`, `bg-paper-2`, `bg-paper-3`, `border-rule`, `border-rule-2`, `text-ink`, `text-navy`, `bg-navy`, `border-navy-2`, `text-sub`, `text-faint`, `text-faint-2`, `text-label`, `text-madras-red`, `text-madras-gold`, `text-madras-green`, `bg-tag-red`, `bg-tag-gold`, `bg-tag-green`, `border-ghost-border`, `font-display`, `font-serif`, `font-mono`.
- Produces component classes `.stripe`, `.stripe-footer`, `.lbl`, `.btn-solid`, `.btn-ghost`, `.plaid-1`, `.plaid-2`, `.plaid-3`, `.plaid-4`.

- [ ] **Step 1: Add tokens to the Tailwind config**

In `theme/static_src/tailwind.config.js`, replace the `fontFamily` block and add the new colors above the existing `"madras-red"` line. Change `"madras-red"` to the new hex. Final `theme` section:

```js
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', "system-ui", "sans-serif"],
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        serif: ['"Newsreader"', "Georgia", "serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        // Field Notes system (2026 redesign)
        paper: "#fbfaf7",
        "paper-2": "#f8f5ee",
        "paper-3": "#faf8f2",
        rule: "#e4dfd3",
        "rule-2": "#e7e2d6",
        ink: "#1a1a1a",
        navy: "#20303f",
        "navy-2": "#33475a",
        sub: "#5b5b52",
        faint: "#9a978c",
        "faint-2": "#9a857f",
        label: "#8a857a",
        "madras-gold": "#9a7328",
        "madras-green": "#3a6b52",
        "tag-red": "#f6ece9",
        "tag-gold": "#f4efe3",
        "tag-green": "#eef3ef",
        "ghost-border": "#cfc8b8",

        // Legacy palette — still used by database, exhibit, concepts, lessons
        // templates until their redesign phase lands. Do not remove yet.
        "madras-red": "#9c3a2e",
        "madras-mustard": "#E0A15A",
        "madras-teal": "#3A6B78",
        "madras-indigo": "#1F2933",
        "madras-earth": "#8B5D33",
```

Leave everything from `primary:` down unchanged.

- [ ] **Step 2: Write the base stylesheet**

Replace the whole of `theme/static_src/src/styles.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-paper text-ink font-display antialiased;
  }
}

@layer components {
  .stripe {
    height: 4px;
    background: linear-gradient(90deg, #9c3a2e 0 22%, #9a7328 22% 46%, #3a6b52 46% 68%, #20303f 68% 100%);
  }
  .stripe-footer {
    height: 4px;
    background: linear-gradient(90deg, #9c3a2e 0 22%, #9a7328 22% 46%, #3a6b52 46% 68%, #c9c2b4 68% 100%);
  }
  .lbl {
    @apply font-mono text-[10.5px] font-semibold uppercase tracking-[.14em] text-label;
  }
  .btn-solid {
    @apply inline-block rounded-md bg-navy px-[22px] py-[13px] font-display text-sm font-semibold text-paper no-underline hover:bg-[#2b3f52];
  }
  .btn-ghost {
    @apply inline-block rounded-md border border-ghost-border bg-transparent px-[22px] py-[13px] font-display text-sm font-semibold text-navy no-underline hover:bg-paper-2;
  }

  /* CSS madras plaid tiles — fallbacks for region cards without an image. */
  .plaid-1 {
    background-color: #8a2f2c;
    background-image:
      repeating-linear-gradient(90deg, rgba(0,0,0,.28) 0 6px, transparent 6px 26px, rgba(212,160,60,.85) 26px 30px, transparent 30px 40px),
      repeating-linear-gradient(0deg, rgba(0,0,0,.28) 0 6px, transparent 6px 26px, rgba(240,232,214,.7) 26px 30px, transparent 30px 40px);
  }
  .plaid-2 {
    background-color: #2f5a4a;
    background-image:
      repeating-linear-gradient(90deg, rgba(0,0,0,.25) 0 5px, transparent 5px 22px, rgba(158,51,39,.7) 22px 27px, transparent 27px 36px),
      repeating-linear-gradient(0deg, rgba(0,0,0,.25) 0 5px, transparent 5px 22px, rgba(240,232,214,.6) 22px 27px, transparent 27px 36px);
  }
  .plaid-3 {
    background-color: #26324a;
    background-image:
      repeating-linear-gradient(90deg, rgba(0,0,0,.3) 0 7px, transparent 7px 30px, rgba(240,232,214,.55) 30px 34px, transparent 34px 46px),
      repeating-linear-gradient(0deg, rgba(0,0,0,.3) 0 7px, transparent 7px 30px, rgba(240,232,214,.55) 30px 34px, transparent 34px 46px);
  }
  .plaid-4 {
    background-color: #b06a1e;
    background-image:
      repeating-linear-gradient(90deg, rgba(0,0,0,.22) 0 5px, transparent 5px 18px, rgba(58,107,82,.7) 18px 23px, transparent 23px 34px),
      repeating-linear-gradient(0deg, rgba(0,0,0,.22) 0 5px, transparent 5px 18px, rgba(158,51,39,.7) 18px 23px, transparent 23px 34px);
  }
}
```

- [ ] **Step 3: Swap the font link in `base.html`**

Replace lines 8–11 of `templates/base.html` (the Google Fonts comment through the Noto Sans `<link>`) with:

```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600&family=Newsreader:ital,wght@0,400;1,400&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet">
```

- [ ] **Step 4: Build the CSS and verify the classes exist**

Run: `cd theme/static_src && npm run build && cd ../..`
Expected: exits 0, writes `theme/static/css/dist/styles.css`.

Run: `grep -c -E '\.(stripe|lbl|btn-solid|btn-ghost|plaid-4)\b' theme/static/css/dist/styles.css`
Expected: a number ≥ 5 (the component classes are emitted even before templates use them because `@layer components` rules with explicit selectors are always kept).

Run: `grep -o 'IBM Plex Mono' theme/static/css/dist/styles.css | head -1`
Expected: `IBM Plex Mono`

- [ ] **Step 5: Run the existing tests to confirm nothing broke**

Run: `uv run python -m pytest -q`
Expected: all pass (16 tests).

- [ ] **Step 6: Commit**

```bash
git add theme/static_src/tailwind.config.js theme/static_src/src/styles.css templates/base.html
git commit -m "feat(theme): add Field Notes tokens, fonts, and base component classes"
```

---

### Task 2: Site chrome — nav and footer in `base.html`

**Files:**
- Modify: `templates/base.html` (body section, lines 38–128)
- Create: `templates/partials/nav_link.html`
- Test: `material/tests.py`

**Interfaces:**
- Consumes: classes from Task 1.
- Produces: `templates/partials/nav_link.html` with parameters `href` (string) and `label` (string) and optional `mobile` (truthy). Later phases' pages inherit this chrome automatically by extending `base.html`.

- [ ] **Step 1: Write the failing chrome test**

Append to `material/tests.py`:

```python
class SiteChromeTest(TestCase):
    """base.html nav and footer render on any page that extends it."""

    def test_about_crawler_page_has_new_chrome(self):
        response = self.client.get("/about/crawler/")
        self.assertEqual(response.status_code, 200)
        html = response.content.decode()
        self.assertIn("Fashioning Madras in India &amp; the Caribbean", html)
        self.assertIn("Supported by", html)
        self.assertNotIn("CT_Exhibition_Opening_Image", html)
        # Launch Event moved out of the nav into the footer's Project column.
        self.assertEqual(html.count("Launch Event"), 1)
```

- [ ] **Step 2: Run it to verify it fails**

Run: `uv run python -m pytest material/tests.py::SiteChromeTest -v`
Expected: FAIL on the tagline assertion (the old nav has no tagline).

- [ ] **Step 3: Create the nav link partial**

Create `templates/partials/nav_link.html`:

```html
{# Usage: {% include "partials/nav_link.html" with href="/database/" label="Database" %} #}
{# Pass mobile=True for the stacked mobile menu. Active when the path equals href, or starts with it for non-root links. #}
{% with n=href|length %}
{% if href == "/" %}{% if request.path == "/" %}{% firstof "on" as on %}{% endif %}{% elif request.path|slice:n == href %}{% firstof "on" as on %}{% endif %}
<a href="{{ href }}"
   {% if href|slice:":4" == "http" %}target="_blank" rel="noopener"{% endif %}
   class="{% if mobile %}block px-3 py-2 text-base{% else %}pb-1 border-b-2 text-sm{% endif %} font-display {% if on %}font-semibold text-navy {% if not mobile %}border-madras-red{% endif %}{% else %}font-medium text-[#3a3a34] border-transparent hover:text-navy{% endif %}"
   {% if on %}aria-current="page"{% endif %}>{{ label }}</a>
{% endwith %}
```

- [ ] **Step 4: Replace the body of `base.html`**

Replace everything from `<body class="{% block body_class %}{% endblock %}">` through `</footer>` (lines 38–128) with:

```html
  <body class="{% block body_class %}{% endblock %}">
    <div class="stripe"></div>
    <nav class="bg-paper border-b border-rule-2">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-[76px] items-center justify-between">
          <a href="{% url 'index' %}" class="flex items-center gap-4 no-underline">
            <svg width="30" height="34" viewBox="0 0 30 34" aria-hidden="true"><rect x="7" y="0" width="3.4" height="34" fill="#9c3a2e"/><rect x="13" y="0" width="3.4" height="34" fill="#9a7328"/><rect x="19" y="0" width="3.4" height="34" fill="#3a6b52"/><rect x="0" y="14.5" width="30" height="3" fill="#20303f"/></svg>
            <span class="flex flex-col gap-0.5">
              <span class="font-display text-[19px] font-semibold tracking-[-0.01em] text-navy">Connecting Threads</span>
              <span class="lbl tracking-[.1em] text-faint-2">Fashioning Madras in India &amp; the Caribbean</span>
            </span>
          </a>

          <div class="hidden sm:flex items-center gap-6">
            {% include "partials/nav_link.html" with href="/" label="Home" %}
            {% include "partials/nav_link.html" with href="/database/" label="Database" %}
            {% include "partials/nav_link.html" with href="/lessons/" label="Lesson Plans" %}
            {% include "partials/nav_link.html" with href="https://www.zotero.org/groups/5683082/connecting_threads._bibliography/library" label="Bibliography" %}
            {% include "partials/nav_link.html" with href="/concepts/" label="Concepts" %}
            {% include "partials/nav_link.html" with href="/about/" label="About" %}
          </div>

          <button type="button"
                  class="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-navy hover:bg-paper-2"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onclick="document.getElementById('mobile-menu').classList.toggle('hidden')">
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      <div class="sm:hidden hidden border-t border-rule-2 bg-paper" id="mobile-menu">
        <div class="space-y-1 px-4 py-3">
          {% include "partials/nav_link.html" with href="/" label="Home" mobile=True %}
          {% include "partials/nav_link.html" with href="/database/" label="Database" mobile=True %}
          {% include "partials/nav_link.html" with href="/lessons/" label="Lesson Plans" mobile=True %}
          {% include "partials/nav_link.html" with href="https://www.zotero.org/groups/5683082/connecting_threads._bibliography/library" label="Bibliography" mobile=True %}
          {% include "partials/nav_link.html" with href="/concepts/" label="Concepts" mobile=True %}
          {% include "partials/nav_link.html" with href="/about/" label="About" mobile=True %}
        </div>
      </div>
    </nav>

    {# The index page does not use the container #}
    {% block index %}{% endblock index %}

    {# The exhibit pages do not use the container #}
    {% block exhibit %}{% endblock exhibit %}

    <div class="container mx-auto py-8 px-4 md:px-8">
      <main>{% block content %} {% endblock content %}</main>
    </div>

    <footer class="mt-12 bg-navy text-[#e7e6e0]">
      <div class="stripe-footer"></div>
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-3">
              <svg width="26" height="30" viewBox="0 0 30 34" aria-hidden="true"><rect x="7" y="0" width="3.4" height="34" fill="#e0705a"/><rect x="13" y="0" width="3.4" height="34" fill="#e6b45a"/><rect x="19" y="0" width="3.4" height="34" fill="#6fcf9b"/><rect x="0" y="14.5" width="30" height="3" fill="#c9c2b4"/></svg>
              <span class="font-display text-lg font-semibold text-white">Connecting Threads</span>
            </div>
            <p class="max-w-[300px] font-serif text-sm leading-relaxed text-[#aab2bd]">A collaborative digital history of the Madras handkerchief and the people who made and wore it.</p>
          </div>
          <div class="flex flex-col gap-2.5">
            <div class="lbl text-[#8f9bb0]">Explore</div>
            <a href="/#exhibits" class="font-display text-sm text-[#dfe2e6] hover:text-white">Exhibition</a>
            <a href="{% url 'database' %}" class="font-display text-sm text-[#dfe2e6] hover:text-white">Database</a>
            <a href="/concepts/" class="font-display text-sm text-[#dfe2e6] hover:text-white">Concepts</a>
          </div>
          <div class="flex flex-col gap-2.5">
            <div class="lbl text-[#8f9bb0]">Project</div>
            <a href="/about/" class="font-display text-sm text-[#dfe2e6] hover:text-white">About</a>
            <a href="/lessons/" class="font-display text-sm text-[#dfe2e6] hover:text-white">Lesson Plans</a>
            <a href="https://www.zotero.org/groups/5683082/connecting_threads._bibliography/library" class="font-display text-sm text-[#dfe2e6] hover:text-white">Bibliography</a>
            <a href="/events/" class="font-display text-sm text-[#dfe2e6] hover:text-white">Launch Event</a>
          </div>
          <div class="flex flex-col gap-2.5">
            <div class="lbl text-[#8f9bb0]">Connect</div>
            <a href="/about/" class="font-display text-sm text-[#dfe2e6] hover:text-white">Contact the team</a>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-navy-2 py-5">
          <span class="lbl text-[#8f9bb0]">Supported by</span>
          <div class="flex flex-wrap items-center gap-x-5 gap-y-2 font-display text-[13px] font-medium text-[#c3cad3]">
            <a href="https://www.neh.gov" class="hover:text-white">National Endowment for the Humanities</a><span class="text-[#4a5c6e]">·</span>
            <a href="https://www.ukri.org/councils/ahrc/" class="hover:text-white">AHRC / UKRI</a><span class="text-[#4a5c6e]">·</span>
            <a href="https://rrchnm.org" class="hover:text-white">Roy Rosenzweig Center · GMU</a><span class="text-[#4a5c6e]">·</span>
            <span>University of Edinburgh</span><span class="text-[#4a5c6e]">·</span>
            <span>V&amp;A</span>
          </div>
        </div>

        <p class="pb-8 pt-2 font-mono text-xs leading-relaxed text-[#7f8a97]">
          Connecting Threads is generously funded in part by the National Endowment for the Humanities and the Arts &amp; Humanities Research Council, and developed by the Roy Rosenzweig Center for History and New Media at George Mason University. &copy; 2024&ndash;{% now "Y" %}.
        </p>
      </div>
    </footer>
```

Keep the `{% block extrajs %}`, `</body>`, `</html>` lines that follow.

- [ ] **Step 5: Run the chrome test**

Run: `uv run python -m pytest material/tests.py::SiteChromeTest -v`
Expected: PASS.

- [ ] **Step 6: Rebuild CSS and run the full suite**

Run: `cd theme/static_src && npm run build && cd ../.. && uv run python -m pytest -q`
Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add templates/base.html templates/partials/nav_link.html material/tests.py
git commit -m "feat(chrome): Field Notes nav and footer in base.html"
```

---

### Task 3: Homepage view context

**Files:**
- Modify: `material/views.py:17-48` (the `index` function)
- Test: `material/tests.py`

**Interfaces:**
- Produces context keys `record_count` (int, public records only) and `exhibits` (unchanged queryset of live public `ExhibitHome`), consumed by Task 4.

- [ ] **Step 1: Write the failing view test**

Append to `material/tests.py`:

```python
class IndexViewTest(TestCase):
    def test_index_counts_only_public_records(self):
        TextileRecord.objects.create(year="1750", is_public=True)
        TextileRecord.objects.create(year="1760", is_public=False)
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "index.html")
        self.assertEqual(response.context["record_count"], 1)
```

- [ ] **Step 2: Run it to verify it fails**

Run: `uv run python -m pytest material/tests.py::IndexViewTest -v`
Expected: FAIL with `KeyError: 'record_count'`.

- [ ] **Step 3: Add the context value and the new default headline**

In `material/views.py`, inside `index`, change the default snippet title in the `create(...)` call and the fallback dict from `"Connecting Threads"` to `"Following a checked cloth across an ocean"` (two places). Then replace the final `return render(...)` with:

```python
    return render(
        request,
        "index.html",
        {
            "exhibits": exhibits,
            "about_snippet": about_snippet,
            "record_count": TextileRecord.objects.filter(is_public=True).count(),
        },
    )
```

- [ ] **Step 4: Run the test**

Run: `uv run python -m pytest material/tests.py::IndexViewTest -v`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add material/views.py material/tests.py
git commit -m "feat(home): expose public record count to the homepage"
```

---

### Task 4: Homepage template

**Files:**
- Rewrite: `templates/index.html`
- Create: `static/img/hero-dolls.jpg` (copy of `design_handoff_connecting_threads/prototypes/assets/hero-dolls.jpg`)
- Test: `material/tests.py` (extend `IndexViewTest`)

**Interfaces:**
- Consumes: `record_count`, `exhibits`, `about_snippet` from Task 3; classes from Task 1; chrome from Task 2.

- [ ] **Step 1: Extend the view test with markup assertions**

Add to `IndexViewTest` in `material/tests.py`:

```python
    def test_index_renders_field_notes_sections(self):
        response = self.client.get("/")
        html = response.content.decode()
        self.assertIn('id="exhibits"', html)
        self.assertIn("Explore the story by region", html)
        self.assertIn("18th&ndash;19th c.", html)
        self.assertIn("hero-dolls.jpg", html)
        self.assertIn("neh-logo.jpg", html)  # funder logo bar
        self.assertNotIn("ct.js", html)  # carousel script dropped
```

- [ ] **Step 2: Run it to verify it fails**

Run: `uv run python -m pytest material/tests.py::IndexViewTest -v`
Expected: `test_index_renders_field_notes_sections` FAILS on "Explore the story by region".

- [ ] **Step 3: Copy the hero image**

Run: `cp "design_handoff_connecting_threads/prototypes/assets/hero-dolls.jpg" static/img/hero-dolls.jpg`

- [ ] **Step 4: Rewrite `templates/index.html`**

Replace the entire file with:

```html
{% extends 'base.html' %}
{% load static wagtailcore_tags wagtailimages_tags %}

{% block title %}Connecting Threads{% endblock title %}

{% block index %}
  {# ---------- Hero ---------- #}
  <section class="grid border-b border-rule-2 lg:grid-cols-[1.05fr_1fr]">
    <div class="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-14 lg:py-16">
      <div class="lbl mb-4">Digital exhibition &amp; research database</div>
      <h1 class="max-w-[640px] font-display text-[40px] font-semibold leading-[1.02] tracking-[-0.02em] text-ink lg:text-[52px]">{{ about_snippet.title }}</h1>
      <div class="prose prose-p:my-0 mt-5 max-w-[520px] font-serif text-lg leading-[1.62] text-[#45443d]">
        {{ about_snippet.content|safe }}
      </div>

      <dl class="my-8 flex max-w-[520px] flex-wrap gap-8 border-y border-rule py-5">
        <div class="flex flex-col gap-0.5">
          <dd class="font-display text-[22px] font-semibold text-navy">18th&ndash;19th c.</dd>
          <dt class="lbl">span</dt>
        </div>
        <div class="flex flex-col gap-0.5">
          <dd class="font-display text-[22px] font-semibold text-navy">{{ record_count }}</dd>
          <dt class="lbl">records</dt>
        </div>
        <div class="flex flex-col gap-0.5">
          <dd class="font-display text-[22px] font-semibold text-navy">{{ exhibits|length }}</dd>
          <dt class="lbl">regions</dt>
        </div>
        <div class="flex flex-col gap-0.5">
          <dd class="font-display text-[22px] font-semibold text-navy">6</dd>
          <dt class="lbl">partners</dt>
        </div>
      </dl>

      <div class="flex flex-wrap gap-3">
        {% with first=exhibits|first %}
          <a href="{% if first %}{{ first.url }}{% else %}#exhibits{% endif %}" class="btn-solid">Enter the exhibition</a>
        {% endwith %}
        <a href="{% url 'database' %}" class="btn-ghost">Explore the collection &rarr;</a>
      </div>
    </div>

    <div class="relative min-h-[360px] bg-[#2b2620] lg:min-h-[560px]">
      <img src="{% static 'img/hero-dolls.jpg' %}" alt="Three dolls in madras dress" class="absolute inset-0 h-full w-full object-cover object-[50%_30%]">
      <div class="absolute bottom-6 left-6 rounded bg-[rgba(15,12,8,.74)] px-3 py-2 font-mono text-[11.5px] text-[#f2ede0] backdrop-blur">FIG. 1 &mdash; Creole dolls in madras dress, French Caribbean, 19th c. &middot; V&amp;A</div>
    </div>
  </section>

  {# ---------- Regions ---------- #}
  <section id="exhibits" class="mx-auto max-w-7xl px-6 py-14 lg:px-8">
    <h2 class="mb-8 font-display text-[34px] font-semibold tracking-[-0.015em] text-ink">Explore the story by region</h2>
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {% for exhibit in exhibits %}
        <a href="{{ exhibit.url }}" class="block overflow-hidden rounded-lg border border-rule bg-white no-underline transition-shadow hover:shadow-md">
          {% if exhibit.image %}
            {% image exhibit.image fill-640x420 class="h-[150px] w-full object-cover" %}
          {% else %}
            <div class="h-[150px] plaid-{{ forloop.counter }}"></div>
          {% endif %}
          <div class="px-4 pb-5 pt-4">
            <div class="lbl mb-1.5 {% cycle 'text-madras-red' 'text-madras-green' 'text-navy' 'text-madras-gold' %}">Chapter {{ forloop.counter|stringformat:"02d" }}</div>
            <div class="font-display text-[17px] font-semibold text-navy">{{ exhibit.title }}</div>
            {% if exhibit.hero_text %}
              <div class="mt-1.5 font-mono text-[13px] text-faint-2">{{ exhibit.hero_text }}</div>
            {% endif %}
          </div>
        </a>
      {% endfor %}
    </div>
  </section>

  {# ---------- What's inside ---------- #}
  <section class="border-t border-rule">
    <div class="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3 lg:px-8">
      <a href="#exhibits" class="flex flex-col gap-2 no-underline">
        <div class="lbl text-madras-red">01 / Exhibition</div>
        <div class="font-display text-[19px] font-semibold text-navy">A guided visual story</div>
        <p class="font-serif text-[15px] leading-[1.55] text-[#55544c]">Four chapters trace Madras from South Indian looms to Caribbean dress and back into European fashion.</p>
      </a>
      <a href="{% url 'database' %}" class="flex flex-col gap-2 no-underline">
        <div class="lbl text-madras-gold">02 / Database</div>
        <div class="font-display text-[19px] font-semibold text-navy">{{ record_count }} object &amp; archive records</div>
        <p class="font-serif text-[15px] leading-[1.55] text-[#55544c]">Examined 2022&ndash;2024, filterable by type, place, circulation and date &mdash; with uncertainty kept visible.</p>
      </a>
      <a href="/lessons/" class="flex flex-col gap-2 no-underline">
        <div class="lbl text-madras-green">03 / Lesson Plans</div>
        <div class="font-display text-[19px] font-semibold text-navy">Five classroom units</div>
        <p class="font-serif text-[15px] leading-[1.55] text-[#55544c]">Open-access guidance for educators using the project&rsquo;s research and materials.</p>
      </a>
    </div>
  </section>

  {# ---------- Funder logos ---------- #}
  <section class="border-t border-rule bg-white">
    <div class="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <div class="lbl mb-6 text-center">Supported by</div>
      <div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        <a href="https://www.neh.gov"><img src="{% static 'img/neh-logo.jpg' %}" alt="National Endowment for the Humanities" class="h-14 w-auto"></a>
        <a href="https://www.ukri.org/councils/ahrc/"><img src="{% static 'img/ukri-ahrc-square-logo.png' %}" alt="Arts and Humanities Research Council" class="h-16 w-auto"></a>
        <a href="https://rrchnm.org"><img src="{% static 'img/rrchnm-logo.png' %}" alt="Roy Rosenzweig Center for History and New Media" class="h-14 w-auto"></a>
        <img src="{% static 'img/gmu-logo.png' %}" alt="George Mason University" class="h-14 w-auto">
        <img src="{% static 'img/edinburgh-logo.png' %}" alt="University of Edinburgh" class="h-14 w-auto">
        <img src="{% static 'img/va-red.png' %}" alt="V&amp;A Museum" class="h-16 w-auto">
      </div>
    </div>
  </section>
{% endblock index %}
```

Notes for the implementer:
- `{% block index %}` content sits above the empty `content` container in `base.html`; the container renders as an empty `div` with padding, which is how the current homepage works too. The footer's `mt-12` then follows. That is acceptable for this phase.
- `{% cycle %}` inside `{% for %}` resets per loop, so chapter colors line up with card order.
- The old `exhibit.title != "Exhibits"` guard is intentionally dropped; the view already queries `ExhibitHome` only.

- [ ] **Step 5: Run the tests**

Run: `uv run python -m pytest material/tests.py::IndexViewTest -v`
Expected: both tests PASS.

- [ ] **Step 6: Rebuild CSS and run the full suite**

Run: `cd theme/static_src && npm run build && cd ../.. && uv run python -m pytest -q`
Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add templates/index.html static/img/hero-dolls.jpg material/tests.py
git commit -m "feat(home): Field Notes homepage — hero, region cards, what's inside, funder logos"
```

---

### Task 5: Visual verification and dev data

**Files:**
- No source changes expected. Local dev database gets its snippet title updated.

- [ ] **Step 1: Point the local snippet at the new headline**

Run:
```bash
uv run python manage.py shell -c "
from exhibits.models import HomeAboutSnippet
s = HomeAboutSnippet.objects.first()
s.title = 'Following a checked cloth across an ocean'
s.save(); print(s.title)"
```
Expected: prints the new title.

- [ ] **Step 2: Start the dev server**

Run: `uv run python manage.py runserver 8000` (background).
Expected: serves on http://127.0.0.1:8000/.

- [ ] **Step 3: Check the homepage against the screenshots**

Open http://127.0.0.1:8000/ at ~1440px wide and compare with `design_handoff_connecting_threads/screenshots/01-homepage_hero.png` and `03-homepage_exhibits_links_and_footer.png`. Check specifically:
- stripe above the nav, wordmark + tagline left, six links right, Home underlined in red
- hero grid with image right and caption chip
- stat strip with four values
- four region cards with images (or plaid fallbacks) and colored chapter labels
- white logo bar, then navy footer with stripe, four columns, Supported by row, mono fine print

Take a screenshot with a browser tool or the `run` skill if available and keep it in the scratchpad for the review step.

- [ ] **Step 4: Check the untouched pages still render**

Open http://127.0.0.1:8000/database/ and http://127.0.0.1:8000/exhibits/exhibit-1/textiles/. Expected: both render with the new nav and footer, their bodies still in the old palette, no content hidden under the nav and no large blank gap at the top.

- [ ] **Step 5: Fix anything found, re-run tests, commit**

Any fix goes in the file it belongs to from Tasks 1–4. Then:

Run: `uv run python -m pytest -q`
Expected: all pass.

```bash
git add -A templates theme/static_src material static/img
git commit -m "fix(home): visual adjustments after screenshot review"
```

Skip the commit if nothing changed.

---

## Self-review

**Spec coverage:** tokens (T1), fonts (T1), base layer incl. stripe/lbl/buttons/plaid (T1), nav with active state and no Explore (T2), Launch Event to footer (T2), footer columns and Supported by row and fine print (T2), hero band and `mt-28` removed (T2), hero with editable headline and stat strip (T3+T4), region cards with image/plaid fallback (T4), what's inside (T4), funder logo bar (T4), default snippet title (T3), tests (T2–T4), manual verification (T5). Responsive stacking is via the `md:`/`lg:` grid utilities in T2 and T4. No gaps.

**Placeholders:** none.

**Consistency:** `record_count` is the same key in T3 and T4. `nav_link.html` parameters `href`, `label`, `mobile` match every include. Class names in T4 (`btn-solid`, `btn-ghost`, `lbl`, `plaid-N`, `stripe-footer`) all defined in T1.
