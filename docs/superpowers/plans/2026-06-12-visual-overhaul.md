# Visual Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild sjleeming.github.io as a fixed-sidebar, refined dark "molecular" design with a matching light theme, keeping all content and the plain HTML/CSS/JS stack.

**Architecture:** Single-page site with a sticky left sidebar (identity, nav, CV button, theme toggle, animated molecule SVG) and a scrolling right content column (Education, Research, Experience, Skills, Contact). Dark theme is default via CSS variables on `:root`; light theme overrides via `[data-theme="light"]`. Vanilla JS handles theme persistence, scroll-spy, scroll-reveals, and copy-to-clipboard.

**Tech Stack:** Plain HTML + CSS + JS, Google Fonts (Inter + IBM Plex Mono), GitHub Pages deploy via git push.

**Spec:** `docs/superpowers/specs/2026-06-12-visual-overhaul-design.md`

**Project root:** `C:\Users\samjl\OneDrive\Documents\Sam Leeming Website`

**Important:** Commit after each task but do NOT `git push` until Task 4 verification passes (pushing deploys the live site).

---

## File Structure

- `index.html` — full rewrite: sidebar + main column structure, all existing content carried over, meta tags unchanged
- `style.css` — full rewrite: variables (dark/light), layout, sidebar, cards, timeline, tags, contact, motion, responsive
- `script.js` — full rewrite: theme toggle (localStorage + prefers-color-scheme), scroll-spy, scroll-reveals, copy-to-clipboard
- No other files change. `Samuel_Leeming_CV.pdf` is linked as-is.

---

### Task 1: Rewrite index.html

**Files:**
- Modify: `index.html` (full replacement)

- [ ] **Step 1: Replace the entire contents of `index.html` with:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Samuel Leeming — MChem Chemistry</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css" />
  <script>document.documentElement.classList.add('js');</script>

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
<body>

  <div class="layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">
      <svg class="molecule" viewBox="0 0 320 480" fill="none" aria-hidden="true">
        <g class="molecule-a">
          <polygon points="160,40 230,80 230,160 160,200 90,160 90,80" stroke="currentColor" stroke-width="1.2"/>
          <circle cx="160" cy="40" r="5" fill="currentColor"/>
          <circle cx="230" cy="160" r="5" fill="currentColor"/>
          <circle cx="90" cy="80" r="5" fill="currentColor"/>
          <line x1="160" y1="40" x2="160" y2="0" stroke="currentColor" stroke-width="1.2"/>
          <line x1="230" y1="80" x2="270" y2="56" stroke="currentColor" stroke-width="1.2"/>
        </g>
        <g class="molecule-b">
          <polygon points="80,330 130,358 130,414 80,442 30,414 30,358" stroke="currentColor" stroke-width="1.2"/>
          <circle cx="130" cy="358" r="4" fill="currentColor"/>
          <circle cx="30" cy="414" r="4" fill="currentColor"/>
          <line x1="130" y1="414" x2="172" y2="438" stroke="currentColor" stroke-width="1.2"/>
          <circle cx="172" cy="438" r="4" fill="currentColor"/>
        </g>
      </svg>

      <div class="sidebar-inner">
        <div class="avatar" aria-hidden="true">SL</div>
        <p class="eyebrow">MChem · Medicinal &amp; Pharmaceutical Chemistry</p>
        <h1>Samuel Leeming</h1>
        <p class="sidebar-meta">Loughborough University · 2023–2027</p>
        <p class="bio">
          A driven chemistry student on track for a 2:1, with demonstrated aptitude across
          synthetic, analytical and computational chemistry. Particular interest in the design
          and development of therapeutically relevant compounds. Seeking a graduate position
          in medicinal or synthetic chemistry within the pharmaceutical industry.
        </p>

        <dl class="key-facts" aria-label="Key facts">
          <div class="key-fact"><dt>Predicted</dt><dd>2:1</dd></div>
          <div class="key-fact"><dt>Year</dt><dd>3 / 4</dd></div>
          <div class="key-fact"><dt>Available</dt><dd>2027</dd></div>
          <div class="key-fact"><dt>Location</dt><dd>Derby, UK</dd></div>
        </dl>

        <nav class="side-nav" aria-label="Section navigation">
          <a href="#education"><span class="nav-num">01</span><span class="nav-line"></span>Education</a>
          <a href="#research"><span class="nav-num">02</span><span class="nav-line"></span>Research</a>
          <a href="#experience"><span class="nav-num">03</span><span class="nav-line"></span>Experience</a>
          <a href="#skills"><span class="nav-num">04</span><span class="nav-line"></span>Skills</a>
          <a href="#contact"><span class="nav-num">05</span><span class="nav-line"></span>Contact</a>
        </nav>

        <div class="sidebar-actions">
          <a href="Samuel_Leeming_CV.pdf" download class="btn-primary">
            <span>Download CV</span>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 1v8M3 6l4 4 4-4M1 11h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">Light</button>
        </div>

        <div class="sidebar-contacts">
          <a href="mailto:samjleeming@gmail.com">Email</a>
          <a href="tel:+447925844944">Phone</a>
          <a href="https://www.linkedin.com/in/samuel-leeming-9bb17433b/" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main>

      <!-- EDUCATION -->
      <section id="education">
        <h2><span class="section-num">01</span>Education</h2>
        <div class="timeline">

          <div class="timeline-entry animate-in">
            <div class="timeline-marker"></div>
            <div class="timeline-date">2023–2027</div>
            <div class="card">
              <div class="card-header">
                <span class="card-title">Loughborough University</span>
                <span class="card-badge">In Progress</span>
              </div>
              <p class="card-sub">MChem Medicinal and Pharmaceutical Chemistry · Predicted 2:1</p>
              <p class="card-body">
                Final year dissertation: investigating new opioid alternatives for analgesia, focusing
                on emerging analgesic mechanisms and non-opioid targets.
              </p>
              <p class="card-modules">
                Pharmacokinetics &amp; Drug Metabolism · Modern Aspects of Organic Chemistry ·
                Pharmaceutical and Biomedical Analysis · Fundamental Synthetic Chemistry ·
                Structural Characterisation · Spectroscopy and Analysis · Computer Programming
              </p>
            </div>
          </div>

          <div class="timeline-entry animate-in">
            <div class="timeline-marker"></div>
            <div class="timeline-date">2021–2023</div>
            <div class="card">
              <div class="card-header">
                <span class="card-title">Bilborough College</span>
              </div>
              <p class="card-sub">A-Levels</p>
              <div class="grade-row">
                <span class="grade"><span class="grade-sub">A</span>Chemistry</span>
                <span class="grade"><span class="grade-sub">B</span>Mathematics</span>
                <span class="grade"><span class="grade-sub">B</span>Biology</span>
              </div>
              <p class="card-body">Cambridge Chemistry Challenge — <em>Silver Award</em></p>
            </div>
          </div>

          <div class="timeline-entry animate-in">
            <div class="timeline-marker small"></div>
            <div class="timeline-date">2016–2021</div>
            <div class="card">
              <div class="card-header">
                <span class="card-title">West Park School</span>
              </div>
              <p class="card-sub">GCSEs — 11 subjects including Mathematics, Sciences and French</p>
            </div>
          </div>

        </div>
      </section>

      <!-- RESEARCH -->
      <section id="research">
        <h2><span class="section-num">02</span>Research</h2>
        <div class="card featured animate-in">
          <div class="featured-header">
            <div>
              <p class="card-eyebrow">Final Year Dissertation · Literature Review</p>
              <h3 class="card-headline">Opioids: Investigating Alternative Analgesic<br>Mechanisms &amp; Novel OUD Treatments</h3>
            </div>
            <div class="featured-meta">
              <span class="date-badge">2026</span>
            </div>
          </div>
          <p class="card-institution">Loughborough University · MChem Medicinal &amp; Pharmaceutical Chemistry</p>
          <p class="card-body">A narrative review critically evaluating selective Nav channel inhibitors (Nav1.7/1.8) as non-opioid analgesics, and pharmacotherapeutic strategies for opioid use disorder.</p>
          <div class="research-tags">
            <span>Nav1.7 / Nav1.8</span><span>Opioid Use Disorder</span><span>Clinical Trial Analysis</span>
            <span>Analgesic Pharmacology</span><span>Lofexidine</span><span>XR-NTX</span><span>BUP-XR</span>
          </div>
        </div>
      </section>

      <!-- EXPERIENCE -->
      <section id="experience">
        <h2><span class="section-num">03</span>Experience</h2>
        <div class="timeline">
          <div class="timeline-entry animate-in">
            <div class="timeline-marker"></div>
            <div class="timeline-date">Apr 2022–Present</div>
            <div class="card">
              <div class="card-header">
                <span class="card-title">Crew Member</span>
                <span class="card-org">McDonald's</span>
              </div>
              <ul class="card-list">
                <li>Delivered high-quality customer service in a high-pressure environment, consistently maintaining quality and efficiency during peak periods.</li>
                <li>Demonstrated strong reliability over four years of continued employment alongside full-time education.</li>
                <li>Collaborated within a large team, developing communication, adaptability and problem-solving skills under time constraints.</li>
                <li>Adhered to strict food safety, hygiene and operational standards.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- SKILLS -->
      <section id="skills">
        <h2><span class="section-num">04</span>Skills</h2>
        <div class="skills-layout">

          <div class="skill-category animate-in">
            <h3 class="skill-cat-title">Laboratory</h3>
            <div class="skill-tags">
              <span class="skill-tag">NMR Spectroscopy</span>
              <span class="skill-tag">HPLC</span>
              <span class="skill-tag">IR Spectroscopy</span>
              <span class="skill-tag">UV-Vis Spectroscopy</span>
              <span class="skill-tag">Mass Spectrometry</span>
              <span class="skill-tag">Column Chromatography</span>
              <span class="skill-tag">Flash Chromatography</span>
            </div>
          </div>

          <div class="skill-category animate-in">
            <h3 class="skill-cat-title">Software &amp; Computing</h3>
            <div class="skill-tags">
              <span class="skill-tag">ChemDraw</span>
              <span class="skill-tag">ORCA (Quantum Chemistry)</span>
              <span class="skill-tag">Microsoft Office Suite</span>
              <span class="skill-tag">Command Line / Terminal</span>
              <span class="skill-tag">AI-assisted Research Workflows</span>
            </div>
          </div>

          <div class="skill-category animate-in">
            <h3 class="skill-cat-title">Achievements &amp; Activities</h3>
            <div class="skill-tags">
              <span class="skill-tag highlight">Cambridge Chemistry Challenge — Silver (2023)</span>
              <span class="skill-tag">Loughborough Hall Rugby Team (2024–25)</span>
            </div>
          </div>

        </div>
      </section>

      <!-- CONTACT -->
      <section id="contact">
        <h2><span class="section-num">05</span>Contact</h2>
        <p class="contact-intro">Based in Derby, UK · Open to relocation · Full UK Driving Licence</p>
        <div class="contact-links">
          <a href="mailto:samjleeming@gmail.com" class="contact-link" data-copy="samjleeming@gmail.com">
            <span class="contact-link-label">Email</span>
            <span class="contact-link-value">samjleeming@gmail.com</span>
          </a>
          <a href="tel:+447925844944" class="contact-link" data-copy="+44 7925 844944">
            <span class="contact-link-label">Phone</span>
            <span class="contact-link-value">+44 7925 844944</span>
          </a>
          <a href="https://www.linkedin.com/in/samuel-leeming-9bb17433b/" target="_blank" rel="noopener" class="contact-link">
            <span class="contact-link-label">LinkedIn</span>
            <span class="contact-link-value">samuel-leeming</span>
          </a>
        </div>
      </section>

      <footer>
        <span class="footer-name">Samuel Leeming</span>
        <span class="footer-copy">© 2026</span>
      </footer>

    </main>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Sanity-check in browser**

Run: `Start-Process "C:\Users\samjl\OneDrive\Documents\Sam Leeming Website\index.html"` (or open the file in a browser).
Expected: All content visible (styling will look broken — old CSS no longer matches; that's fine until Task 2).

- [ ] **Step 3: Commit**

```powershell
git add index.html
git commit -m "Rewrite index.html for sidebar layout overhaul"
```

---

### Task 2: Rewrite style.css

**Files:**
- Modify: `style.css` (full replacement)

- [ ] **Step 1: Replace the entire contents of `style.css` with:**

```css
/* ─── Variables: dark (default) ─── */
:root {
  --bg:            #090e18;
  --bg-deep:       #060a12;
  --surface:       #101b2e;
  --surface-2:     #15233a;
  --border:        #1e3149;
  --border-hover:  #31507a;
  --text:          #e8eef6;
  --text-dim:      #93a7bd;
  --muted:         #5d7693;
  --accent:        #6fd3ff;
  --accent-2:      #7b6cf6;
  --grad:          linear-gradient(90deg, #3aa7e0, #7b6cf6);
  --glow:          rgba(111, 211, 255, 0.12);
  --glow-strong:   rgba(111, 211, 255, 0.25);
  --card-shadow:   0 8px 28px rgba(0, 0, 0, 0.35);
  --radius:        12px;
  --sans:          'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  --mono:          'IBM Plex Mono', 'Courier New', monospace;
}

/* ─── Light theme ─── */
[data-theme="light"] {
  --bg:            #f3f6fa;
  --bg-deep:       #e9eef6;
  --surface:       #ffffff;
  --surface-2:     #eef3f9;
  --border:        #d4dee9;
  --border-hover:  #9fb6cd;
  --text:          #16243a;
  --text-dim:      #46607c;
  --muted:         #7a90a8;
  --accent:        #2c6cb0;
  --accent-2:      #6c5cd6;
  --grad:          linear-gradient(90deg, #2c6cb0, #6c5cd6);
  --glow:          rgba(44, 108, 176, 0.10);
  --glow-strong:   rgba(44, 108, 176, 0.22);
  --card-shadow:   0 8px 24px rgba(30, 60, 100, 0.10);
}

/* ─── Reset & base ─── */
* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--sans);
  color: var(--text);
  background: var(--bg);
  background-image:
    radial-gradient(110% 80% at 85% -10%, var(--surface-2) 0%, transparent 55%),
    radial-gradient(90% 70% at -10% 100%, var(--bg-deep) 0%, transparent 60%);
  background-attachment: fixed;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  transition: background-color 0.3s, color 0.3s;
}

::selection { background: var(--accent-2); color: #fff; }

/* ─── Layout ─── */
.layout {
  display: flex;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 3rem;
  gap: 4rem;
}

.sidebar {
  position: sticky;
  top: 0;
  align-self: flex-start;
  height: 100vh;
  width: 40%;
  max-width: 460px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 0;
  overflow: hidden;
}

main {
  flex: 1;
  min-width: 0;
  padding: 3rem 0 2rem;
}

/* ─── Molecule decoration ─── */
.molecule {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: var(--accent);
  opacity: 0.10;
  pointer-events: none;
}

.molecule-a { animation: drift-a 26s ease-in-out infinite alternate; transform-origin: 160px 120px; }
.molecule-b { animation: drift-b 32s ease-in-out infinite alternate; transform-origin: 80px 386px; }

@keyframes drift-a {
  from { transform: translateY(0) rotate(0deg); }
  to   { transform: translateY(18px) rotate(7deg); }
}
@keyframes drift-b {
  from { transform: translateY(0) rotate(0deg); }
  to   { transform: translateY(-14px) rotate(-9deg); }
}

/* ─── Sidebar content ─── */
.sidebar-inner { position: relative; }

.avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  border: 1.5px solid var(--accent);
  box-shadow: 0 0 32px var(--glow-strong), inset 0 0 22px var(--glow);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.8rem;
  color: var(--accent);
  font-family: var(--mono);
  font-size: 1.5rem;
  letter-spacing: 0.05em;
}

.eyebrow {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.9rem;
}

h1 {
  font-size: clamp(2.2rem, 3.4vw, 3rem);
  font-weight: 750;
  letter-spacing: -0.02em;
  line-height: 1.05;
  background: linear-gradient(100deg, var(--text) 30%, var(--accent) 110%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.6rem;
}

.sidebar-meta {
  color: var(--text-dim);
  font-size: 0.92rem;
  margin-bottom: 1.4rem;
}

.bio {
  color: var(--text-dim);
  font-size: 0.92rem;
  max-width: 42ch;
  margin-bottom: 1.8rem;
}

/* ─── Key facts ─── */
.key-facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.6rem;
  margin-bottom: 2.2rem;
}

.key-fact dt {
  font-family: var(--mono);
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}

.key-fact dd {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
}

/* ─── Side nav ─── */
.side-nav {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 2.4rem;
}

.side-nav a {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  text-decoration: none;
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.35rem 0;
  transition: color 0.25s;
}

.side-nav .nav-num {
  font-family: var(--mono);
  font-size: 0.65rem;
  color: var(--muted);
  transition: color 0.25s;
}

.side-nav .nav-line {
  width: 24px;
  height: 1px;
  background: var(--border);
  transition: width 0.3s, background 0.3s;
}

.side-nav a:hover,
.side-nav a.active { color: var(--text); }

.side-nav a:hover .nav-line,
.side-nav a.active .nav-line {
  width: 48px;
  background: var(--accent);
}

.side-nav a.active .nav-num { color: var(--accent); }

/* ─── Sidebar actions ─── */
.sidebar-actions {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.6rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--grad);
  color: #fff;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.65rem 1.4rem;
  border-radius: 999px;
  box-shadow: 0 4px 18px var(--glow-strong);
  transition: transform 0.25s, box-shadow 0.25s, filter 0.25s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
  box-shadow: 0 8px 26px var(--glow-strong);
}

.theme-toggle {
  background: none;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}

.theme-toggle:hover { color: var(--accent); border-color: var(--accent); }

.sidebar-contacts {
  display: flex;
  gap: 1.4rem;
}

.sidebar-contacts a {
  color: var(--muted);
  text-decoration: none;
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: color 0.2s;
}

.sidebar-contacts a:hover { color: var(--accent); }

/* ─── Sections ─── */
section { padding: 3.5rem 0; }

section:first-of-type { padding-top: 1rem; }

h2 {
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 2rem;
}

.section-num {
  font-family: var(--mono);
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--accent);
}

/* ─── Cards ─── */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem 1.7rem;
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-3px);
  border-color: var(--border-hover);
  box-shadow: var(--card-shadow), 0 0 0 1px var(--glow);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 0.3rem;
}

.card-title { font-weight: 700; font-size: 1.05rem; }

.card-org {
  font-family: var(--mono);
  font-size: 0.72rem;
  color: var(--text-dim);
  letter-spacing: 0.06em;
}

.card-badge {
  font-family: var(--mono);
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: 999px;
  padding: 0.2rem 0.7rem;
}

.card-sub { color: var(--text-dim); font-size: 0.88rem; margin-bottom: 0.7rem; }

.card-body { color: var(--text-dim); font-size: 0.88rem; }

.card-modules {
  margin-top: 0.9rem;
  padding-top: 0.9rem;
  border-top: 1px solid var(--border);
  font-family: var(--mono);
  font-size: 0.68rem;
  line-height: 1.9;
  color: var(--muted);
}

.card-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-top: 0.6rem;
}

.card-list li {
  color: var(--text-dim);
  font-size: 0.88rem;
  padding-left: 1.1rem;
  position: relative;
}

.card-list li::before {
  content: "▸";
  position: absolute;
  left: 0;
  color: var(--accent);
  font-size: 0.7rem;
  top: 0.25rem;
}

/* ─── Grades ─── */
.grade-row { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 0.8rem; }

.grade {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.35rem 0.8rem;
  font-size: 0.8rem;
  color: var(--text-dim);
}

.grade-sub {
  font-family: var(--mono);
  font-weight: 600;
  color: var(--accent);
}

/* ─── Timeline ─── */
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding-left: 1.6rem;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 0;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: linear-gradient(to bottom, var(--accent), var(--accent-2), transparent);
  opacity: 0.4;
}

.timeline-entry { position: relative; }

.timeline-marker {
  position: absolute;
  left: -1.6rem;
  top: 6px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--glow-strong);
  transform: translateX(-4px);
}

.timeline-marker.small {
  width: 7px;
  height: 7px;
  background: var(--muted);
  box-shadow: none;
  transform: translateX(-3px);
}

.timeline-date {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  color: var(--muted);
  margin-bottom: 0.5rem;
}

/* ─── Featured research card ─── */
.card.featured {
  background:
    linear-gradient(var(--surface), var(--surface)) padding-box,
    linear-gradient(120deg, var(--accent), var(--accent-2)) border-box;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
}

.card.featured::before {
  content: "";
  position: absolute;
  top: -40%;
  right: -20%;
  width: 60%;
  height: 120%;
  background: radial-gradient(circle, var(--glow) 0%, transparent 70%);
  pointer-events: none;
}

.featured-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.6rem;
}

.card-eyebrow {
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.card-headline {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.date-badge {
  font-family: var(--mono);
  font-size: 0.72rem;
  color: var(--accent);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.3rem 0.7rem;
}

.card-institution {
  color: var(--muted);
  font-size: 0.8rem;
  margin-bottom: 0.8rem;
}

.research-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.1rem;
}

.research-tags span {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.3rem 0.75rem;
}

/* ─── Skills ─── */
.skills-layout {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.skill-cat-title {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 0.8rem;
}

.skill-tags { display: flex; flex-wrap: wrap; gap: 0.55rem; }

.skill-tag {
  font-size: 0.8rem;
  color: var(--text-dim);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0.4rem 0.95rem;
  transition: border-color 0.25s, color 0.25s, transform 0.25s;
}

.skill-tag:hover {
  border-color: var(--accent);
  color: var(--text);
  transform: translateY(-2px);
}

.skill-tag.highlight {
  background: var(--grad);
  border: none;
  color: #fff;
  font-weight: 600;
}

/* ─── Contact ─── */
.contact-intro { color: var(--text-dim); font-size: 0.9rem; margin-bottom: 1.5rem; }

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  max-width: 480px;
}

.contact-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.9rem 1.3rem;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
  position: relative;
}

.contact-link:hover {
  transform: translateY(-2px);
  border-color: var(--border-hover);
  box-shadow: var(--card-shadow);
}

.contact-link-label {
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}

.contact-link-value { color: var(--text); font-size: 0.88rem; font-weight: 500; }

.contact-link.copied::after {
  content: "Copied ✓";
  position: absolute;
  right: 1.3rem;
  background: var(--grad);
  color: #fff;
  font-size: 0.68rem;
  font-weight: 600;
  border-radius: 999px;
  padding: 0.25rem 0.7rem;
}

.contact-link.copied .contact-link-value { visibility: hidden; }

/* ─── Footer ─── */
footer {
  display: flex;
  justify-content: space-between;
  padding: 2rem 0 1rem;
  border-top: 1px solid var(--border);
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  color: var(--muted);
}

/* ─── Scroll reveal (hidden-before-reveal only applies when JS is running,
       via the .js class set on <html> in the document head) ─── */
.js .animate-in {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.js .animate-in.visible { opacity: 1; transform: none; }

.js .animate-in:nth-child(2) { transition-delay: 0.08s; }
.js .animate-in:nth-child(3) { transition-delay: 0.16s; }

/* ─── Responsive ─── */
@media (max-width: 900px) {
  .layout { flex-direction: column; padding: 0 1.4rem; gap: 0; }

  .sidebar {
    position: static;
    height: auto;
    width: 100%;
    max-width: none;
    padding: 2.5rem 0 1rem;
    justify-content: flex-start;
  }

  .molecule { opacity: 0.06; }

  .side-nav {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.3rem 1.2rem;
  }

  .side-nav .nav-line { display: none; }

  main { padding-top: 0.5rem; }

  section { padding: 2.5rem 0; }
}

@media (max-width: 480px) {
  h1 { font-size: 2rem; }
  .card { padding: 1.2rem 1.2rem; }
  .featured-header { flex-direction: column; }
  .sidebar-actions { flex-wrap: wrap; }
}

/* ─── Reduced motion ─── */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .molecule-a, .molecule-b { animation: none; }
  .js .animate-in { opacity: 1; transform: none; transition: none; }
  .card, .btn-primary, .skill-tag, .contact-link { transition: none; }
}
```

- [ ] **Step 2: Visual check in browser**

Open `index.html` in a browser.
Expected: dark molecular design renders — sticky sidebar left with glowing avatar, gradient name, key facts, vertical nav, gradient CV button; content cards on the right with timeline.

- [ ] **Step 3: Commit**

```powershell
git add style.css
git commit -m "Rewrite style.css for dark molecular sidebar design"
```

---

### Task 3: Rewrite script.js

**Files:**
- Modify: `script.js` (full replacement)

- [ ] **Step 1: Replace the entire contents of `script.js` with:**

```js
// ─── Theme toggle (persisted; respects prefers-color-scheme on first visit) ───
const themeBtn = document.getElementById('theme-toggle');
const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'light' ? 'Dark' : 'Light';
};
const stored = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
applyTheme(stored || (prefersLight ? 'light' : 'dark'));
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

// ─── Scroll-triggered entrance animations ───
const animatedEls = document.querySelectorAll('.animate-in');
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
animatedEls.forEach(el => animObserver.observe(el));

// ─── Active nav link on scroll (scroll-spy) ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.side-nav a[href^="#"]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => navObserver.observe(s));

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

- [ ] **Step 2: Functional check in browser**

Open `index.html`, then verify:
- Theme toggle switches dark ↔ light and survives a page refresh
- Scrolling highlights the matching sidebar nav link
- Cards fade/slide in as you scroll
- Clicking Email/Phone contact cards shows "Copied ✓"

Expected: all four behaviors work, no console errors (F12 → Console).

- [ ] **Step 3: Commit**

```powershell
git add script.js
git commit -m "Rewrite script.js: theme persistence, scroll-spy, reveals, copy-to-clipboard"
```

---

### Task 4: Full verification & deploy

**Files:** none (verification + push)

- [ ] **Step 1: Desktop walkthrough**

Open `index.html` in a browser at full width. Check against the spec:
- Sidebar sticky while content scrolls; molecule line-art drifting slowly behind sidebar content
- All five sections present with correct text (Education, Research, Experience, Skills, Contact)
- "Download CV" downloads `Samuel_Leeming_CV.pdf`
- All sidebar nav anchors scroll to the right section
- LinkedIn link opens in new tab

- [ ] **Step 2: Mobile walkthrough**

DevTools (F12) → responsive mode → 390px wide:
- Sidebar collapses to a stacked header, nav wraps horizontally, content single-column
- No horizontal overflow; cards readable

- [ ] **Step 3: Reduced motion & no-JS checks**

- DevTools → Rendering → emulate `prefers-reduced-motion: reduce` → no drifting molecule, content visible without scrolling animations
- DevTools → Settings → disable JavaScript → page fully readable in dark theme, all content visible (`.animate-in` elements must still be visible — confirmed by the reduced-motion CSS only; if hidden, fix by adding a `no-js` fallback before deploying)

- [ ] **Step 4: Lighthouse sanity pass**

DevTools → Lighthouse → run Performance + Accessibility on the local file or via a quick local server (`python -m http.server`).
Expected: Accessibility ≥ 90, no contrast failures.

- [ ] **Step 5: Deploy**

```powershell
git push
```

Wait ~1 minute, then check https://sjleeming.github.io in a browser (hard refresh, Ctrl+F5).
Expected: new design live, both themes working.

- [ ] **Step 6: Update CLAUDE.md design principles**

Update the "Design principles" section of `CLAUDE.md` to match the new design (invoke `claude-md-management:revise-claude-md` per project workflow instructions):

```markdown
## Design principles
- Refined dark "molecular" aesthetic (default) with a matching light theme; toggle persisted in localStorage
- Layout: sticky left sidebar (identity, nav, CV button) + scrolling content column; stacks on mobile (<900px)
- Colour palette: deep navy backgrounds (#090e18/#101b2e), light-blue accent (#6fd3ff), blue→violet gradient (#3aa7e0→#7b6cf6)
- Typography: Inter for body/display, IBM Plex Mono for labels/eyebrows
- Motion: scroll reveals, hover lifts, ambient molecule drift — all guarded by prefers-reduced-motion
```

```powershell
git add CLAUDE.md
git commit -m "Update CLAUDE.md design principles for visual overhaul"
git push
```
```

---

## No-JS note

The reveal-hiding CSS is scoped under a `.js` class that a one-line inline script in `<head>` adds to `<html>`. With JavaScript disabled the class is never added, so all `.animate-in` content is fully visible — satisfying the spec's no-JS requirement. This is already built into the Task 1 HTML and Task 2 CSS above; no extra work needed.
