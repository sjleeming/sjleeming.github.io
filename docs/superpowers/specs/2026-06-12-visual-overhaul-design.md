# Visual Overhaul — Design Spec

**Date:** 2026-06-12
**Project:** sjleeming.github.io (Sam Leeming CV website)
**Scope:** Complete visual redesign. Content unchanged.

## Goal

Replace the current centred single-column dark/terminal aesthetic with a refined dark "molecular" design in a fixed-sidebar layout. Same six sections, same text, same plain HTML/CSS/JS stack, same deploy flow (git push to main).

## Visual Direction

**Refined Dark / Molecular** (user-selected from four mockups):

- Background: deep navy radial/linear gradients (e.g. `#13243a` → `#090e18`), not flat black
- Cards: glassy surfaces (`#101b2e`-ish) with thin `#1e3149` borders, soft radius (~10px), subtle hover lift/glow
- Accent: blue→violet gradient (`#3aa7e0` → `#7b6cf6`) for primary buttons/highlights; light blue `#6fd3ff` for labels, nav active states, and line-art
- Headline treatment: white→pale-blue gradient text for the name
- Decorative: subtle molecule line-art (SVG hexagons/bonds/atoms) drifting slowly in the sidebar background, low opacity
- Typography: clean sans (Segoe UI/system stack or a Google font like Inter) for body; small uppercase letter-spaced labels for eyebrows/section labels. IBM Plex Mono may be dropped or retained only for small labels — implementer's choice for best fit.

## Themes

- **Dark is default.** A matching **light theme** is required, switched via a toggle in the sidebar.
- Light theme: same structure and accents adapted to a light navy-on-pale palette (cool whites/very light blue-greys, same blue→violet accent, borders and glows softened).
- Theme choice persists in `localStorage` (as today). Respect `prefers-color-scheme` on first visit.

## Layout

### Desktop (≳ 900px)

- **Fixed left sidebar, ~38% width, full height:**
  - Avatar circle with glow (initials "SL", as now)
  - Name (gradient headline), eyebrow "MChem · Medicinal & Pharmaceutical Chemistry", one-line location/dates
  - Short bio (the existing hero bio text)
  - Vertical section nav (Education, Research, Experience, Skills, Contact) with active-state indicator driven by scroll-spy
  - Gradient "Download CV" pill button (links to existing `Samuel_Leeming_CV.pdf`)
  - Contact shortcuts (email, phone, LinkedIn)
  - Theme toggle
  - Animated molecule line-art in the background, low opacity
- **Scrolling right column, ~62%:** sections in order — Education, Research, Experience, Skills, Contact. Numbered section headings retained (01–05 style welcome but restyled).
- Key facts (Predicted 2:1, Year 3/4, Focus, Available 2027, Derby UK): folded into the sidebar or a compact row at the top of the content column — the current fixed key-facts widget is removed.

### Mobile (≲ 900px)

- Sidebar collapses to a compact header: avatar + name + CV button + nav (hamburger or horizontal scroll nav)
- Content stacks in a single column below
- All cards/timeline remain readable single-column

## Components

- **Timeline (Education, Experience):** retained concept, restyled — markers/line use accent colors, entries are glassy cards
- **Featured research card:** keeps headline + tags treatment, restyled with gradient/glassy emphasis as the visual centrepiece
- **Skill tags:** pill chips with thin borders; highlight variant uses the accent gradient
- **Contact links:** card-style rows with label/value, hover glow, existing copy-to-clipboard behavior retained if present in script.js

## Motion ("polished & lively")

- Scroll-reveal (fade/slide-up, staggered) on cards and sections — IntersectionObserver
- Hover: card lift + border-glow; button gradient shift
- Slow ambient drift/rotation of sidebar molecule SVG (CSS animation)
- Scroll progress indicator may be kept or dropped; nav active state is the primary wayfinding
- All motion wrapped in `@media (prefers-reduced-motion: reduce)` guards

## Content & SEO

- All section text, CV PDF link, contact details, OG/Twitter/SEO meta tags carried over unchanged
- `<title>`, meta descriptions unchanged

## Tech Constraints

- Plain HTML + CSS + JS, no build step, no frameworks
- Files: rewrite `index.html` (structure), `style.css` (full rewrite), `script.js` (theme toggle w/ persistence, scroll-spy, scroll-reveals, mobile nav)
- Google Fonts allowed (already in use)
- Deploy: commit + push to main, GitHub Pages serves from root

## Error Handling / Robustness

- Site must remain fully readable with JS disabled (animations/toggle degrade gracefully; default dark theme applies)
- No external JS dependencies

## Testing

- Manual check in browser at desktop and mobile widths (DevTools responsive mode)
- Verify: theme toggle + persistence, scroll-spy highlighting, CV download link, all anchor links, contact links, reduced-motion behavior
- Lighthouse sanity pass (performance/accessibility) before pushing
