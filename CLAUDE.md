# Sam Leeming CV Website

## What this is
A personal CV/portfolio website for Samuel Leeming, hosted on GitHub Pages at https://sjleeming.github.io

## Stack
Plain HTML + CSS + JS. No build step, no frameworks. Push to GitHub and it deploys automatically.

## Files
- `index.html` — all page content (single page, smooth scroll)
- `style.css` — all styling
- `script.js` — theme toggle, scroll-spy nav, scroll reveals, copy-to-clipboard contacts

## Deploying changes
1. Edit files locally
2. In PowerShell from this folder:
   ```
   git add .
   git commit -m "describe your change"
   git push
   ```
3. Site updates within ~1 minute at https://sjleeming.github.io

## GitHub
- Repo: https://github.com/sjleeming/sjleeming.github.io
- Branch: main
- Pages source: main / (root)

## Design principles
- Refined dark "molecular" aesthetic (default) with matching light theme; toggle persisted in localStorage, initial theme set FOUC-free by inline `<head>` script
- Layout: sticky left sidebar (identity, nav, CV button, molecule SVG) + scrolling content column; stacks below 900px
- Colour palette: deep navy (#090e18 bg, #101b2e cards), light-blue accent (#6fd3ff), blue→violet gradient (#3aa7e0→#7b6cf6); light theme equivalents in `[data-theme="light"]`
- Typography: Inter for body/display, IBM Plex Mono for labels/eyebrows
- Motion: scroll reveals (`.animate-in` gated behind `html.js` class for no-JS support), hover lifts, molecule drift — all guarded by prefers-reduced-motion

## Content source
Based on Samuel_Leeming_CV.docx. Key sections: About, Education, Research, Experience, Skills, Contact.

## Workflow instructions
- When updating or creating any `.md` files, invoke the `claude-md-management` skill first (use `claude-md-management:revise-claude-md` when updating CLAUDE.md with session learnings, or `claude-md-management:claude-md-improver` when auditing/improving CLAUDE.md quality).

## Potential improvements discussed
- Profile photo
- Contact form
- Dissertation section
- Blog/notes section
- og:image / social preview image (flagged in 2026-06 review)

## Gotchas
- If `git push` fails with "Invalid username or token": clear the stale credential (`git credential reject` fed protocol=https/host=github.com via temp file), then push again — Credential Manager prompts a fresh browser sign-in.
