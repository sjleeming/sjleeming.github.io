# CV Site Improvements v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a centred glowing avatar to the hero, a sticky key facts sidebar in the right margin, and a dissertation card in the Research section.

**Architecture:** All changes are to the existing three files (index.html, style.css, script.js). No new files, no frameworks, no build step. Tasks are independent and can be done in any order except Task 4 (deploy) which must be last.

**Tech Stack:** Plain HTML, CSS, JS. Hosted on GitHub Pages at sjleeming.github.io. CSS variables defined in `:root` — always use `var(--name)` rather than hard-coding colours. Dark theme accent is `#2de3b4` (teal). Light theme accent is `#2c5f8a` (blue). Max content width: `--max-w: 860px`.

---

## File Map

| File | What changes |
|------|-------------|
| `index.html` | Task 1: restructure hero section; Task 2: add `<aside class="key-facts">`; Task 3: add dissertation card |
| `style.css` | Task 1: update `.hero-inner`, add `.avatar`, update `.bio` and `.hero-actions`; Task 2: add `.key-facts` styles |

---

## Task 1: Centred Hero with Glowing Avatar

Redesigns the `#about` hero from a side-by-side grid to a centred column with a glowing circular avatar. The `.hero-meta` stat block (Predicted / Year / Focus) is removed from the hero — those stats move to the sidebar in Task 2.

**Files:**
- Modify: `index.html` — lines 51–86 (the entire `#about` section)
- Modify: `style.css` — lines 277–282 (`.hero-inner`), line 323–331 (`.bio`), lines 333–337 (`.hero-actions`)

- [ ] **Step 1: Replace the hero section in index.html**

  Replace the entire `<section id="about">` block (lines 51–86) with:

  ```html
    <!-- HERO -->
    <section id="about">
      <div class="section-inner hero-inner">
        <div class="avatar" aria-hidden="true">SL</div>
        <p class="hero-eyebrow">MChem &middot; Medicinal &amp; Pharmaceutical Chemistry</p>
        <h1>Samuel <em>Leeming</em></h1>
        <p class="hero-location">Loughborough University &nbsp;&middot;&nbsp; 2023–2027</p>
        <p class="bio">
          A driven chemistry student on track for a 2:1, with demonstrated aptitude across
          synthetic, analytical and computational chemistry. Particular interest in the design
          and development of therapeutically relevant compounds. Seeking a graduate position
          in medicinal or synthetic chemistry within the pharmaceutical industry.
        </p>
        <div class="hero-actions">
          <a href="Samuel_Leeming_CV.pdf" download class="btn-primary">
            <span>Download CV</span>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 1v8M3 6l4 4 4-4M1 11h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="#research" class="btn-outline">View Research &rarr;</a>
        </div>
      </div>
    </section>
  ```

- [ ] **Step 2: Update `.hero-inner` in style.css**

  Replace:
  ```css
  .hero-inner {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 4rem;
    align-items: end;
  }
  ```
  With:
  ```css
  .hero-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  ```

- [ ] **Step 3: Add `.avatar` styles to style.css**

  After the `/* ─── Scroll progress bar ─── */` block (after line 88), add:

  ```css
  /* ─── Avatar ─── */
  .avatar {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    border: 1.5px solid rgba(45, 227, 180, 0.55);
    box-shadow: 0 0 28px rgba(45, 227, 180, 0.25), inset 0 0 20px rgba(45, 227, 180, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2.5rem;
    color: var(--accent);
    font-family: var(--mono);
    font-size: 1.4rem;
    font-weight: 300;
    letter-spacing: 0.05em;
    flex-shrink: 0;
  }
  ```

  Also add the light-theme override inside the `[data-theme="light"]` block (after line 34):
  ```css
  [data-theme="light"] .avatar {
    border-color: rgba(44, 95, 138, 0.55);
    box-shadow: 0 0 28px rgba(44, 95, 138, 0.18), inset 0 0 20px rgba(44, 95, 138, 0.06);
  }
  ```

- [ ] **Step 4: Add `max-width` to `.bio` and centre `.hero-actions`**

  In the existing `.bio` rule, add `max-width: 560px;`:
  ```css
  .bio {
    font-size: 0.95rem;
    color: var(--text-dim);
    line-height: 1.85;
    max-width: 560px;       /* add this line */
    /* leave existing animation properties intact */
  }
  ```

  In the existing `.hero-actions` rule, add `justify-content: center;`:
  ```css
  .hero-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;  /* add this line */
    /* leave existing properties intact */
  }
  ```

- [ ] **Step 5: Fix responsive override for `.hero-inner` at 760px**

  Inside `@media (max-width: 760px)`, the existing `.hero-inner` rule sets `grid-template-columns: 1fr`. Replace it with a no-op (the flex column layout already works on mobile):

  Replace:
  ```css
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  ```
  With:
  ```css
  .hero-inner {
    gap: 1.5rem;
  }
  ```

  Also remove the `.hero-meta` responsive rule from the same `@media` block (it no longer exists in the HTML):
  ```css
  /* DELETE this block: */
  .hero-meta {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.5rem 2.5rem;
  }
  ```

- [ ] **Step 6: Verify**

  Open `index.html` in a browser. Check:
  - Avatar circle with "SL" appears centred at the top of the hero
  - Name, eyebrow, bio, and buttons are all centred
  - No `.hero-meta` stats block visible
  - Toggle to light theme — avatar glow should shift from teal to blue
  - Resize to mobile width — hero still looks good, nothing overflows

- [ ] **Step 7: Commit**

  ```bash
  git add index.html style.css
  git commit -m "feat: centred hero with glowing SL avatar"
  ```

---

## Task 2: Sticky Key Facts Sidebar

Adds a slim `<aside>` fixed to the right of the content column on screens wider than 1100px. Disappears on mobile.

**Files:**
- Modify: `index.html` — add `<aside>` immediately after the opening `<body>` tag (line 27)
- Modify: `style.css` — add `.key-facts` block

- [ ] **Step 1: Add the `<aside>` to index.html**

  After `<body>` and before `<div class="scroll-progress"...>` (line 27), insert:

  ```html
    <aside class="key-facts" aria-label="Key facts">
      <dl>
        <div class="key-fact">
          <dt>Predicted</dt>
          <dd class="key-fact-primary">2:1</dd>
        </div>
        <div class="key-fact">
          <dt>Year</dt>
          <dd>3 / 4</dd>
        </div>
        <div class="key-fact">
          <dt>Focus</dt>
          <dd>Med. Chem.</dd>
        </div>
        <div class="key-fact">
          <dt>Available</dt>
          <dd>2027</dd>
        </div>
        <div class="key-fact">
          <dt>Location</dt>
          <dd>Derby, UK</dd>
        </div>
      </dl>
    </aside>
  ```

- [ ] **Step 2: Add `.key-facts` styles to style.css**

  After the `/* ─── Scroll progress bar ─── */` block (after line 88), add:

  ```css
  /* ─── Key facts sidebar ─── */
  .key-facts {
    position: fixed;
    top: 40%;
    transform: translateY(-50%);
    left: calc(50% + 430px + 1.5rem);
    z-index: 10;
    border-left: 1px solid var(--border);
    padding-left: 1.25rem;
  }

  .key-facts dl {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
  }

  .key-fact {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .key-facts dt {
    font-family: var(--mono);
    font-size: 0.45rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted);
    opacity: 0.6;
  }

  .key-facts dd {
    margin: 0;
    font-family: var(--display);
    font-size: 0.85rem;
    font-weight: 300;
    color: var(--text-dim);
    letter-spacing: -0.01em;
  }

  .key-fact-primary {
    font-size: 1.25rem;
    color: var(--accent);
    font-weight: 400;
  }

  @media (max-width: 1100px) {
    .key-facts { display: none; }
  }
  ```

- [ ] **Step 3: Add print suppression**

  In the existing `@media print` block, add `.key-facts` to the list of hidden elements. Find the line:
  ```css
  .ambient-glow,
  .scroll-progress,
  nav,
  .hero-actions,
  .theme-toggle,
  footer { display: none !important; }
  ```
  And add `.key-facts,` to it:
  ```css
  .ambient-glow,
  .scroll-progress,
  .key-facts,
  nav,
  .hero-actions,
  .theme-toggle,
  footer { display: none !important; }
  ```

- [ ] **Step 4: Verify**

  Open `index.html` in a browser at full width (zoom out if needed, or use DevTools at 1200px+). Check:
  - Panel appears to the right of the content column with Predicted / Year / Focus / Available / Location
  - "2:1" is larger and in accent colour
  - Panel stays fixed as you scroll through all sections
  - Resize to <1100px — panel disappears
  - Press Ctrl+P — panel does not appear in print preview

- [ ] **Step 5: Commit**

  ```bash
  git add index.html style.css
  git commit -m "feat: sticky key facts sidebar in right margin"
  ```

---

## Task 3: Dissertation Card in Research Section

Adds a second card to the `#research` section below the porphyrins internship card, using existing card styles.

**Files:**
- Modify: `index.html` — add card inside `#research .stagger`, after the closing `</div>` of the porphyrins card (after line 177)

- [ ] **Step 1: Add the dissertation card to index.html**

  Inside `<section id="research">`, find the closing `</div>` of the porphyrins card (the one that ends the `<div class="card featured animate-in">` block). After it, and before the closing `</div>` of `.stagger`, add:

  ```html
          <div class="card featured animate-in">
            <div class="featured-header">
              <div>
                <p class="card-eyebrow">Final Year Dissertation &middot; Literature Review</p>
                <h3 class="card-headline">Opioids: Investigating Alternative Analgesic<br>Mechanisms &amp; Novel OUD Treatments</h3>
              </div>
              <div class="featured-meta">
                <span class="date-badge">2026</span>
              </div>
            </div>
            <p class="card-institution">Loughborough University &middot; MChem Medicinal &amp; Pharmaceutical Chemistry</p>
            <p class="card-body">A narrative review critically evaluating selective Nav channel inhibitors (Nav1.7/1.8) as non-opioid analgesics, and pharmacotherapeutic strategies for opioid use disorder.</p>
            <div class="research-tags">
              <span>Nav1.7 / Nav1.8</span><span>Opioid Use Disorder</span><span>Clinical Trial Analysis</span>
              <span>Analgesic Pharmacology</span><span>Lofexidine</span><span>XR-NTX</span><span>BUP-XR</span>
            </div>
          </div>
  ```

- [ ] **Step 2: Verify**

  Open `index.html` in a browser. Scroll to Research. Check:
  - Two cards visible — porphyrins internship first, dissertation second
  - Dissertation card shows title, date badge (2026), institution, one-sentence body, and tags
  - Dissertation card animates in on scroll (same as the first card)
  - Cards look visually consistent

- [ ] **Step 3: Commit**

  ```bash
  git add index.html
  git commit -m "feat: add dissertation card to Research section"
  ```

---

## Task 4: Push & Deploy

- [ ] **Step 1: Push all commits**

  ```bash
  git push
  ```

- [ ] **Step 2: Verify live site**

  Wait ~1 minute, then open `https://sjleeming.github.io` and confirm:
  - Centred hero with glowing "SL" avatar visible immediately
  - Sidebar visible on wide screen (>1100px) with all 5 facts
  - Scroll to Research — two cards visible, dissertation card present
  - Toggle light theme — avatar glow shifts to blue, sidebar labels still readable
  - Resize to mobile — sidebar hidden, hero centred and clean

---

## Self-Review

**Spec coverage:**
- Centred hero with glowing avatar → Task 1 ✓
- Sticky key facts sidebar (Predicted, Year, Focus, Available, Location) → Task 2 ✓
- Dissertation card in Research section → Task 3 ✓
- Deploy → Task 4 ✓

**Placeholder scan:** All code blocks are complete. No TBDs.

**Type consistency:** `.key-fact-primary` used in HTML Step 1 and defined in CSS Step 2. `.avatar` used in HTML Step 1 and defined in CSS Step 3. `.card featured animate-in` in Task 3 matches existing porphyrins card class pattern.
