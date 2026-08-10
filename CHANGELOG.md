# Changelog

All notable changes to Momentum are documented here.

## v3.3.0

- True transparent "water glass" finish on every card, button, dropdown, and modal — much lower panel opacity with stronger blur, so the background genuinely shows through
- Background orbs are sharp where they float freely, and only appear blurred where they pass behind a glass panel (via the panel's own backdrop blur, not a blur on the orbs themselves)
- Removed every remaining trace of purple/violet from the UI and replaced it with the pink/blue accent pair; dark mode glass is now a neutral dark tint

## v3.2.0

- New background: bright glassmorphism look with three large, softly blurred pink, blue, and green orbs drifting/bouncing slowly on a white (light mode) or near-black (dark mode) base, matching the requested reference
- Brightened glass cards to a crisper, whiter frosted look with a neutral shadow tint
- Reverted header/footer text to theme-adaptive colors now that the background is light again in light mode

## v3.1.0

- New background: navy-to-sky-blue radial gradient with a faint dot grid, matching the requested reference — deep navy core, lighter blue toward the edges, dark mode pushed richer/darker
- Added twinkling star animation, subtle in light mode and clearly visible in dark mode
- Fixed header title and footer text contrast against the new (now dark-toned in both themes) background

## v3.0.0

- Major visual overhaul: much stronger liquid-glass treatment across every card, button, dropdown, and modal — heavier blur, lower-opacity tinted panels, a bright top highlight that catches light like a real glass edge, and soft ambient glow shadows
- Replaced the photo skyline background with a soft animated ambient gradient — misty green/warm glow in light mode, deep black-to-violet aura in dark mode — built entirely in CSS
- Removed the now-unused background photo assets

## v2.3.0

- Swapped in higher-resolution reference photos for the day and night skylines (upscaled, high-quality export)
- Sun glows and gently pulses in place over the sunrise photo; moon does the same at night
- Added drifting clouds and small flying birds crossing the sky periodically
- Strengthened contrast: dark mode cards use a tinted dark glass instead of a light tint, so text stays crisp over the brightly-lit night skyline; light mode cards slightly more opaque too

## v2.2.1

- Fixed the background images not showing — CSS `url()` paths are resolved relative to the stylesheet's own folder (`css/`), not the site root, so `assets/bg-light.jpg` was being looked up as `css/assets/bg-light.jpg` and silently failing. Paths are now `../assets/...`.

## v2.2.0

- Background now uses your exact reference photos — sunrise skyline for light mode, night skyline for dark mode — crossfading between the two on theme switch
- Replaced the illustrated/procedural skyline with the real reference images

## v2.1.0

- Full background redesign: an illustrated day/night city skyline replaces the old abstract gradient — sunrise sky and skyline in light mode, starry night skyline in dark mode
- Animated glowing sun (light mode) and glowing moon with twinkling stars (dark mode), plus drifting clouds and a shimmering water reflection of the skyline
- Rotating inspirational quotes shown under the header
- Increased glass-card opacity slightly in dark mode for readability over the busier night scene

## v2.0.0

- Redesigned the background: added a woven, interlacing ribbon layer over the color blobs, and made the motion clearly visible (bigger, faster movement) instead of a barely-perceptible morph
- Fixed the Today/Upcoming/All/Completed tabs not animating — a background-image swap can't be CSS-transitioned, so it always snapped instantly; replaced with a sliding indicator that glides between tabs

## v1.1.0

- Restore a backup from an uploaded Excel (.xlsx) file, in addition to JSON
- Smoother, liquid-like morphing gradient background (organic shape shifts, slow hue drift)
- Momentum Coach — local, rule-based suggestions based on your own tasks, no data leaves your browser
- "What's New" panel showing what changed in each version (opens automatically once per update)
- Footer credit and rights notice
- Fixed: removed the small dot behind the completion percentage in the progress ring
- Fixed: deleting a daily-repeating task now removes the whole series instead of it reappearing on reload
- Fixed: category/priority dropdowns are now fully readable in dark mode (custom-built, not native `<select>`)
- Fixed: the "new task" modal no longer opens by default, and now opens centered so it stays clear of the mobile keyboard
- Added smooth spring-style press animations to buttons, checkboxes, and modal open/close transitions

## v1.0.0 — Initial release

- Daily task tracking with subtasks, categories, priority, and daily-repeat tasks
- Today / Upcoming / All / Completed views
- Streak counter and daily completion ring
- iOS-style liquid-glass UI with animated gradient background
- Light and dark mode (auto-detects system preference)
- Export tasks to Excel (.xlsx), Word (.docx), and PDF
- JSON backup/restore for moving data between devices (browser-based storage — no account needed)
- Fully responsive: mobile, tablet, laptop, desktop
- Installable as a PWA (Add to Home Screen)
