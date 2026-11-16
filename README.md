# Boden Harris — Portfolio

Personal portfolio of Boden Harris, a Computer Science student at UMass Amherst, with a pixel-art space theme. Live at [bodenharris.vercel.app](https://bodenharris.vercel.app/).

## Tech Stack

- **[Svelte](https://svelte.dev)** (Svelte 5) - frontend framework
- **[SvelteKit](https://svelte.dev/docs/kit)** (SvelteKit 3) - full-stack framework, deployed with the Vercel adapter
- **[Tailwind CSS](https://tailwindcss.com)** (Tailwind 4) - styling
- **[shadcn-svelte](https://shadcn-svelte.com)** - UI components (built on **[bits-ui](https://bits-ui.com)**)

## Getting Started

```sh
npm i
npm run dev
```

## Where things live

- `src/lib/content.ts` - all the text: projects, experience, skills, links
- `src/routes/layout.css` - theme colours (day and night) and the pixel utilities
- `src/lib/pixel/` - the canvas art: starfield, footer horizon, sprites
- `src/lib/contact.remote.ts` - the contact form, forwarded to Formspree
