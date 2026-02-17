# ARYVERSE — Celestial Ascent

> Next-generation digital experiences at the intersection of AI, 3D Animation, Gaming, and Interactive Technology.

## Overview

ARYVERSE is an immersive web platform that combines cutting-edge frontend technologies with a celestial fantasy theme. Users explore interactive kingdoms, engage with 3D visualizations, and experience fluid, cinematic UI transitions — all within a dark, gold-accented design system.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS + custom design tokens
- **3D Graphics:** Three.js via React Three Fiber + Drei
- **Animation:** Framer Motion + GSAP
- **Smooth Scrolling:** Lenis
- **UI Components:** shadcn/ui (Radix primitives)
- **Testing:** Vitest + React Testing Library
- **Package Manager:** Bun

## Features

- **Enter The Realm** — Full-screen cinematic entry with warp-speed particle effects
- **Glassmorphism Navbar** — Transparent floating nav with gold-accented icons; reveals on scroll with staggered animation
- **3D Crystal Orb** — Interactive hero element powered by React Three Fiber
- **Star Particle Field** — GPU-accelerated background star layer with additive blending
- **Kingdom Cards** — Parallax-scrolling feature sections showcasing app modules
- **Careers Page** — Full job listing with category filters, detail modals, and integrated application form (Google Forms / Google Sheets backend)
- **Custom Cursor** — Animated reticle cursor system
- **Legal Modals** — Privacy, Terms, and Cookie policy overlays

## Pages

| Route       | Description                                  |
|-------------|----------------------------------------------|
| `/`         | Home — Hero, Kingdoms, Footer                |
| `/careers`  | Careers — Job listings & application form    |
| `*`         | 404 — Not Found                              |

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Run tests
bun run test

# Lint
bun run lint
```

## Project Structure

```
src/
├── assets/          # Images, textures
├── components/      # Reusable components (Navbar, Footer, ParticleField, etc.)
│   └── ui/          # shadcn/ui primitives
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── pages/           # Route-level page components
└── test/            # Test files
```

## Google Forms Integration (Careers)

The careers application form submits data to a Google Form. To configure:

1. Create a Google Form with fields: **Name, Email, Phone, Position, Portfolio, Resume Link, Cover Letter**
2. Open the form → Get pre-filled link → Extract the form action URL and `entry.*` field IDs
3. Update the constants in `src/components/ApplicationForm.tsx`:
   - `GOOGLE_FORM_ACTION_URL` — your form action URL
   - `FORM_FIELD_IDS` — mapping of field names to `entry.*` IDs

## Design System

| Token       | Value                        |
|-------------|------------------------------|
| Void        | `hsl(222, 47%, 5%)`         |
| Gold        | `hsl(45, 100%, 50%)`        |
| Stardust    | `hsl(45, 100%, 96%)`        |
| Font Display| Cinzel (serif)               |
| Font Body   | Inter (sans-serif)           |

## License

© 2026 ARYVERSE Studios. All Rights Reserved.
