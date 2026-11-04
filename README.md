# Portfolio

Built with **React, Vite, TypeScript, Tailwind CSS.**

## Interface stack

- **Motion** (`motion/react`) — page-load choreography, scroll parallax, layout transitions and reduced-motion handling.
- **Magic UI** — animated shiny text, marquee, magic-card spotlight surfaces and the magnified mobile dock navigation.
- **Aceternity UI** — hero spotlight, text-generate pull quote and the contact background beams.
- **Animate UI** — animated Lucide icons (mail, arrow-right, terminal).
- **Ripplix** — Ripplix (ripplix.com) is an animation reference catalogue, not an installable package. Its signature click ripple is implemented locally in `src/components/ui/ripple-button.tsx`.

Components are installed through the shadcn CLI using the registries in `components.json`, so they live in `src/components` and can be customised freely.

## Projects

Every repository card in the grid links straight to that repository on GitHub — there are no separate project pages. Cards are populated from the public GitHub API by `src/hooks/useRepos.ts`.

## Certifications

Credly badges are rendered from `src/data/credly.json`. `npm run sync:credly` pulls the public badge feed from `https://www.credly.com/users/tay737/badges.json`; the sync also runs automatically before every build and keeps the existing snapshot if Credly is unreachable.

## Live honeypot telemetry

The `ssh-honeypot` project page renders a native threat map, timeline, country/username rankings and a recent-attempt log from `src/data/threat.json`. `npm run sync:threat` refreshes that snapshot from the panel query API of the Grafana public dashboard, which reads the honeypot's InfluxDB bucket, and the sync runs automatically before every build.

Grafana serves its dashboards with `X-Frame-Options: deny`, and its `/d-solo` panel routes require a signed-in session, so the page renders the panels natively rather than iframing them. Every build refreshes the snapshot and the section links out to the always-live dashboard.

Intended to function as a showcase for:
- Background
- Skills
- Projects
- Interests
- Contact details

Attempted to optimise the experience for desktop and mobile devices, to feel as seamless as possible.

## Screenshots
<img width="3412" height="1972" alt="image" src="https://github.com/user-attachments/assets/03af43b3-c785-4d8c-a03a-39bb2c2edeb5" />

<img width="3412" height="1972" alt="image" src="https://github.com/user-attachments/assets/b3c2d402-8b4f-4cec-860a-06bc94897f43" />

## Disclaimer
This project is for my personal portfolio use and is not intended for any form of redistribution.
