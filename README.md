# Momentum — Focus. Plan. Achieve.

**Version 1.0.0** — plain HTML/CSS/JS, no build step (same setup as a typical portfolio site).

## Run it

**Locally:** just double-click `index.html`, or open it in your browser.

**Deploy to Vercel:**
1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset: **Other** (no build command, no output directory needed — it's static). Deploy.

**Deploy to GitHub Pages:**
1. Push this folder to a GitHub repo.
2. Repo Settings → Pages → set source to the branch/folder containing `index.html`. Done.

No `npm install`, no build command — upload the files and it works, exactly like your portfolio site.

## Files

```
index.html        Page structure
css/style.css      All styling (glass UI, animated gradient background, dark/light mode)
js/app.js          All app logic (tasks, storage, export, theme)
assets/            Logo, favicons, PWA manifest
```

## Features

- Add tasks with notes, category, priority, due date, subtasks, and an optional daily-repeat toggle
- Today / Upcoming / All / Completed views, a completion ring, and a day-streak counter
- Dark/light mode (remembers your choice)
- Export tasks + subtasks to **Excel (.xlsx)**, **Word (.doc)**, or **PDF** (uses free CDN libraries — no install needed, just an internet connection when you export)
- **Backup / Restore** as JSON to carry your tasks between devices — download a backup on one device, restore it on the other
- All data is stored in the browser (`localStorage`) — no account, no server

## Notes

- Export relies on three small libraries loaded from a CDN (`cdnjs.cloudflare.com`) — that's the only time the app needs internet access; everything else works fully offline once loaded.
- To change branding, replace `assets/logo-icon-light.png` (used in light mode) and `assets/logo-icon-dark.png` (used in dark mode) — both should be transparent PNGs — plus the favicon files in `assets/` (keep the same filenames), then swap the colors in `css/style.css` if you want a different palette.
- Deleting a daily-repeating task removes the whole recurring series (not just that day's copy) — the app asks you to confirm before doing this.
- Bump `APP_VERSION` near the top of `js/app.js` when you ship changes.
