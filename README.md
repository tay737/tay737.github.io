# tay737 — portfolio

**A single-page portfolio: background, work, certifications and contact.**

![deployed](https://img.shields.io/badge/deployed-GitHub%20Pages-2EA043?style=flat-square&logo=githubpages&logoColor=white)
![React](https://img.shields.io/badge/React%2019-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite%206-646CFF?style=flat-square&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind%204-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-000000?style=flat-square&logo=framer&logoColor=white)

Live at **[tay737.github.io](https://tay737.github.io)**.

A static, single-page React application with no server and no CMS: every word,
badge and project card comes either from a committed data file or from a public
API called in the browser. It is a personal site rather than a template, tuned
for the two things a portfolio actually has to do — say who you are in one
screen, and make the work one click away.

> [!NOTE]
> **Personal project.** Built for my own portfolio and not intended for
> redistribution — see [Disclaimer](#disclaimer).

---

## Contents

- [What it is](#what-it-is)
- [Sections](#sections)
- [Screenshots](#screenshots)
- [How it is built](#how-it-is-built)
- [Data snapshots](#data-snapshots)
- [Projects grid](#projects-grid)
- [Design system](#design-system)
- [Getting started](#getting-started)
- [Repository layout](#repository-layout)
- [Disclaimer](#disclaimer)

---

## What it is

One page, ten sections, no routing. The navigation is a magnified dock on mobile
and a sticky bar on desktop; everything else is scroll. Motion carries the
choreography — a splash screen, scroll progress, parallax and blur-in — and is
switched off wholesale for anyone who asks for reduced motion.

The design is a token system, not a pile of one-off styles: colours, radii,
shadows and glass surfaces live as CSS custom properties in `src/index.css`,
which Tailwind 4 consumes through `@theme`. Light and dark are both first-class,
and the theme is remembered across visits.

---

## Sections

Composed in `src/App.tsx`, in this order:

| Section | Component | What it holds |
| --- | --- | --- |
| Hero | `Hero.tsx` | Name, one-line positioning, primary actions, spotlight |
| About | `About.tsx` | Background and how I got here |
| Career | `Career.tsx` | Study and work timeline |
| Projects | `GitHubRepos.tsx` | Repository cards pulled live from GitHub |
| Skills | `Skills.tsx` | Grouped capability areas |
| Certifications | `Certifications.tsx` | Credly badges from a synced snapshot |
| Systems | `Systems.tsx` | The threat-telemetry panel |
| Setup | `Setup.tsx` | Hardware and tooling |
| Interests | `Interests.tsx` | What I do away from a terminal |
| Contact | `Contact.tsx` | Email, GitHub, LinkedIn, with background beams |

Around them: `Navbar`, `ScrollProgress`, `SplashScreen` (replayable from the
nav), `Footer`, and a `SmoothCursor` that follows the pointer on desktop.

---

## Screenshots

Two full-page captures of the deployed build, 3412×1972 each:

![Screenshot of the deployed portfolio, view 1](https://github.com/user-attachments/assets/03af43b3-c785-4d8c-a03a-39bb2c2edeb5)

![Screenshot of the deployed portfolio, view 2](https://github.com/user-attachments/assets/b3c2d402-8b4f-4cec-860a-06bc94897f43)

---

## How it is built

A static build with no runtime backend:

```text
   npm run build
        │
        ├─ prebuild ──► npm run sync
        │                   ├─ sync:credly  ──► src/data/credly.json
        │                   └─ sync:threat  ──► src/data/threat.json
        │
        ├─ vite build ──► dist/            (base './', hashed assets)
        │
        └─ gh-pages ────► GitHub Pages     (gh-pages -d dist)
```

| Layer | Choice |
| --- | --- |
| Framework | React 19, no router — one page, hash-free section anchors |
| Build | Vite 6 with `@vitejs/plugin-react`, `base: './'` for Pages |
| Styling | Tailwind CSS 4 via `@tailwindcss/vite`, tokens in `src/index.css` |
| Components | shadcn/ui (`new-york`, neutral base) installed from three registries |
| Motion | `motion` (Motion for React), wrapped in `MotionConfig reducedMotion="user"` |
| Theming | `next-themes`, default light, class-based `.dark` |
| Icons | `lucide-react`, plus `@coreui/icons` for brand marks |

Because the output is pure static files, hosting costs nothing and there is
nothing to keep awake — the trade is that anything dynamic has to be fetched
from a public API by the visitor's browser.

---

## Data snapshots

Two scripts pull third-party data at build time and commit the result as JSON,
so a visitor never waits on someone else's API and the page still renders if
that API is down.

**Certifications** — `scripts/sync-credly.mjs` fetches
`credly.com/users/tay737/badges.json`, keeps accepted public badges, and writes
`src/data/credly.json` with name, issuer, issue date, image, verification URL
and up to four skills, newest first. Six badges are currently published.

---

## Projects grid

The repository cards are the only content fetched at runtime.
`src/hooks/useRepos.ts` calls
`api.github.com/users/tay737/repos?sort=updated&per_page=6` in the browser and
renders stars, forks and language. Each card links straight to its repository —
there are no separate project pages to keep in sync.

The hook is deliberately defensive: a module-level cache means one request per
page load, an in-flight promise is shared so a remount cannot duplicate the call,
a failed request resolves to an empty list rather than throwing, and the effect
guards against setting state after unmount. Unauthenticated GitHub API calls are
rate-limited per IP, so the cache is doing real work.

---

## Design system

Components come from the shadcn CLI against three registries, declared in
`components.json`, and live in `src/components` where they can be edited freely:

| Registry | Contributes |
| --- | --- |
| `@magicui` | Shiny text, marquee, magic-card spotlight, magnified dock |
| `@aceternity` | Hero spotlight, text-generate pull quote, contact background beams |
| `@animate-ui` | Animated Lucide icons (mail, arrow-right, terminal) |

Locally written pieces sit alongside them:

| File | What it does |
| --- | --- |
| `ui/ripple-button.tsx` | The click ripple — implemented here, not installed |
| `ui/smooth-cursor.tsx` | The pointer follower, disabled on touch |
| `ui/TechIcon.tsx` | Brand marks from CoreUI's icon set |
| `ui/blur-in.tsx`, `ui/fade-text.tsx` | Text entrances used across sections |
| `ui/terminal.tsx` | The typewriter terminal in Setup |
| `scripts/generate-world-dots.mjs` | Builds the dotted world map from Natural Earth GeoJSON (`ne_110m_land`), stepping 2.6° across a 1000×466 canvas |

Design tokens are CSS variables rather than Tailwind utilities, so
`--bg-color`, `--surface-*`, `--glass-*` and the accent set can be retuned in one
place and every surface follows — including the glass panels, which need a
different fill in each theme to stay readable.

---

## Repository layout

```text
index.html                  single entry, fonts preconnected
src/App.tsx                 section composition and splash state
src/data.ts                 profile constants (name, links, username)
src/data/*.json             build-time snapshots: credly.json, threat.json
src/components/             sections, shared pieces, ui/
src/hooks/useRepos.ts       GitHub repository fetch, cached
scripts/                    sync-credly, sync-threat, generate-world-dots
public/icons/               brand icons served from the site
dist/                       committed build output published to Pages
```
---

## Disclaimer

This project is for my personal portfolio use and is not intended for any form of
redistribution.

---

**[tay737.github.io](https://tay737.github.io)** · [github.com/tay737](https://github.com/tay737) · [Credly](https://www.credly.com/users/tay737)
