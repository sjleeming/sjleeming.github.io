# Layout & Sidebar Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Left-align main content, expand the key-facts sidebar to full viewport height, and remove italic/accent styling from the hero heading.

**Architecture:** Pure CSS and HTML edits — no build step. Three independent changes applied to `style.css` and `index.html`, each committed separately for easy rollback.

**Tech Stack:** Plain HTML, CSS. No framework, no build step. Verify by opening `index.html` in a browser.

---

## Files

- Modify: `style.css` — `.section-inner`, `.key-facts`, `.key-facts dl`, `.key-facts dt`, `.key-facts dd`, `.key-fact-primary`, `h1 em` (×2 occurrences)
- Modify: `index.html` — hero `<h1>` element

---

### Task 1: Fix hero heading

Remove the `<em>` tag wrapping "Leeming" and delete the `h1 em` CSS rules so the full name renders in one uniform style.

**Files:**
- Modify: `index.html` line ~80
- Modify: `style.css` lines 386–390 and 993

- [ ] **Step 1: Edit `index.html` — remove `<em>` tag**

Find:
```html
<h1>Samuel <em>Leeming</em></h1>
```
Replace with:
```html
<h1>Samuel Leeming</h1>
```

- [ ] **Step 2: Edit `style.css` — delete the `h1 em` rule (lines 386–390)**

Find and remove this entire block:
```css
h1 em {
  font-style: italic;
  color: var(--accent);
  font-weight: 300;
}
```

- [ ] **Step 3: Edit `style.css` — delete the print `h1 em` rule (line 993)**

Inside the `@media print` block, find and remove:
```css
h1 em { color: #2c5f8a !important; }
```

- [ ] **Step 4: Verify**

Open `index.html` in a browser. The hero heading should read "Samuel Leeming" in one colour, no italic on the surname.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css
git commit -m "fix: remove italic and accent colour from hero heading"
```

---

### Task 2: Left-align main content

Shift the content column from centred to left-aligned with a 2rem left margin.

**Files:**
- Modify: `style.css` — `.section-inner` rule (lines 316–320)

- [ ] **Step 1: Edit `style.css` — update `.section-inner`**

Find:
```css
.section-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  width: 100%;
}
```
Replace with:
```css
.section-inner {
  max-width: var(--max-w);
  margin: 0 0 0 2rem;
  width: 100%;
}
```

- [ ] **Step 2: Verify**

Open `index.html` in a browser at a wide viewport (>1100px). The text content should sit close to the left edge with a small ~2rem gap, no longer centred. The right side should have clear space where the sidebar will sit.

- [ ] **Step 3: Commit**

```bash
git add style.css
git commit -m "style: left-align content column with 2rem left margin"
```

---

### Task 3: Full-height sidebar

Convert the sidebar from a small centred floating box to a full-height fixed panel on the right, with the nav cleared at the top (nav is 56px).

**Files:**
- Modify: `style.css` — `.key-facts`, `.key-facts dl`, `.key-facts dt`, `.key-facts dd`, `.key-fact-primary` (lines 116–163)

- [ ] **Step 1: Edit `style.css` — update `.key-facts` positioning**

Find:
```css
.key-facts {
  position: fixed;
  top: 40%;
  transform: translateY(-50%);
  left: calc(50% + var(--max-w) / 2 + 1.5rem);
  z-index: 10;
  border-left: 1px solid var(--border);
  padding-left: 1.25rem;
  background: var(--bg);
}
```
Replace with:
```css
.key-facts {
  position: fixed;
  top: 56px;
  height: calc(100vh - 56px);
  left: calc(2rem + var(--max-w) + 1.5rem);
  z-index: 10;
  border-left: 1px solid var(--border);
  padding: 2.5rem 1.5rem;
  background: var(--bg);
}
```

- [ ] **Step 2: Edit `style.css` — update `.key-facts dl` to spread facts evenly**

Find:
```css
.key-facts dl {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}
```
Replace with:
```css
.key-facts dl {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}
```

- [ ] **Step 3: Edit `style.css` — scale up `dt` labels**

Find:
```css
.key-facts dt {
  font-family: var(--mono);
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  opacity: 0.6;
}
```
Replace with:
```css
.key-facts dt {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  opacity: 0.6;
}
```

- [ ] **Step 4: Edit `style.css` — scale up `dd` values**

Find:
```css
.key-facts dd {
  margin: 0;
  font-family: var(--display);
  font-size: 0.85rem;
  font-weight: 300;
  color: var(--text-dim);
  letter-spacing: -0.01em;
}
```
Replace with:
```css
.key-facts dd {
  margin: 0;
  font-family: var(--display);
  font-size: 1.1rem;
  font-weight: 300;
  color: var(--text-dim);
  letter-spacing: -0.01em;
}
```

- [ ] **Step 5: Edit `style.css` — scale up primary value**

Find:
```css
.key-fact-primary {
  font-size: 1.25rem;
  color: var(--accent);
  font-weight: 400;
}
```
Replace with:
```css
.key-fact-primary {
  font-size: 1.6rem;
  color: var(--accent);
  font-weight: 400;
}
```

- [ ] **Step 6: Verify**

Open `index.html` in a browser at >1100px wide. The right sidebar should run the full height of the viewport (below the nav bar), with the five facts spread evenly from top to bottom. Scroll down through sections — the sidebar should remain fixed and fully visible throughout.

- [ ] **Step 7: Commit**

```bash
git add style.css
git commit -m "style: expand key-facts sidebar to full viewport height"
```

---

### Task 4: Push to GitHub Pages

- [ ] **Step 1: Push**

```bash
git push
```

- [ ] **Step 2: Verify live**

Wait ~60 seconds then open https://sjleeming.github.io and confirm all three changes are visible on the live site.
