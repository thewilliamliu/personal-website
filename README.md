# personal website

my corner of the internet, live at [wlmliu.com](https://www.wlmliu.com). next.js + tailwind, deployed on vercel.

## the background

the animation is the [aizawa attractor](https://www.wlmliu.com/attractor) — 3,000 particles integrating three coupled ODEs on a 2d canvas, every frame. a few things i learned getting it to look right:

- naive seeding makes the swarm collapse into a thin filament (chaos synchronizes everything you start close together). instead, a 60k-step orbit is precomputed and particles are scattered uniformly along it, so the shape always has volume.
- scrolling doesn't move the page — it tilts the camera. the text stays put while the attractor tours from side-on to top-down.
- particles dim to ~25% inside an ellipse around the text so the type stays readable without a card behind it. earlier versions used a frosted glass box; killing it was the single biggest visual improvement.

## design choices

- **no boxes.** text sits directly on the canvas. contrast comes from dimming the particles, not from drawing containers.
- **two fonts, one toggle.** system sans (sf pro on apple devices) or lora, each with its own size/leading/tracking since serifs render smaller at equal px. preference persists in localStorage and applies before first paint to avoid a flash.
- **warm, not neutral.** dark mode is `#171412` (brown-black), light mode is a grayed cream. pure `#000`/`#fff` felt sterile.
- **controls, not chrome.** a speed dial (drag for fine control, click to cycle presets), a ∫ button explaining the math, theme and font toggles. top-right on desktop, bottom-center on mobile. internal pages slow the animation to 0.1x so it doesn't compete with reading.
- **fonts self-hosted** via fontsource — no google fonts request, builds work offline.

## running it

```bash
npm install
npm run dev
```

everything content-wise lives in `app/` — one file per page, plain jsx, no cms.
