# CV Site Improvements v2 — Design Spec

**Date:** 2026-05-03
**Goal:** Make the site more impressive and human to pharma/medicinal chemistry recruiters who arrive via a link in the PDF CV.
**Scope:** Three self-contained improvements to the existing plain HTML/CSS/JS site. No new files, no frameworks, no build step.

---

## Feature 1: Centred Hero with Glowing Avatar

### What
Redesign the hero section (`#about`) from its current side-by-side grid layout to a centred column layout, with a circular glowing avatar above the name.

### Avatar
- Circle, ~96px diameter
- Border: 1.5px solid, accent blue at ~70% opacity
- Box shadow: outer glow `0 0 24px rgba(44,95,138,0.4)` + inner glow `inset 0 0 20px rgba(44,95,138,0.15)`
- Content: initials "SL" in accent blue, font-weight 300, ~1.4rem
- Designed to be swapped for a real `<img>` (circular crop via `border-radius: 50%; object-fit: cover`) when a photo is available

### Layout
- All hero content (avatar, eyebrow, h1, location, bio, buttons) centred horizontally
- Bio text max-width ~560px to keep line length readable
- The existing `.hero-meta` stat block (Predicted / Year / Focus) is **removed** from the hero — those stats move to Feature 2

### Files affected
- `index.html` — restructure `.hero-inner` contents
- `style.css` — update `.hero-inner` grid to single centred column, add `.avatar` styles

---

## Feature 2: Sticky Key Facts Sidebar (Right Margin)

### What
A slim panel fixed to the right of the content column on wide screens, always visible as the recruiter scrolls. Hidden on screens narrower than 1100px.

### Content (top to bottom)
| Label | Value |
|-------|-------|
| Predicted | 2:1 |
| Year | 3 / 4 |
| Focus | Med. Chem. |
| Available | 2027 |
| Location | Derby, UK |

"Predicted" is the most visually prominent — displayed in accent blue at larger size. Others in muted white, smaller.

### Positioning
- `position: fixed`, `top: 50%`, `transform: translateY(-50%)`, right-aligned just outside the content column
- Separated from content by a thin vertical line: `1px solid rgba(44,95,138,0.15)`
- Hidden via `display: none` inside `@media (max-width: 1100px)`

### Files affected
- `index.html` — add `<aside class="key-facts">` inside `<body>` (outside `<main>`)
- `style.css` — add `.key-facts` fixed positioning, label/value styles, responsive hide

---

## Feature 3: Dissertation Card in Research Section

### What
A second card in the existing `#research` section, below the porphyrins internship card.

### Card content
- **Eyebrow label:** `Final Year Dissertation · Literature Review`
- **Title:** Opioids: Investigating Alternative Analgesic Mechanisms & Novel OUD Treatments
- **Date badge:** 2026
- **Institution:** Loughborough University · MChem Medicinal & Pharmaceutical Chemistry
- **Summary:** A narrative review critically evaluating selective Nav channel inhibitors (Nav1.7/1.8) as non-opioid analgesics, and pharmacotherapeutic strategies for opioid use disorder.
- **Tags:** Nav1.7 / Nav1.8 · Opioid Use Disorder · Clinical Trial Analysis · Analgesic Pharmacology · Lofexidine · XR-NTX · BUP-XR

### Card style
Same `.card` class as the porphyrins card. No new CSS needed — reuses existing card, eyebrow, badge, and tag styles.

### Files affected
- `index.html` — add second card inside `#research .stagger`

---

## What is NOT changing
- Dark/light theme toggle
- Nav bar
- All other sections (Education, Experience, Skills, Contact)
- Print stylesheet
- OG/SEO meta tags
- LinkedIn / copy-to-clipboard features

---

## Success criteria
- A recruiter arriving from the PDF CV link sees a face (avatar) within 1 second
- Key stats (grade, year, availability) are visible without scrolling on wide screens
- Dissertation work is findable in the Research section with enough context to be meaningful
- Site remains fully functional on mobile (sidebar hidden, hero centred looks good at 375px+)
