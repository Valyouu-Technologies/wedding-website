# Sudeepth & Sukritha — Wedding Invitation

Live: https://its-suk-sud-era.vercel.app

A single-page invitation built with React + Vite.

- **Phones** play the intro video (doors → temple → arch), then the invitation
  scrolls inside the fixed arch.
- **Tablets and desktops** skip the intro and show the wide temple-corridor
  background, with the invitation inside its central arch.

## Editing content

All text, dates, venues and event cards live in [`src/data.js`](src/data.js).
Media files are in `public/` (intro, backgrounds) and `public/media/` (event
videos, posters, dress-code images).

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Deploying

The repo is connected to Vercel. Every push to `main` redeploys the live link
automatically:

```bash
git add . && git commit -m "Update" && git push
```
