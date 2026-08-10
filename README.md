# Momentum — Focus. Plan. Achieve.

**Version 3.3.0** — plain HTML/CSS/JS, no build step (same setup as a typical portfolio site).

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
js/app.js          All app logic (tasks, storage, export, theme, coach, changelog)
assets/            Logo (light/dark variants), favicons, PWA manifest
CHANGELOG.md       Version history
```

## Features

- Add tasks with notes, category, priority, due date, subtasks, and an optional daily-repeat toggle
- Today / Upcoming / All / Completed views, a completion ring, and a day-streak counter
- Dark/light mode (remembers your choice), with a logo that swaps to match
- Export tasks + subtasks to **Excel (.xlsx)**, **Word (.doc)**, or **PDF** (uses free CDN libraries — no install needed, just an internet connection when you export)
- **Backup / Restore** as JSON or Excel, to carry your tasks between devices — download a backup on one device, restore it on the other. (Excel restore doesn't preserve task notes — use JSON for full-fidelity backups.)
- **Momentum Coach** — a panel with a few observations about your current tasks (overdue items, streaks, stale high-priority tasks, etc.), computed entirely from your local data. No account, no external API calls.
- **What's New** — see what changed in the current version any time; it also opens automatically once after an update.
- All data is stored in the browser (`localStorage`) — no account, no server

## Notes

- Export relies on three small libraries loaded from a CDN (`cdnjs.cloudflare.com`) — that's the only time the app needs internet access; everything else works fully offline once loaded.
- To change branding, replace `assets/logo-icon-light.png` (light mode) and `assets/logo-icon-dark.png` (dark mode). The background is a soft animated ambient gradient defined entirely in CSS (see the `.ambient` rules in `css/style.css`) — no image files involved, so you can retint it there directly.
- Deleting a daily-repeating task removes the whole recurring series (not just that day's copy) — the app asks you to confirm before doing this.
- Bump `APP_VERSION` near the top of `js/app.js` when you ship changes, and add an entry to the `CHANGELOG` array in the same file (shown in the "What's New" panel) and to `CHANGELOG.md`.
