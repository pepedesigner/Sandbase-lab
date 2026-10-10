# SandBase Lab

**An Agent Skills catalog you can run right in the browser.** Browse original Skills for web, slides, image and video work, then hit *Run in browser* and watch the Skill produce its result — no install, no API keys, no cost.

A standalone demo built on the [SandBase](https://www.sandbase.ai) design language: risograph-violet and lime spot inks on paper/ink stock, square corners, mono micro-labels, and no resting shadows.

![SandBase Lab home](docs/screenshots/home.png)

---

## What it is

SandBase Lab is the landing page for a **new `Lab` entry in the SandBase navigation** (replacing the current `/lab`). Functionally it mirrors a Skill marketplace end to end:

- **Lab home** — hero, featured Skills, free Skills, trending by category (Web / Slides / Video / Image), how a Skill is made, connect-your-agent, pricing and FAQ.
- **Catalog** (`/lab/skills`) — search plus category and access filters over the whole library.
- **Skill detail** (`/lab/skills/[slug]`) — preview gallery, stats, what you get / good fit / not for, tags, per-Skill FAQ and similar Skills.
- **Run workbench** (`/lab/run/[slug]`) — the differentiator: run any Skill in the browser.
- **Pricing** (`/lab/pricing`) — one-plan pricing with a full FAQ.

The only functional difference from a plain Skills catalog: **every Skill can be run in the browser.**

<p align="center">
  <img src="docs/screenshots/skills.png" width="49%" alt="Skills catalog" />
  <img src="docs/screenshots/detail.png" width="49%" alt="Skill detail" />
</p>

## Run in browser

Open any Skill and press **Run in browser**. The workbench replays the workflow the Skill hands your agent — reading `SKILL.md`, planning, generating, rendering — streaming a live transcript with a progress bar, step counter and elapsed time, then reveals the result and lets you download the transcript.

> **This run is simulated.** The demo has no backend and calls no model, so it works offline and for free. The transcript, timings and artwork are generated deterministically from the Skill's own definition, and the run respects `prefers-reduced-motion` (it completes instantly instead of streaming).

![Run workbench](docs/screenshots/run.png)

<p align="center">
  <img src="docs/screenshots/mobile-home.png" width="27%" alt="Lab on mobile" />
  <img src="docs/screenshots/mobile-drawer.png" width="27%" alt="Mobile navigation drawer" />
  <img src="docs/screenshots/home-dark.png" width="40%" alt="Lab in dark mode" />
</p>

## Highlights

- **Faithful to the SandBase design language** — the colour tokens, type ramp (`Clash Grotesk` + mono labels), square corners, `pixel-tile` grids and registration marks are lifted straight from the SandBase front end, so the Lab drops into the real site without a redesign.
- **Light & dark** — the full day/night token set with a theme control in the header; defaults to the paper look.
- **Catalog that works** — search, multi-select category facets with counts, a free/premium filter and real sorting (featured, most installed, newest), with an empty state.
- **Real previews** — every card, gallery and run result shows the Skill's actual published result artwork (downloaded locally, no hotlinking), with a procedural SVG scene as a fallback if an image is missing. See [`docs/previews.md`](docs/previews.md).
- **Self-hosted fonts, no third-party requests** — Clash Grotesk and JetBrains Mono are loaded through `next/font`, so they are bundled and preloaded from this origin. No external stylesheet, no font CDN, no render-blocking request.
- **Accessible** — semantic landmarks, one `h1` per page with no skipped heading levels, a skip link, keyboard-friendly disclosures, one on-brand focus ring and reduced-motion fallbacks throughout.
- **Responsive** — verified from 390px to 1440px with no horizontal overflow; the mobile navigation opens as a fixed, dismissable sheet.
- **Static** — every route is prerendered, plus `robots.txt` and a generated `sitemap.xml`.

## Tech stack

`Next.js 14` (App Router) · `React 18` · `TypeScript` · `Tailwind CSS 3.4` · CSS Modules · `lucide-react` · ESLint. No database, no backend, no environment variables.

## Getting started

```bash
npm install
npm run dev      # http://localhost:4317
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint (next/core-web-vitals)
npm run typecheck  # tsc --noEmit
```

## Project structure

```
src/
  app/
    layout.tsx              # fonts (next/font), theme bootstrap, header + footer
    globals.css             # design tokens (colors, type, pixel grid)
    robots.ts sitemap.ts    # generated robots.txt and sitemap.xml
    lab/
      page.tsx              # Lab home
      skills/page.tsx       # catalog
      skills/[slug]/page.tsx# skill detail
      run/[slug]/page.tsx   # run workbench
      pricing/page.tsx      # pricing
  components/
    site-header.tsx         # SandBase nav incl. the new Lab entry
    ui/                     # design-system primitives (button, section, …)
    lab/                    # skill card, image, artifact preview, badges, FAQ, …
  features/lab/
    SkillCatalog.tsx        # search, filters and sorting
    RunConsole.tsx          # the run workbench
    run-simulator.ts        # deterministic streaming engine
  content/                  # skills, categories, agents, pricing, faq
  fonts/                    # Clash Grotesk webfont source
public/
  skills/<slug>/            # real result previews (card / main / alt-N)
  logos/agents/             # host-agent marks
```

## Design language

Ink `#0e0b1a` on paper `#f2f0f3`, with two spot inks — violet `#8b6fff` and lime `#d9ff43`. Headings set in **Clash Grotesk** at weight 500; everything data-ish (labels, ids, units, log lines) in **JetBrains Mono**, uppercase and tracked. Corners are square, cards are borderless tone changes, and motion is short, stepped and always paired with a reduced-motion fallback.

## Notes

This is an independent demo that reuses the SandBase visual language for illustrative purposes. Skill names, descriptions and preview artwork are the published results from [skillry.dev](https://skillry.dev); product names and logos of third-party agents (Claude Code, Codex, Cursor, Gemini, …) belong to their respective owners.

## License

[MIT](LICENSE)
