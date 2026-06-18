# DrawingGarden 🌱

A creative drawing-prompt app that lets you cultivate a personal garden of ideas, then pick one at random as today's muse.

## Quick Start

```bash
npm install
npm run dev
# → open http://localhost:3000
```

## How It Works

| Tab | What it does |
|---|---|
| **Input** | Add drawing themes (one per line). They appear as coloured "seed" pills in your Garden of Ideas. Hover a pill and click × to remove it. |
| **Prompt** | Click **Get Seed** to randomly select one theme from your garden as today's drawing prompt. |

Themes persist across browser sessions via `localStorage`.

---

## Project Structure

```
app/
├── layout.jsx          ← root layout, font wiring (DM Sans + DM Serif Display)
├── globals.css         ← Tailwind directives, gradient background, animations
├── page.jsx            ← client root: state management + tab routing
└── components/
    ├── Header.jsx      ← sticky nav with logo, tabs, theme count badge
    ├── InputView.jsx   ← textarea, save button, pill grid
    ├── PromptView.jsx  ← random-pick button, animated reveal card
    └── ThemePill.jsx   ← pastel pill with deterministic colour + remove button
```

## Customisation Tips

- **Colours** — edit `PALETTE` in `ThemePill.jsx` to swap the pill tones.
- **Background** — tweak the radial-gradient stops inside `.garden-bg` in `globals.css`.
- **Fonts** — swap `DM_Sans` / `DM_Serif_Display` in `layout.jsx` for any Google Font pair.
- **Persistence** — replace the `localStorage` calls in `page.jsx` with an API route + database for multi-device sync.

## Tech Stack

- [Next.js 14](https://nextjs.org/) — App Router, React Server / Client Components
- [Tailwind CSS 3](https://tailwindcss.com/) — utility-first styling
- `next/font/google` — zero-layout-shift Google Fonts
- `localStorage` — zero-dependency client-side persistence
