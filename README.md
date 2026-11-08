# Momentum — Focus. Plan. Achieve.

**Version 3.7.0** — plain HTML/CSS/JS, no build step (same setup as a typical portfolio site).

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
- Export tasks + subtasks to **Excel (.xlsx)**, **Word (.doc)**, or **PDF** (uses free CDN libraries — no install needed, just an internet connection when you export). Word and PDF exports include the Momentum logo; the Excel export gets a bold brand header line instead, since the free spreadsheet library used here can't embed real images into .xlsx files.
- **Backup / Restore** as JSON or Excel, to carry your tasks between devices — download a backup on one device, restore it on the other. (Excel restore doesn't preserve task notes — use JSON for full-fidelity backups.)
- **Pin a task** — pinned tasks reappear fresh at the top of your list every day (each day gets its own copy, so streaks and history still work). Unpin or delete to stop; deleting a pinned task removes the whole series.
- **Edit a task** — the pencil icon opens the same form used to add tasks, pre-filled. Subtask ids and checked states are preserved, so editing never loses progress.
- **Share a task** — creates a link with the task and its progress stored in the URL's `#` part (never sent to any server). Whoever opens it sees a read-only view and can save a copy. It is a *snapshot*: this app has no backend, so a link can't update live — share a fresh one after making progress. Tasks with very many subtasks make long links that some chat apps may truncate.
- **Import a document as a task** — upload a PDF, Word (.docx), Excel, or JSON file and it becomes a draft task with the document's bullet points, list items, spreadsheet cells, or JSON array entries turned into subtasks. Opens in the New Task form for you to review/edit before saving.
- **Momentum Coach** — a panel with a few observations about your current tasks (overdue items, streaks, stale high-priority tasks, etc.), computed entirely from your local data. No account, no external API calls.
- **What's New** — see what changed in the current version any time; it also opens automatically once after an update.
- **Install as an app** — a dedicated "Install App" button appears in the header whenever the app is installable (Chrome/Edge/Android support one-tap install; iOS Safari needs the manual "Add to Home Screen" step, which the button will tell you). It disappears automatically once installed or when already running as the installed app.
- **Priority task reminders** — opt in from the same menu for a browser notification about open high-priority tasks. This checks on load and hourly while the tab is open; it's a local notification only (no backend), so nothing arrives while the app is fully closed.
- A small promo card links to [Daybook](https://daybook-az.vercel.app/) for expense & income tracking.
- All data is stored in the browser (`localStorage`) — no account, no server

## Troubleshooting: installed app opens to a 404 or a file listing

This means the icon was installed **before** the v3.4.1 fix, back when the manifest's `start_url` pointed at the wrong place. Browsers bake that URL into the installed shortcut at install time and don't re-read it later — so simply redeploying the fix doesn't reach an icon that's already installed. You have to remove it and reinstall:

1. **Uninstall the old shortcut:**
   - **Windows (Chrome/Edge):** right-click the Start Menu/Desktop icon → Uninstall. Or open `chrome://apps`, right-click Momentum → Remove.
   - **macOS (Chrome):** open `chrome://apps`, right-click Momentum → Delete.
   - **Android:** long-press the home screen icon → Uninstall.
   - **iOS:** long-press the home screen icon → Remove App → Delete App.
2. **Clear the site's cached data** so the old service worker/manifest can't linger: in the browser, go to the site's settings (in Chrome: click the padlock/info icon in the address bar → "Site settings" → "Clear data"), or open DevTools → Application tab → "Clear site data."
3. Visit the live site fresh in a normal browser tab and confirm it loads correctly (not a 404).
4. Click **Install App** again to create a new shortcut.

## Notes

- Export relies on three small libraries loaded from a CDN (`cdnjs.cloudflare.com`) — that's the only time the app needs internet access; everything else works fully offline once loaded.
- Document import relies on two more CDN libraries (`mammoth` for Word, `pdf.js` for PDF) — same CDN, same one-time-per-load cost. Only the newer `.docx` format is supported for Word, not the older binary `.doc` format. Bullet detection is heuristic: real bulleted/numbered lists in a Word doc or PDF are detected reliably; plain paragraphs fall back to "one subtask per paragraph/line," which can be noisy for prose-heavy documents — that's exactly why the import opens as an editable draft instead of saving immediately.
- The install prompt and logo fetch for exports both require the site to be served over `http(s)` (e.g. via Vercel, GitHub Pages, or a local dev server) — opening `index.html` directly from disk (`file://`) still works for everyday use, but the browser blocks service worker registration and same-origin `fetch()` under `file://`, so the install option and the exported logo will silently be unavailable in that mode.
- To change branding, replace `assets/logo-icon-light.png` (light mode) and `assets/logo-icon-dark.png` (dark mode). The background is defined entirely in CSS (see the `.blob` rules in `css/style.css`) — no image files involved, so you can retint it there directly.
- Deleting a daily-repeating task removes the whole recurring series (not just that day's copy) — the app asks you to confirm before doing this.
- Bump `APP_VERSION` near the top of `js/app.js` when you ship changes, and add an entry to the `CHANGELOG` array in the same file (shown in the "What's New" panel) and to `CHANGELOG.md`. If you change core files, also bump `CACHE_NAME` in `sw.js` so returning visitors get the update instead of a stale cached copy.
