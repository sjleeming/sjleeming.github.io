# CV Site Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add high-impact improvements to the CV site — social links, shareable link previews, copy-to-clipboard on contact details, a scroll progress bar, and a print stylesheet — to make the site more useful for job applications.

**Architecture:** All changes are to the existing three files (index.html, style.css, script.js). No build step, no frameworks, no new files needed except the print stylesheet section added inline to style.css.

**Tech Stack:** Plain HTML, CSS, JS. Hosted on GitHub Pages at sjleeming.github.io.

---

## File Map

| File | What changes |
|------|-------------|
| `index.html` | Add OG/SEO meta tags in `<head>`; add LinkedIn link in Contact section; add scroll-progress `<div>` |
| `style.css` | Style scroll-progress bar; style LinkedIn contact link; add `@media print` stylesheet |
| `script.js` | Scroll progress bar logic; copy-to-clipboard for email and phone |

---

### Task 1: Open Graph & SEO Meta Tags

Adds proper link-preview cards when the URL is shared on LinkedIn, WhatsApp, iMessage etc. Employers who receive the link will see a polished preview instead of a blank card.

**Files:**
- Modify: `index.html` — `<head>` block (lines 1–11)

- [ ] **Step 1: Add meta tags to `<head>` in index.html**

  Replace the closing `</head>` tag with:

  ```html
    <!-- SEO -->
    <meta name="description" content="Samuel Leeming — MChem Medicinal & Pharmaceutical Chemistry student at Loughborough University. Seeking graduate roles in medicinal or synthetic chemistry." />
    <meta name="author" content="Samuel Leeming" />

    <!-- Open Graph (LinkedIn, WhatsApp, iMessage previews) -->
    <meta property="og:type"        content="profile" />
    <meta property="og:title"       content="Samuel Leeming — MChem Chemistry" />
    <meta property="og:description" content="MChem Medicinal & Pharmaceutical Chemistry · Loughborough University · Predicted 2:1. Research in porphyrins & PDT." />
    <meta property="og:url"         content="https://sjleeming.github.io" />

    <!-- Twitter card fallback -->
    <meta name="twitter:card"        content="summary" />
    <meta name="twitter:title"       content="Samuel Leeming — MChem Chemistry" />
    <meta name="twitter:description" content="MChem Medicinal & Pharmaceutical Chemistry · Loughborough University." />
  </head>
  ```

- [ ] **Step 2: Verify**

  Open `index.html` in browser. Use [opengraph.xyz](https://www.opengraph.xyz) (paste the live URL after pushing) or the LinkedIn post inspector to confirm the preview card shows title + description.

- [ ] **Step 3: Commit**

  ```bash
  git add index.html
  git commit -m "feat: add OG and SEO meta tags for link previews"
  ```

---

### Task 2: LinkedIn Link in Contact Section

LinkedIn is the first place employers look. It should be in the contact section alongside email and phone.

**Files:**
- Modify: `index.html` — Contact section (lines 241–251)
- Modify: `style.css` — no new styles needed, reuses `.contact-link`

- [ ] **Step 1: Add LinkedIn entry in the contact links block**

  In `index.html`, after the phone `<a>` block (after line 250), add:

  ```html
          <a href="https://www.linkedin.com/in/samuel-leeming" target="_blank" rel="noopener" class="contact-link">
            <span class="contact-link-label">LinkedIn</span>
            <span class="contact-link-value">samuel-leeming</span>
          </a>
  ```

  > **Note:** Replace `samuel-leeming` with your actual LinkedIn profile slug if different. Check your LinkedIn URL — it looks like `linkedin.com/in/YOUR-SLUG`.

- [ ] **Step 2: Verify visually**

  Open `index.html` in browser, scroll to Contact. Confirm LinkedIn row appears with the same styling as Email and Phone. Click it — should open LinkedIn in a new tab.

- [ ] **Step 3: Commit**

  ```bash
  git add index.html
  git commit -m "feat: add LinkedIn link to contact section"
  ```

---

### Task 3: Copy-to-Clipboard on Contact Details

When someone views the site on desktop and wants to email or call, this saves them having to select-and-copy manually. A subtle "Copied!" flash on click is all that's needed.

**Files:**
- Modify: `style.css` — add `.contact-link-copied` flash style
- Modify: `script.js` — add click-to-copy handlers
- Modify: `index.html` — add `data-copy` attributes to email and phone links

- [ ] **Step 1: Add `data-copy` attributes to email and phone links in index.html**

  Change the email link (line 242) from:
  ```html
          <a href="mailto:samjleeming@gmail.com" class="contact-link">
  ```
  to:
  ```html
          <a href="mailto:samjleeming@gmail.com" class="contact-link" data-copy="samjleeming@gmail.com">
  ```

  Change the phone link (line 246) from:
  ```html
          <a href="tel:+447925844944" class="contact-link">
  ```
  to:
  ```html
          <a href="tel:+447925844944" class="contact-link" data-copy="+44 7925 844944">
  ```

- [ ] **Step 2: Add flash style to style.css**

  At the end of the `/* ─── Contact ─── */` block (after line 801), add:

  ```css
  .contact-link.copied .contact-link-value {
    color: var(--accent);
  }
  .contact-link.copied .contact-link-value::after {
    content: ' — copied!';
    font-size: 0.7rem;
    font-family: var(--mono);
    letter-spacing: 0.06em;
    opacity: 0.7;
  }
  ```

- [ ] **Step 3: Add copy logic to script.js**

  At the end of `script.js`, add:

  ```js
  // ─── Copy-to-clipboard on contact links ───
  document.querySelectorAll('.contact-link[data-copy]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(link.dataset.copy).then(() => {
        link.classList.add('copied');
        setTimeout(() => link.classList.remove('copied'), 1800);
      });
    });
  });
  ```

- [ ] **Step 4: Verify**

  Open `index.html` in browser (use a local server or open directly). Click the Email row — the value should briefly show "— copied!" in accent colour. Paste into a text editor to confirm the email address was copied. Repeat for phone.

- [ ] **Step 5: Commit**

  ```bash
  git add index.html style.css script.js
  git commit -m "feat: copy-to-clipboard on email and phone contact links"
  ```

---

### Task 4: Scroll Progress Bar

A thin accent-coloured line at the very top of the viewport that fills as you scroll. Gives a subtle sense of position on the page.

**Files:**
- Modify: `index.html` — add one `<div>` inside `<body>`
- Modify: `style.css` — style the bar
- Modify: `script.js` — update width on scroll

- [ ] **Step 1: Add the progress bar element to index.html**

  Immediately after `<body>` (before `<div class="ambient-glow">`), add:

  ```html
    <div class="scroll-progress" id="scroll-progress"></div>
  ```

- [ ] **Step 2: Style the bar in style.css**

  After the `/* ─── Reset ─── */` block (after line 81), add:

  ```css
  /* ─── Scroll progress bar ─── */
  .scroll-progress {
    position: fixed;
    top: 0; left: 0;
    width: 0%;
    height: 2px;
    background: var(--accent);
    z-index: 200;
    transition: width 0.05s linear;
    pointer-events: none;
  }
  ```

- [ ] **Step 3: Add scroll handler to script.js**

  At the end of `script.js`, add:

  ```js
  // ─── Scroll progress bar ───
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
  }, { passive: true });
  ```

- [ ] **Step 4: Verify**

  Open `index.html` in browser. Scroll slowly from top to bottom — the accent-coloured bar should grow from 0% to 100% width at the very top of the page (above the nav).

- [ ] **Step 5: Commit**

  ```bash
  git add index.html style.css script.js
  git commit -m "feat: add scroll progress bar"
  ```

---

### Task 5: Print Stylesheet

When a recruiter wants a printed backup or a PDF export from the browser, the default print output of this site is poor (dark background, fixed nav, etc.). A print stylesheet makes it clean and readable.

**Files:**
- Modify: `style.css` — add `@media print` block at end of file

- [ ] **Step 1: Add print styles at the very end of style.css**

  ```css
  /* ─── Print styles ─── */
  @media print {
    * { animation: none !important; transition: none !important; }

    body {
      background: #fff !important;
      color: #111 !important;
      font-size: 11pt;
    }

    body::before, body::after,
    .ambient-glow,
    .scroll-progress,
    nav,
    .hero-actions,
    .theme-toggle,
    footer { display: none !important; }

    section {
      padding: 24pt 0 18pt !important;
      border-bottom: 0.5pt solid #ccc !important;
      break-inside: avoid;
    }

    #about { min-height: unset !important; }

    .hero-inner { display: block !important; }

    h1 {
      font-size: 28pt !important;
      color: #111 !important;
    }

    h1 em { color: #2c5f8a !important; }

    h2 {
      font-size: 7pt !important;
      color: #666 !important;
      margin-bottom: 12pt !important;
    }

    .card {
      border: 0.5pt solid #ccc !important;
      background: #fff !important;
      box-shadow: none !important;
      break-inside: avoid;
    }

    .card-title, .card-headline { color: #111 !important; }

    .card-sub, .card-org, .card-modules,
    .timeline-date, .meta-label { color: #666 !important; }

    .card-body, .card-list li, .research-list li { color: #333 !important; }

    .section-num, .card-eyebrow, .timeline-marker,
    .card-badge, .date-badge { color: #2c5f8a !important; }

    .timeline::before { background: #ccc !important; }

    .skill-tag {
      border: 0.5pt solid #ccc !important;
      color: #333 !important;
      background: #f5f5f5 !important;
    }

    .contact-link-value { font-size: 14pt !important; color: #111 !important; }

    a[href]::after {
      content: none !important;
    }
  }
  ```

- [ ] **Step 2: Verify**

  Open `index.html` in browser. Press `Ctrl+P` (print preview). Confirm:
  - White background, no nav bar, no decorative glows
  - All sections visible and readable
  - Cards have thin borders
  - Text is dark on white

- [ ] **Step 3: Commit**

  ```bash
  git add style.css
  git commit -m "feat: add print stylesheet for clean CV printing"
  ```

---

### Task 6: Push & Deploy

- [ ] **Step 1: Push all commits to GitHub**

  ```bash
  git push
  ```

- [ ] **Step 2: Verify live site**

  Wait ~1 minute, then open `https://sjleeming.github.io` and confirm all changes are live:
  - LinkedIn row visible in Contact
  - Scroll progress bar fills as you scroll
  - Click email — "copied!" flash appears
  - `Ctrl+P` — clean print preview

---

## Self-Review

**Spec coverage:**
- OG/SEO meta → Task 1 ✓
- LinkedIn → Task 2 ✓
- Copy-to-clipboard → Task 3 ✓
- Scroll progress bar → Task 4 ✓
- Print stylesheet → Task 5 ✓
- Deploy → Task 6 ✓

**Placeholder scan:** All code blocks are complete. No TBDs. LinkedIn slug note flagged explicitly.

**Type consistency:** No shared types/functions between tasks. Each task is self-contained.
