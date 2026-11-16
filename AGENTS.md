# AGENTS.md

Keep this file current: if a change makes anything here wrong or incomplete, update it in the same change.

## Tech Stack

See the Tech Stack section of `README.md`. If you add, remove, or change a core technology, update it in the same change.

Most of this tech stack had a recent major version, so your training data is likely stale. When unsure about an API, check the official docs instead of guessing.

## Skills

- Use the **svelte-code-writer** and **svelte-core-bestpractices** skills whenever you write or edit Svelte code. Remote functions are enabled, so use those. The enhanced-img plugin is added, so use that for images. Always check the official docs.
- Use the **shadcn-svelte** skill whenever you add or change UI. The component source lives in `src/lib/components/ui` and is ours to change: add components with the CLI as needed and edit existing ones freely.
- If a skill is missing, say so in your reply and ask the user to install it.

## Project notes

- Site copy lives in `src/lib/content.ts`; change it there, not in markup.
- The look is a pixel-art theme: hard 4px edges, `steps()` easing, no rounded corners or blur. Colour tokens and the `pixel-box` / `pixel-button` / `label-mono` utilities are in `src/routes/layout.css`, and the shadcn components are restyled to match.
- Night is the `.dark` class on `<html>`, set before paint by the script in `src/app.html`.
