# Layout & Sidebar Redesign

**Date:** 2026-05-03
**Status:** Approved

## Overview

Three targeted changes to improve the page layout:
1. Shift main content left-aligned with a small left margin (removing centred layout)
2. Expand the key-facts sidebar to a full-height fixed panel on the right
3. Remove italic and accent colour from the hero heading

## Changes

### 1. Content Left-Aligned

**Current behaviour:** `section-inner` uses `margin: 0 auto` to centre the 760px content column, leaving large empty space on the left side of the viewport.

**New behaviour:** `section-inner` anchors to the left with `margin-left: 2rem` and keeps `max-width: 760px`. Content starts ~2rem from the left viewport edge and its right edge naturally meets the space before the sidebar. The `margin-right` is removed (or set to 0).

**Files:** `style.css` — `.section-inner` rule.

### 2. Full-Height Sidebar

**Current behaviour:** `.key-facts` is `position: fixed` anchored at `top: 40%` with `transform: translateY(-50%)` — a small floating box in the middle-right of the screen.

**New behaviour:** `.key-facts` becomes a full-height fixed panel:
- `top: 0; height: 100vh`
- `display: flex; flex-direction: column; justify-content: space-evenly`
- Remove `transform` property
- Add `padding: 2rem 1.5rem` for vertical breathing room
- Scale up `dt` and `dd` font sizes to fill the space more generously
- The `border-left` remains as the full-height dividing line
- `background: var(--bg)` already in place (keeps section borders from bleeding through)

**Files:** `style.css` — `.key-facts`, `.key-facts dl`, `.key-facts dt`, `.key-facts dd`, `.key-fact-primary` rules.

### 3. Hero Heading Fix

**Current behaviour:** `<h1>Samuel <em>Leeming</em></h1>` — the surname is italic and styled with an accent colour via `h1 em` CSS rules.

**New behaviour:** `<h1>Samuel Leeming</h1>` — plain text, uniform colour, no italic. Remove the `<em>` tag and remove any `h1 em` CSS rules.

**Files:** `index.html` — hero `<h1>` element. `style.css` — any `h1 em` selector.

## Out of Scope

- No changes to page sections, cards, timeline, or nav
- No mobile layout changes (sidebar already hidden below 1100px)
- No content changes
