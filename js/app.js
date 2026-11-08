(function () {
  'use strict';

  var APP_NAME = 'Momentum';
  var APP_TAGLINE = 'Focus. Plan. Achieve.';
  var APP_VERSION = '3.7.0';

  var TASKS_KEY = 'momentum.tasks.v1';
  var CATEGORIES_KEY = 'momentum.categories.v1';
  var THEME_KEY = 'momentum.theme.v1';
  var LAST_SEEN_VERSION_KEY = 'momentum.lastSeenVersion.v1';
  var DEFAULT_CATEGORIES = ['Personal', 'Work', 'Health', 'Learning'];

  var CHANGELOG = [
    {
      version: '3.7.0',
      date: 'August 2026',
      items: [
        { type: 'feat', text: 'Pin a task: tap the pin icon on any task (or tick "Pin to the top, every day" in the form). A pinned task comes back fresh at the top of your list every day until you unpin or delete it.' },
        { type: 'feat', text: 'Edit any task: the pencil icon opens the full form \u2014 title, notes, date, priority, category, repeat, pin, and subtasks (add, rename, remove). Subtasks you\u2019ve already checked off stay checked.' },
        { type: 'feat', text: 'Share a task: the share icon makes a link that shows the task and its progress to whoever opens it, and they can save their own copy. The link is a snapshot of right now \u2014 it doesn\u2019t update live \u2014 so share a new link after you make more progress.' },
        { type: 'fix', text: 'Security: text containing quote characters could break out of an HTML attribute and run script (e.g. a subtask or category from an imported file or a shared link). All user, imported and shared text is now escaped properly.' },
        { type: 'fix', text: 'The Install App button now actually hides when the app is already installed or can\u2019t be installed (a CSS rule was silently overriding the hidden state).' },
        { type: 'fix', text: 'The note under "Import PDF, Word, Excel, or JSON" showed a raw \\u2019 code instead of an apostrophe; and the dark-mode "Daily" badge was still purple.' }
      ]
    },
    {
      version: '3.6.0',
      date: 'August 2026',
      items: [
        { type: 'feat', text: 'Import a PDF, Word (.docx), Excel, or JSON file as a new task \u2014 the document becomes one task, and its bullet points (or list items, spreadsheet cells, or JSON array entries) become subtasks. Opens as a pre-filled draft in the New Task form so you can review and edit before saving anything.' }
      ]
    },
    {
      version: '3.5.2',
      date: 'August 2026',
      items: [
        { type: 'fix', text: 'Fixed the hamburger ("more") menu button showing on every screen size instead of only on mobile. Root cause: the button also carries .glass-btn.round, and that compound selector\u2019s unconditional display:inline-flex had higher CSS specificity than the plain .more-menu-btn rule meant to hide it \u2014 so it silently won regardless of screen width or media query. Matched the same compound selector to fix it.' }
      ]
    },
    {
      version: '3.5.1',
      date: 'August 2026',
      items: [
        { type: 'fix', text: 'The theme toggle inside the mobile "more" menu had no text label, leaving a blank-looking row. It now shows "Light Mode" while you\u2019re in dark mode, and "Dark Mode" while you\u2019re in light mode \u2014 labeled by what tapping it switches you to.' }
      ]
    },
    {
      version: '3.5.0',
      date: 'August 2026',
      items: [
        { type: 'feat', text: 'On narrow/mobile screens, the header now shows just Export/Sync plus a single "more" menu (\u2261) instead of a row of separate icon buttons. Install App, What\u2019s New, Coach, and the theme toggle live inside it, each with a label. Wider screens are unchanged \u2014 all buttons show individually as before.' }
      ]
    },
    {
      version: '3.4.3',
      date: 'August 2026',
      items: [
        { type: 'fix', text: 'The Install App button used the exact same download-tray arrow icon as the Export/Sync button, and both lost their text label on mobile \u2014 leaving two identical-looking round icons in the header. Install App now has its own distinct device+plus icon and always keeps its text label, even on mobile.' }
      ]
    },
    {
      version: '3.4.2',
      date: 'August 2026',
      items: [
        { type: 'fix', text: 'Service worker now checks for updates on every page load and auto-refreshes an open tab once a newer version takes over, so future fixes reach people without needing a manual hard-refresh.' },
        { type: 'fix', text: 'Important: this does not retroactively fix an already-installed shortcut from before the v3.4.1 start_url fix \u2014 that\u2019s baked into the OS at install time. If your installed icon still opens to a 404 or an /assets/ file listing, you must uninstall it and reinstall from the Install App button. See the README for exact steps per platform.' }
      ]
    },
    {
      version: '3.4.1',
      date: 'August 2026',
      items: [
        { type: 'fix', text: 'Fixed the installed app opening to a 404 page. The manifest\u2019s start_url was "./", which resolves relative to the manifest file\u2019s own folder (assets/) rather than the site root \u2014 the same category of relative-path bug as an earlier CSS fix, just in a new spot. It now points at "/" explicitly, with an explicit scope too.' },
        { type: 'feat', text: 'Replaced the buried "Install" menu item with a dedicated, accent-colored Install App button in the header \u2014 visible whenever the app is installable, hidden automatically once it\u2019s installed or already running standalone.' }
      ]
    },
    {
      version: '3.4.0',
      date: 'August 2026',
      items: [
        { type: 'feat', text: 'Added a small promo card above the footer for Daybook (expense & income tracking) \u2014 https://daybook-az.vercel.app/.' },
        { type: 'feat', text: 'Install Momentum as an app from the browser (Export/Sync menu \u2192 App section). Added a real service worker so the install prompt meets browser criteria and the app shell loads offline.' },
        { type: 'feat', text: 'Priority task reminders: opt in from the same menu to get a browser notification for open high-priority tasks, checked on load and hourly while the tab stays open. (Local notifications only \u2014 this is a backend-free static site, so nothing is delivered while the app is fully closed; a real push notification would need a server.)' },
        { type: 'feat', text: 'The Momentum logo is now embedded in Word and PDF exports. Excel exports get a bold brand header line instead \u2014 the free spreadsheet library this app uses can\u2019t embed actual images into .xlsx files.' },
        { type: 'fix', text: 'Fixed a second copy of the earlier relative-path bug: the PWA manifest\u2019s icon paths were resolving relative to the manifest\u2019s own folder instead of the site root, so app icons would have silently failed to load. Also updated the manifest and browser theme-color to the current pink/blue branding (they were still the very first version\u2019s colors).' }
      ]
    },
    {
      version: '3.3.0',
      date: 'August 2026',
      items: [
        { type: 'feat', text: 'True transparent "water glass" finish on every card, button, dropdown, and modal — much lower panel opacity with stronger blur, so the background genuinely shows through instead of sitting behind a mostly-opaque white card.' },
        { type: 'feat', text: 'Background orbs are now sharp/lightly-blurred where they float freely, and only appear soft and diffused where they pass behind a glass panel — the panel\u2019s own blur does that work, rather than blurring the orbs themselves everywhere.' },
        { type: 'fix', text: 'Removed every remaining trace of purple/violet from the UI (buttons, badges, checkboxes, progress ring, dropdown highlights, exported Word/PDF headers) and replaced it with the pink/blue accent pair matching the new background orbs. Dark mode glass is now a neutral dark tint instead of a violet-tinted one.' }
      ]
    },
    {
      version: '3.2.0',
      date: 'August 2026',
      items: [
        { type: 'feat', text: 'New background: bright glassmorphism look with three large, softly blurred pink, blue, and green orbs drifting and bouncing slowly around the screen on a white (light mode) or near-black (dark mode) base — matching the requested reference.' },
        { type: 'feat', text: 'Brightened the glass cards to a crisper, whiter frosted look to match the reference card style, with a neutral shadow tint instead of the previous green/violet tint.' },
        { type: 'fix', text: 'Reverted header title and footer text to theme-adaptive colors, since the background is light again in light mode (they had been hardcoded light for the previous all-dark navy background).' }
      ]
    },
    {
      version: '3.1.0',
      date: 'August 2026',
      items: [
        { type: 'feat', text: 'New background: a navy-to-sky-blue radial gradient with a faint dot grid, matching the requested reference — deep navy core, lighter blue toward the edges, with dark mode pushed richer and darker.' },
        { type: 'feat', text: 'Added twinkling star animation across the background, subtle in light mode and clearly visible in dark mode.' },
        { type: 'fix', text: 'Since the new background is dark-toned in both themes, fixed the header title and footer text (which sit directly on the background, not on a glass card) to stay light and readable in both light and dark mode.' }
      ]
    },
    {
      version: '3.0.0',
      date: 'August 2026',
      items: [
        { type: 'feat', text: 'Major visual overhaul: much stronger liquid-glass treatment across every card, button, dropdown, and modal — heavier blur, lower-opacity tinted panels, a bright top highlight that catches light like a real glass edge, and soft ambient glow shadows.' },
        { type: 'feat', text: 'Replaced the photo skyline background with a soft animated ambient gradient — misty green/warm glow in light mode, deep black-to-violet aura in dark mode — built entirely in CSS so it stays lightweight and infinitely retintable.' },
        { type: 'fix', text: 'Removed the now-unused background photo assets.' }
      ]
    },
    {
      version: '2.3.0',
      date: 'August 2026',
      items: [
        { type: 'feat', text: 'Swapped in your higher-resolution reference photos for the day and night skylines, upscaled and exported at high quality.' },
        { type: 'feat', text: 'The sun now glows and gently pulses in place over the real sunrise photo; the moon does the same at night.' },
        { type: 'feat', text: 'Added drifting clouds and small flying birds crossing the sky periodically, layered on top of the photo.' },
        { type: 'fix', text: 'Strengthened contrast further: dark mode cards are now a tinted dark glass (instead of a light tint) so text stays crisp over the busy, brightly-lit night skyline; light mode cards are slightly more opaque too.' }
      ]
    },
    {
      version: '2.2.1',
      date: 'August 2026',
      items: [
        { type: 'fix', text: 'Fixed the background images not showing at all — the CSS was pointing to assets/bg-light.jpg relative to the css/ folder itself, instead of the site root, so the files could never be found.' }
      ]
    },
    {
      version: '2.2.0',
      date: 'August 2026',
      items: [
        { type: 'feat', text: 'Background now uses your exact reference photos — the sunrise skyline for light mode and the night skyline for dark mode — crossfading between the two when you switch themes.' },
        { type: 'fix', text: 'Replaced the illustrated/procedural skyline with the real reference images for a closer match to the requested look.' }
      ]
    },
    {
      version: '2.1.0',
      date: 'August 2026',
      items: [
        { type: 'feat', text: 'Full background redesign: an illustrated day/night city skyline (matching the requested reference art) replaces the old abstract gradient — sunrise sky and skyline in light mode, starry night skyline in dark mode.' },
        { type: 'feat', text: 'Animated glowing sun (light mode) and glowing moon with twinkling stars (dark mode), plus drifting clouds and a shimmering water reflection of the skyline.' },
        { type: 'feat', text: 'Rotating inspirational quotes shown under the header to nudge you toward finishing today\u2019s tasks.' },
        { type: 'fix', text: 'Increased glass-card opacity slightly in dark mode so content stays clearly readable over the busier night scene.' }
      ]
    },
    {
      version: '2.0.0',
      date: 'August 2026',
      items: [
        { type: 'fix', text: 'Redesigned the background: added a woven, interlacing ribbon layer on top of the color blobs, and made the motion much more visible (bigger, faster movement) instead of a barely-perceptible morph.' },
        { type: 'fix', text: 'Fixed the Today/Upcoming/All/Completed tabs not animating — a background-image swap can\u2019t be CSS-transitioned, so it always snapped instantly. Replaced with a sliding indicator that glides between tabs.' }
      ]
    },
    {
      version: '1.1.0',
      date: 'August 2026',
      items: [
        { type: 'feat', text: 'Restore a backup from an uploaded Excel (.xlsx) file, in addition to JSON.' },
        { type: 'feat', text: 'Smooth, liquid-like morphing gradient background with slower, more organic shape shifts.' },
        { type: 'feat', text: 'Momentum Coach — local, rule-based suggestions based on your own tasks (no data leaves your browser).' },
        { type: 'feat', text: 'This "What\u2019s New" panel, so you can see what changed in each version.' },
        { type: 'feat', text: 'Footer credit and rights notice.' },
        { type: 'fix', text: 'Removed the small dot behind the completion percentage in the progress ring.' },
        { type: 'fix', text: 'Added smooth spring-style press animations to buttons, checkboxes, and modal open/close transitions.' },
        { type: 'fix', text: 'On mobile, the "new task" modal now opens centered on screen instead of behind the keyboard.' }
      ]
    },
    {
      version: '1.0.0',
      date: 'August 2026',
      items: [
        { type: 'feat', text: 'Initial release: daily task tracking with subtasks, categories, priority, and daily-repeat tasks.' },
        { type: 'feat', text: 'Today / Upcoming / All / Completed views, streak counter, and daily completion ring.' },
        { type: 'feat', text: 'Light and dark mode, animated gradient background, liquid-glass UI.' },
        { type: 'feat', text: 'Export tasks to Excel, Word, and PDF; JSON backup/restore for moving data between devices.' }
      ]
    }
  ];

  // ---------- storage helpers ----------
  function loadJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function saveJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* storage full or unavailable */
    }
  }

  function uid() {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  }
  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  // ---------- state ----------
  var tasks = loadJSON(TASKS_KEY, []);
  var categories = loadJSON(CATEGORIES_KEY, DEFAULT_CATEGORIES.slice());
  var theme = loadJSON(THEME_KEY, window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  var filter = 'today';
  var expandedTaskIds = {};

  function persistTasks() { saveJSON(TASKS_KEY, tasks); }
  function persistCategories() { saveJSON(CATEGORIES_KEY, categories); }

  // ---------- theme ----------
  function applyTheme() {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    renderThemeIcon();
  }
  function renderThemeIcon() {
    var btn = document.getElementById('themeToggle');
    var isDark = theme === 'dark';
    // Label describes what clicking it switches TO, not the current state.
    var label = isDark ? 'Light Mode' : 'Dark Mode';
    btn.setAttribute('aria-label', 'Switch to ' + label.toLowerCase());
    btn.innerHTML = (isDark
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>')
      + '<span class="more-menu-label">' + label + '</span>';
  }
  document.getElementById('themeToggle').addEventListener('click', function () {
    theme = theme === 'dark' ? 'light' : 'dark';
    saveJSON(THEME_KEY, theme);
    applyTheme();
  });

  // ---------- recurring task carry-over ----------
  // Each daily-repeating OR pinned task shares a seriesId across its daily copies. Carry-over
  // looks at the most recent copy of every series and, if that copy is still repeating or
  // pinned, regenerates a fresh copy for today. Looking at the latest copy (rather than any
  // copy) matters: once someone unpins/stops a series, its latest copy stops qualifying, so
  // older pinned copies can't bring it back.
  function carryOverRecurringTasks() {
    var today = todayStr();
    var latestBySeries = {};
    tasks.forEach(function (t) {
      if (!t.seriesId) return;
      var cur = latestBySeries[t.seriesId];
      if (!cur || t.date > cur.date) latestBySeries[t.seriesId] = t;
    });

    var carried = [];
    Object.keys(latestBySeries).forEach(function (seriesId) {
      var latest = latestBySeries[seriesId];
      if (!(latest.repeatDaily || latest.pinned)) return;
      if (latest.date < today) {
        carried.push({
          id: uid(),
          seriesId: seriesId,
          title: latest.title,
          notes: latest.notes,
          category: latest.category,
          priority: latest.priority,
          date: today,
          repeatDaily: !!latest.repeatDaily,
          pinned: !!latest.pinned,
          done: false,
          subtasks: latest.subtasks.map(function (s) { return { id: uid(), title: s.title, done: false }; }),
          createdAt: new Date().toISOString()
        });
      }
    });
    if (carried.length) {
      tasks = carried.concat(tasks);
      persistTasks();
    }
  }

  // ---------- task CRUD ----------
  function addTask(input) {
    var needsSeries = input.repeatDaily || input.pinned;
    var task = {
      id: uid(),
      seriesId: needsSeries ? uid() : null,
      title: input.title.trim(),
      notes: input.notes ? input.notes.trim() : undefined,
      category: input.category,
      priority: input.priority,
      date: input.date,
      repeatDaily: !!input.repeatDaily,
      pinned: !!input.pinned,
      done: false,
      subtasks: input.subtasks.filter(function (s) { return s.trim().length > 0; }).map(function (s) {
        return { id: uid(), title: s.trim(), done: false };
      }),
      createdAt: new Date().toISOString()
    };
    tasks.unshift(task);
    if (categories.indexOf(input.category) === -1) {
      categories.push(input.category);
      persistCategories();
    }
    persistTasks();
    renderAll();
  }

  // Sets pinned on a task and every other copy in its series (so the whole series agrees),
  // assigning a series id first if the task never had one. Doesn't persist/render itself.
  function applyPinned(taskId, pinned) {
    var task = tasks.filter(function (t) { return t.id === taskId; })[0];
    if (!task) return;
    var sid = task.seriesId || (pinned ? uid() : null);
    tasks = tasks.map(function (t) {
      var inSeries = t.id === taskId || (task.seriesId && t.seriesId === task.seriesId);
      if (!inSeries) return t;
      return Object.assign({}, t, { pinned: pinned, seriesId: t.seriesId || sid });
    });
  }

  function togglePin(id) {
    var task = tasks.filter(function (t) { return t.id === id; })[0];
    if (!task) return;
    var makePinned = !task.pinned;
    applyPinned(id, makePinned);
    carryOverRecurringTasks();
    persistTasks();
    renderAll();
    showToast(makePinned
      ? 'Pinned \u2014 this task will sit at the top of your list every day.'
      : 'Unpinned.');
  }

  // Applies the edit form's values to an existing task, keeping each existing subtask's id
  // and done-state (matched by the id stored on its form row) so editing never loses progress.
  function saveTaskEdits(id, input) {
    var prev = tasks.filter(function (t) { return t.id === id; })[0];
    if (!prev) return;

    var subtasks = input.subtasks.map(function (s) {
      return { id: s.id || uid(), title: s.title, done: !!s.done };
    });
    var seriesId = prev.seriesId;
    if ((input.repeatDaily || input.pinned) && !seriesId) seriesId = uid();

    // A finished task that just gained an unchecked subtask isn't finished any more.
    var done = prev.done;
    if (done && subtasks.some(function (s) { return !s.done; })) done = false;

    tasks = tasks.map(function (t) {
      if (t.id !== id) return t;
      return Object.assign({}, t, {
        title: input.title.trim(),
        notes: input.notes ? input.notes.trim() : undefined,
        category: input.category,
        priority: input.priority,
        date: input.date,
        repeatDaily: !!input.repeatDaily,
        pinned: !!input.pinned,
        seriesId: seriesId,
        subtasks: subtasks,
        done: done,
        completedAt: done ? t.completedAt : undefined
      });
    });
    if (!!prev.pinned !== !!input.pinned) applyPinned(id, !!input.pinned);
    if (categories.indexOf(input.category) === -1) {
      categories.push(input.category);
      persistCategories();
    }
    carryOverRecurringTasks();
    persistTasks();
    renderAll();
  }

  function deleteTask(id) {
    var task = tasks.filter(function (t) { return t.id === id; })[0];
    if (task && (task.repeatDaily || task.pinned) && task.seriesId) {
      // Deleting a daily-repeating or pinned task stops the whole series — otherwise it would
      // simply be regenerated again on the next reload.
      tasks = tasks.filter(function (t) { return t.seriesId !== task.seriesId; });
    } else {
      tasks = tasks.filter(function (t) { return t.id !== id; });
    }
    persistTasks();
    renderAll();
  }

  function toggleTaskDone(id) {
    tasks = tasks.map(function (t) {
      if (t.id !== id) return t;
      var done = !t.done;
      return Object.assign({}, t, {
        done: done,
        completedAt: done ? new Date().toISOString() : undefined,
        subtasks: done ? t.subtasks.map(function (s) { return Object.assign({}, s, { done: true }); }) : t.subtasks
      });
    });
    persistTasks();
    renderAll();
  }

  function toggleSubtask(taskId, subtaskId) {
    tasks = tasks.map(function (t) {
      if (t.id !== taskId) return t;
      var subtasks = t.subtasks.map(function (s) {
        return s.id === subtaskId ? Object.assign({}, s, { done: !s.done }) : s;
      });
      var allDone = subtasks.length > 0 && subtasks.every(function (s) { return s.done; });
      return Object.assign({}, t, { subtasks: subtasks, done: allDone ? true : t.done });
    });
    persistTasks();
    renderAll();
  }

  function deleteSubtask(taskId, subtaskId) {
    tasks = tasks.map(function (t) {
      if (t.id !== taskId) return t;
      return Object.assign({}, t, { subtasks: t.subtasks.filter(function (s) { return s.id !== subtaskId; }) });
    });
    persistTasks();
    renderAll();
  }

  function addSubtaskToTask(taskId, title) {
    if (!title.trim()) return;
    tasks = tasks.map(function (t) {
      if (t.id !== taskId) return t;
      return Object.assign({}, t, { subtasks: t.subtasks.concat([{ id: uid(), title: title.trim(), done: false }]) });
    });
    persistTasks();
    renderAll();
  }

  // ---------- stats ----------
  function computeStats() {
    var today = todayStr();
    var todays = tasks.filter(function (t) { return t.date === today; });
    var todayDone = todays.filter(function (t) { return t.done; }).length;
    var todayTotal = todays.length;
    var completion = todayTotal === 0 ? 0 : Math.round((todayDone / todayTotal) * 100);

    var byDate = {};
    tasks.forEach(function (t) {
      (byDate[t.date] = byDate[t.date] || []).push(t);
    });

    var streak = 0;
    if (todayTotal > 0 && todayDone === todayTotal) streak = 1;
    var cursor = new Date();
    cursor.setDate(cursor.getDate() - (streak === 1 ? 1 : 0));
    while (true) {
      var key = cursor.toISOString().slice(0, 10);
      var dayTasks = byDate[key];
      if (dayTasks && dayTasks.length > 0 && dayTasks.every(function (t) { return t.done; })) {
        if (key !== today) streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }
    return { todayDone: todayDone, todayTotal: todayTotal, completion: completion, streak: streak };
  }

  // ---------- rendering ----------
  function formatDate(dateStr, today) {
    if (dateStr === today) return 'Today';
    var d = new Date(dateStr + 'T00:00:00');
    var t = new Date(today + 'T00:00:00');
    var diff = Math.round((d.getTime() - t.getTime()) / 86400000);
    if (diff === 1) return 'Tomorrow';
    if (diff === -1) return 'Yesterday';
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  }

  // Safe for both text content AND attribute values (quotes are escaped too).
  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderStats() {
    var stats = computeStats();
    document.getElementById('ringLabel').textContent = stats.completion + '%';
    document.getElementById('statsDone').textContent = stats.todayDone + '/' + stats.todayTotal;
    document.getElementById('statsStreak').textContent = stats.streak;

    var r = 43.5;
    var circumference = 2 * Math.PI * r;
    var offset = circumference - (Math.min(100, stats.completion) / 100) * circumference;
    var ring = document.getElementById('ringProgress');
    ring.setAttribute('stroke-dasharray', circumference);
    ring.style.transition = 'stroke-dashoffset .6s ease';
    ring.setAttribute('stroke-dashoffset', offset);
  }

  function getVisibleTasks() {
    var today = todayStr();
    var list;
    if (filter === 'today') list = tasks.filter(function (t) { return t.date === today; });
    else if (filter === 'upcoming') list = tasks.filter(function (t) { return t.date > today && !t.done; });
    else if (filter === 'completed') list = tasks.filter(function (t) { return t.done; });
    else list = tasks.slice();

    var order = { high: 0, medium: 1, low: 2 };
    // "Live" pinned = today's copy of a pinned task. Those go to the very top of any view;
    // older copies of the same pinned series are just history and sort by date like anything else.
    function livePinned(t) { return !!t.pinned && t.date === today; }
    return list.sort(function (a, b) {
      if (livePinned(a) !== livePinned(b)) return livePinned(a) ? -1 : 1;
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
      if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
      if (a.done !== b.done) return a.done ? 1 : -1;
      return order[a.priority] - order[b.priority];
    });
  }

  var EMPTY_MESSAGES = {
    today: 'Nothing on today\u2019s list yet. Tap + to add your first task.',
    upcoming: 'No upcoming tasks scheduled.',
    all: 'No tasks yet — add one to get started.',
    completed: 'Nothing completed yet. Get after it!'
  };

  function taskCardHtml(task, today, showDateHeading) {
    var tid = escapeHtml(task.id);
    var subtaskDone = task.subtasks.filter(function (s) { return s.done; }).length;
    var expanded = !!expandedTaskIds[task.id];

    var badges = ''
      + '<span class="badge priority-' + task.priority + '">' + task.priority + '</span>'
      + '<span class="badge category">' + escapeHtml(task.category) + '</span>';
    if (task.pinned) {
      badges += '<span class="badge pinned-badge"><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M9 3h6l-1 6 3 3v2H7v-2l3-3-1-6z"/><path d="M12 14v7" fill="none" stroke-linecap="round"/></svg>Pinned</span>';
    }
    if (task.repeatDaily) {
      badges += '<span class="badge repeat"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>Daily</span>';
    }
    if (task.subtasks.length > 0) {
      badges += '<button type="button" class="badge subtoggle' + (expanded ? ' expanded' : '') + '" data-toggle-expand="' + tid + '">'
        + subtaskDone + '/' + task.subtasks.length + ' subtasks'
        + '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg></button>';
    }

    var subtaskHtml = '';
    if (expanded) {
      subtaskHtml += '<div class="subtask-list">';
      task.subtasks.forEach(function (s) {
        var sid = escapeHtml(s.id);
        subtaskHtml += '<div class="subtask-row">'
          + '<input type="checkbox" class="momentum-check small" ' + (s.done ? 'checked' : '') + ' data-toggle-subtask="' + tid + '::' + sid + '" />'
          + '<span class="' + (s.done ? 'done' : '') + '">' + escapeHtml(s.title) + '</span>'
          + '<button type="button" class="icon-btn" data-delete-subtask="' + tid + '::' + sid + '"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg></button>'
          + '</div>';
      });
      subtaskHtml += '<form class="subtask-field-row" data-add-subtask="' + tid + '" style="padding-left:4px;">'
        + '<input type="text" placeholder="Add a subtask…" />'
        + '</form>';
      subtaskHtml += '</div>';
    }

    var heading = showDateHeading ? '<p class="date-heading">' + formatDate(task.date, today) + '</p>' : '';

    var pinLabel = task.pinned ? 'Unpin task' : 'Pin task to the top every day';
    return heading + '<div class="glass task-card' + (task.pinned ? ' is-pinned' : '') + '">'
      + '<input type="checkbox" class="momentum-check" ' + (task.done ? 'checked' : '') + ' data-toggle-done="' + tid + '" style="margin-top:2px;" />'
      + '<div class="task-body">'
      + '<div class="task-top">'
      + '<p class="task-title' + (task.done ? ' done' : '') + '">' + escapeHtml(task.title) + '</p>'
      + '<div class="task-actions">'
      + '<button type="button" class="icon-btn pin-btn' + (task.pinned ? ' active' : '') + '" data-pin-task="' + tid + '" aria-label="' + pinLabel + '" title="' + pinLabel + '"><svg width="16" height="16" viewBox="0 0 24 24" fill="' + (task.pinned ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"><path d="M9 3h6l-1 6 3 3v2H7v-2l3-3-1-6z"/><path d="M12 14v7"/></svg></button>'
      + '<button type="button" class="icon-btn" data-share-task="' + tid + '" aria-label="Share task" title="Share task"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="m16 6-4-4-4 4M12 2v14"/></svg></button>'
      + '<button type="button" class="icon-btn" data-edit-task="' + tid + '" aria-label="Edit task" title="Edit task"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>'
      + '<button type="button" class="icon-btn" data-delete-task="' + tid + '" aria-label="Delete task" title="Delete task"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z"/></svg></button>'
      + '</div>'
      + '</div>'
      + (task.notes ? '<p class="task-notes">' + escapeHtml(task.notes) + '</p>' : '')
      + '<div class="badge-row">' + badges + '</div>'
      + subtaskHtml
      + '</div></div>';
  }

  function renderTaskList() {
    var container = document.getElementById('taskList');
    var today = todayStr();
    var visible = getVisibleTasks();
    var showHeading = filter === 'all' || filter === 'upcoming';

    if (visible.length === 0) {
      container.innerHTML = '<div class="glass empty-state">'
        + '<div class="empty-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="white"/></svg></div>'
        + '<p>' + EMPTY_MESSAGES[filter] + '</p></div>';
      return;
    }

    container.innerHTML = visible.map(function (t) { return taskCardHtml(t, today, showHeading); }).join('');
  }

  function renderAll() {
    renderStats();
    renderTaskList();
  }

  // ---------- event delegation for task list ----------
  document.getElementById('taskList').addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('[data-toggle-expand]'))) {
      var id = t.getAttribute('data-toggle-expand');
      expandedTaskIds[id] = !expandedTaskIds[id];
      renderTaskList();
    } else if ((t = e.target.closest('[data-delete-task]'))) {
      var taskId = t.getAttribute('data-delete-task');
      var task = tasks.filter(function (x) { return x.id === taskId; })[0];
      if (task && (task.repeatDaily || task.pinned)) {
        var what = task.pinned ? 'pinned' : 'daily-repeating';
        if (confirm('This is a ' + what + ' task. Deleting it will stop the whole series (it won\u2019t come back tomorrow), not just today\u2019s copy. Continue?')) {
          deleteTask(taskId);
        }
      } else {
        deleteTask(taskId);
      }
    } else if ((t = e.target.closest('[data-pin-task]'))) {
      togglePin(t.getAttribute('data-pin-task'));
    } else if ((t = e.target.closest('[data-share-task]'))) {
      openShareModal(t.getAttribute('data-share-task'));
    } else if ((t = e.target.closest('[data-edit-task]'))) {
      openEditTask(t.getAttribute('data-edit-task'));
    } else if ((t = e.target.closest('[data-delete-subtask]'))) {
      var parts = t.getAttribute('data-delete-subtask').split('::');
      deleteSubtask(parts[0], parts[1]);
    }
  });
  document.getElementById('taskList').addEventListener('change', function (e) {
    var t = e.target;
    if (t.matches('[data-toggle-done]')) {
      toggleTaskDone(t.getAttribute('data-toggle-done'));
    } else if (t.matches('[data-toggle-subtask]')) {
      var parts = t.getAttribute('data-toggle-subtask').split('::');
      toggleSubtask(parts[0], parts[1]);
    }
  });
  document.getElementById('taskList').addEventListener('submit', function (e) {
    var form = e.target.closest('[data-add-subtask]');
    if (!form) return;
    e.preventDefault();
    var taskId = form.getAttribute('data-add-subtask');
    var input = form.querySelector('input');
    addSubtaskToTask(taskId, input.value);
    expandedTaskIds[taskId] = true;
  });

  // ---------- filter tabs (with a sliding indicator, since a background-image swap
  // like the old gradient-on-active approach can't be CSS-transitioned smoothly) ----------
  var filterTabsEl = document.getElementById('filterTabs');
  var tabIndicator = document.getElementById('tabIndicator');

  function moveTabIndicator(btn) {
    if (!btn) return;
    var containerRect = filterTabsEl.getBoundingClientRect();
    var btnRect = btn.getBoundingClientRect();
    tabIndicator.style.width = btnRect.width + 'px';
    tabIndicator.style.transform = 'translateX(' + (btnRect.left - containerRect.left - 4) + 'px)';
  }

  filterTabsEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.tab');
    if (!btn) return;
    filter = btn.getAttribute('data-filter');
    document.querySelectorAll('#filterTabs .tab').forEach(function (b) { b.classList.toggle('active', b === btn); });
    moveTabIndicator(btn);
    renderTaskList();
  });

  window.addEventListener('resize', function () {
    moveTabIndicator(filterTabsEl.querySelector('.tab.active'));
  });

  // Position the indicator once layout has settled (fonts/webfonts can shift widths slightly).
  setTimeout(function () { moveTabIndicator(filterTabsEl.querySelector('.tab.active')); }, 60);

  // ---------- add task modal ----------
  var modal = document.getElementById('addTaskModal');
  var form = document.getElementById('addTaskForm');
  var categoryNewInput = document.getElementById('taskCategoryNew');
  var subtaskFieldsWrap = document.getElementById('subtaskFields');

  // ---- generic custom dropdown ----
  function initDropdown(root, onSelect) {
    var trigger = root.querySelector('.dd-trigger');
    var label = root.querySelector('.dd-trigger-label');
    var list = root.querySelector('.dd-list');

    function open() { closeAllDropdowns(); list.hidden = false; root.classList.add('open'); }
    function close() { list.hidden = true; root.classList.remove('open'); }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      list.hidden ? open() : close();
    });
    list.addEventListener('click', function (e) {
      var opt = e.target.closest('.dd-option');
      if (!opt) return;
      var value = opt.getAttribute('data-value');
      setDropdownValue(root, value, opt.textContent);
      close();
      if (onSelect) onSelect(value);
    });

    root._ddOpen = open;
    root._ddClose = close;
    root._ddLabel = label;
  }

  function setDropdownValue(root, value, text) {
    root.setAttribute('data-value', value);
    root._ddLabel.textContent = text;
    root.querySelectorAll('.dd-option').forEach(function (o) {
      o.classList.toggle('selected', o.getAttribute('data-value') === value);
    });
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.dd').forEach(function (d) { if (d._ddClose) d._ddClose(); });
  }
  document.addEventListener('click', closeAllDropdowns);

  var priorityDD = document.getElementById('priorityDD');
  initDropdown(priorityDD, null);

  var categoryDD = document.getElementById('categoryDD');
  var categoryDDList = document.getElementById('categoryDDList');
  initDropdown(categoryDD, function (value) {
    categoryNewInput.hidden = value !== '__new__';
    if (!categoryNewInput.hidden) categoryNewInput.focus();
  });

  function populateCategoryDropdown() {
    categoryDDList.innerHTML = categories.map(function (c) {
      return '<button type="button" class="dd-option" data-value="' + escapeHtml(c) + '">' + escapeHtml(c) + '</button>';
    }).join('') + '<button type="button" class="dd-option" data-value="__new__">+ New category…</button>';
  }

  // meta (optional): { id, done } — set when editing an existing subtask so saving can keep
  // its identity and checked state instead of recreating it as a fresh unchecked one.
  function addSubtaskFieldRow(value, meta) {
    var row = document.createElement('div');
    row.className = 'subtask-field-row';
    if (meta && meta.id) row.setAttribute('data-sub-id', meta.id);
    row.setAttribute('data-done', meta && meta.done ? '1' : '0');
    row.innerHTML = '<input type="text" placeholder="Subtask" />'
      + '<button type="button" aria-label="Remove subtask"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg></button>';
    row.querySelector('input').value = value || '';
    row.querySelector('button').addEventListener('click', function () {
      if (subtaskFieldsWrap.children.length > 1) row.remove();
      else {
        row.querySelector('input').value = '';
        row.removeAttribute('data-sub-id');
      }
    });
    subtaskFieldsWrap.appendChild(row);
  }

  var editingTaskId = null;

  // prefill (optional): { title, notes, category, priority, date, repeat, pinned,
  //   subtasks: [string | {title,id,done}], editId }. With editId the form saves changes to
  //   that task instead of creating a new one.
  function openModal(prefill) {
    var p = prefill && typeof prefill === 'object' ? prefill : {};
    editingTaskId = p.editId || null;

    if (p.category && editingTaskId && categories.indexOf(p.category) === -1) {
      categories.push(p.category);
      persistCategories();
    }
    populateCategoryDropdown();
    var catValue = p.category && categories.indexOf(p.category) !== -1 ? p.category : (categories[0] || 'Personal');
    setDropdownValue(categoryDD, catValue, catValue);

    var pri = ['low', 'medium', 'high'].indexOf(p.priority) !== -1 ? p.priority : 'medium';
    setDropdownValue(priorityDD, pri, pri.charAt(0).toUpperCase() + pri.slice(1));

    categoryNewInput.hidden = true;
    categoryNewInput.value = '';
    document.getElementById('taskTitle').value = p.title || '';
    document.getElementById('taskNotes').value = p.notes || '';
    document.getElementById('taskDate').value = p.date || todayStr();
    document.getElementById('taskRepeat').checked = !!p.repeat;
    document.getElementById('taskPinned').checked = !!p.pinned;

    document.getElementById('modalHeading').textContent = editingTaskId ? 'Edit task' : 'New task';
    document.getElementById('taskSubmitBtn').textContent = editingTaskId ? 'Save changes' : 'Add task';

    subtaskFieldsWrap.innerHTML = '';
    var seeds = p.subtasks && p.subtasks.length ? p.subtasks : [''];
    seeds.forEach(function (s) {
      if (typeof s === 'string') addSubtaskFieldRow(s);
      else addSubtaskFieldRow(s.title, { id: s.id, done: s.done });
    });
    openOverlay(modal.closest('.modal-overlay'));
    setTimeout(function () { document.getElementById('taskTitle').focus(); }, 200);
  }

  function openEditTask(id) {
    var task = tasks.filter(function (t) { return t.id === id; })[0];
    if (!task) return;
    openModal({
      editId: task.id,
      title: task.title,
      notes: task.notes,
      category: task.category,
      priority: task.priority,
      date: task.date,
      repeat: task.repeatDaily,
      pinned: task.pinned,
      subtasks: task.subtasks.map(function (s) { return { title: s.title, id: s.id, done: s.done }; })
    });
  }
  function closeModal() { closeOverlayEl(modal.closest('.modal-overlay')); closeAllDropdowns(); }

  document.getElementById('addTaskBtn').addEventListener('click', function () { openModal(); });
  modal.closest('.modal-overlay').addEventListener('click', function (e) {
    if (e.target.closest('[data-close-modal]')) closeModal();
  });
  document.getElementById('addSubtaskField').addEventListener('click', function () { addSubtaskFieldRow(''); });

  // Keep the focused field visible above the on-screen keyboard on mobile.
  modal.addEventListener('focusin', function (e) {
    if (e.target.matches('input, textarea, .dd-trigger')) {
      setTimeout(function () {
        e.target.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, 300);
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var title = document.getElementById('taskTitle').value;
    if (!title.trim()) return;
    var categoryValue = categoryDD.getAttribute('data-value');
    var category = categoryValue === '__new__'
      ? (categoryNewInput.value.trim() || 'General')
      : categoryValue;

    var subtaskObjs = [];
    Array.prototype.forEach.call(subtaskFieldsWrap.querySelectorAll('.subtask-field-row'), function (row) {
      var v = row.querySelector('input').value.trim();
      if (!v) return;
      subtaskObjs.push({ title: v, id: row.getAttribute('data-sub-id') || null, done: row.getAttribute('data-done') === '1' });
    });

    var common = {
      title: title,
      notes: document.getElementById('taskNotes').value,
      category: category,
      priority: priorityDD.getAttribute('data-value'),
      date: document.getElementById('taskDate').value || todayStr(),
      repeatDaily: document.getElementById('taskRepeat').checked,
      pinned: document.getElementById('taskPinned').checked
    };

    if (editingTaskId) {
      common.subtasks = subtaskObjs;
      saveTaskEdits(editingTaskId, common);
      showToast('Task updated.');
    } else {
      common.subtasks = subtaskObjs.map(function (s) { return s.title; });
      addTask(common);
    }
    closeModal();
  });

  // ---------- export menu ----------
  var exportBtn = document.getElementById('exportBtn');
  var exportMenu = document.getElementById('exportMenu');
  function closeExportMenu() { exportMenu.hidden = true; exportBtn.setAttribute('aria-expanded', 'false'); }
  exportBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var willOpen = exportMenu.hidden;
    exportMenu.hidden = !willOpen;
    exportBtn.setAttribute('aria-expanded', String(willOpen));
  });
  document.addEventListener('click', function (e) {
    if (!exportMenu.hidden && !exportMenu.contains(e.target) && e.target !== exportBtn) closeExportMenu();
  });

  // ---------- "more" (hot-dog) menu — mobile only; a no-op wrapper on wider screens
  // since the panel is display:contents there and its buttons work exactly as before ----------
  var moreMenuBtn = document.getElementById('moreMenuBtn');
  var moreMenuPanel = document.getElementById('moreMenuPanel');
  function closeMoreMenu() { moreMenuPanel.hidden = true; moreMenuBtn.setAttribute('aria-expanded', 'false'); }
  moreMenuBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var willOpen = moreMenuPanel.hidden;
    moreMenuPanel.hidden = !willOpen;
    moreMenuBtn.setAttribute('aria-expanded', String(willOpen));
  });
  document.addEventListener('click', function (e) {
    if (!moreMenuPanel.hidden && !moreMenuPanel.contains(e.target) && e.target !== moreMenuBtn) closeMoreMenu();
  });
  // Picking anything inside the panel closes it too, same as a normal mobile menu.
  moreMenuPanel.addEventListener('click', function (e) {
    if (e.target.closest('button')) closeMoreMenu();
  });

  function showToast(message) {
    var toast = document.getElementById('toast');
    toast.textContent = message;
    toast.hidden = false;
    toast.className = 'toast glass';
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { toast.hidden = true; }, 4000);
  }

  function filenameBase() {
    return 'momentum-tasks-' + todayStr() + '-v' + APP_VERSION;
  }

  // Fetches the logo once and caches it as a data URL, for embedding into exported files.
  var _logoDataUrlPromise = null;
  function getLogoDataUrl() {
    if (_logoDataUrlPromise) return _logoDataUrlPromise;
    _logoDataUrlPromise = fetch('assets/logo-icon-light.png')
      .then(function (res) { return res.blob(); })
      .then(function (blob) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.onload = function () { resolve(reader.result); };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      })
      .catch(function () { return null; }); // exports still work without the logo if this fails
    return _logoDataUrlPromise;
  }

  function flattenRows() {
    var rows = [];
    tasks.forEach(function (t) {
      if (t.subtasks.length === 0) {
        rows.push({ Date: t.date, Task: t.title, Category: t.category, Priority: t.priority, Status: t.done ? 'Done' : 'Pending', Repeats: t.repeatDaily ? 'Daily' : 'One-time', Subtask: '', SubStatus: '' });
      } else {
        t.subtasks.forEach(function (s) {
          rows.push({ Date: t.date, Task: t.title, Category: t.category, Priority: t.priority, Status: t.done ? 'Done' : 'Pending', Repeats: t.repeatDaily ? 'Daily' : 'One-time', Subtask: s.title, SubStatus: s.done ? 'Done' : 'Pending' });
        });
      }
    });
    return rows;
  }

  function exportExcel() {
    if (typeof XLSX === 'undefined') { showToast('Excel export library failed to load. Check your connection.'); return; }
    var rows = flattenRows().map(function (r) {
      return { Date: r.Date, Task: r.Task, Category: r.Category, Priority: r.Priority, Status: r.Status, Repeats: r.Repeats, Subtask: r.Subtask, 'Subtask Status': r.SubStatus };
    });
    // The free/CDN build of SheetJS can't embed an actual logo image into a sheet, so a bold
    // brand header row stands in for it — full-fidelity logo images do embed in the Word/PDF
    // exports below.
    var brandRow = [[APP_NAME + ' \u2014 ' + APP_TAGLINE], []];
    var ws = XLSX.utils.aoa_to_sheet(brandRow);
    XLSX.utils.sheet_add_json(ws, rows, { origin: 'A3' });
    ws['!cols'] = [{ wch: 12 }, { wch: 30 }, { wch: 14 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 30 }, { wch: 14 }];
    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }];
    if (ws['A1']) ws['A1'].s = { font: { bold: true, sz: 14 } };
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tasks');
    XLSX.writeFile(wb, filenameBase() + '.xlsx');
  }

  function exportWord() {
    var rows = flattenRows();
    var body = rows.map(function (r) {
      var label = r.Subtask ? ('&nbsp;&nbsp;• ' + escapeHtml(r.Subtask)) : escapeHtml(r.Task);
      var status = r.Subtask ? r.SubStatus : r.Status;
      return '<tr><td>' + r.Date + '</td><td>' + label + '</td><td>' + escapeHtml(r.Category) + '</td>'
        + '<td>' + r.Priority + '</td><td>' + status + '</td><td>' + r.Repeats + '</td></tr>';
    }).join('');

    getLogoDataUrl().then(function (logoUrl) {
      var logoHtml = logoUrl ? '<img src="' + logoUrl + '" style="height:36px;vertical-align:middle;margin-right:10px;" />' : '';
      var html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">'
        + '<head><meta charset="utf-8"><title>' + APP_NAME + ' Report</title></head><body>'
        + '<div style="margin-bottom:6px;">' + logoHtml
        + '<span style="font-family:Calibri,Arial,sans-serif;font-size:22px;font-weight:bold;vertical-align:middle;">' + APP_NAME + ' — Task Report</span></div>'
        + '<p style="font-family:Calibri,Arial,sans-serif;color:#666;font-size:11px;">Generated ' + new Date().toLocaleString() + ' · ' + APP_NAME + ' v' + APP_VERSION + '</p>'
        + '<table border="1" cellspacing="0" cellpadding="6" style="border-collapse:collapse;font-family:Calibri,Arial,sans-serif;font-size:12px;width:100%;">'
        + '<tr style="background:#FF3FA8;color:#fff;"><th>Date</th><th>Task / Subtask</th><th>Category</th><th>Priority</th><th>Status</th><th>Repeats</th></tr>'
        + body + '</table></body></html>';

      var blob = new Blob(['\ufeff', html], { type: 'application/msword' });
      downloadBlob(blob, filenameBase() + '.doc');
    });
  }

  function exportPdf() {
    if (typeof window.jspdf === 'undefined') { showToast('PDF export library failed to load. Check your connection.'); return; }

    getLogoDataUrl().then(function (logoUrl) {
      var doc = new window.jspdf.jsPDF();
      var titleX = 14;
      if (logoUrl) {
        try {
          doc.addImage(logoUrl, 'PNG', 14, 10, 14, 14);
          titleX = 32;
        } catch (e) { /* fall back to no logo if the image can't be embedded */ }
      }
      doc.setFontSize(18);
      doc.text(APP_NAME + ' — Task Report', titleX, 19);
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text('Generated ' + new Date().toLocaleString() + ' · ' + APP_NAME + ' v' + APP_VERSION, 14, 30);

      var rows = flattenRows().map(function (r) {
        return [r.Date, r.Subtask ? ('  • ' + r.Subtask) : r.Task, r.Category, r.Priority, r.Subtask ? r.SubStatus : r.Status, r.Repeats];
      });

      doc.autoTable({
        startY: 36,
        head: [['Date', 'Task / Subtask', 'Category', 'Priority', 'Status', 'Repeats']],
        body: rows,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [255, 63, 168] }
      });
      doc.save(filenameBase() + '.pdf');
    });
  }

  function downloadBlob(blob, name) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function backupJson() {
    var data = { version: APP_VERSION, exportedAt: new Date().toISOString(), tasks: tasks, categories: categories };
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    downloadBlob(blob, 'momentum-backup-' + todayStr() + '-v' + APP_VERSION + '.json');
  }

  var restoreJsonInput = document.getElementById('restoreJsonInput');
  function restoreJson() { restoreJsonInput.click(); }
  restoreJsonInput.addEventListener('change', function () {
    var file = restoreJsonInput.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        if (!data || !Array.isArray(data.tasks)) throw new Error('bad file');
        tasks = data.tasks;
        categories = data.categories && data.categories.length ? data.categories : DEFAULT_CATEGORIES.slice();
        persistTasks();
        persistCategories();
        renderAll();
        showToast('Backup restored from JSON successfully.');
      } catch (err) {
        showToast('This file does not look like a valid Momentum backup.');
      }
    };
    reader.readAsText(file);
    restoreJsonInput.value = '';
  });

  // Reconstruct tasks + subtasks from the flattened rows produced by exportExcel().
  // Rows sharing Date+Task+Category+Priority+Repeats belong to the same task; each row's
  // Subtask/Subtask Status column (if present) becomes one subtask on that task.
  function reconstructTasksFromRows(rows) {
    var order = [];
    var map = {};
    var categoriesSeen = {};
    rows.forEach(function (r) {
      var date = String(r.Date || '').trim();
      var title = String(r.Task || '').trim();
      var category = String(r.Category || 'General').trim() || 'General';
      var priority = String(r.Priority || 'medium').trim().toLowerCase();
      if (['low', 'medium', 'high'].indexOf(priority) === -1) priority = 'medium';
      var repeatDaily = String(r.Repeats || '').trim().toLowerCase() === 'daily';
      var status = String(r.Status || '').trim().toLowerCase();
      var subtaskTitle = String(r.Subtask || '').trim();
      var subStatus = String(r['Subtask Status'] || '').trim().toLowerCase();
      if (!title || !date) return;

      var key = date + '::' + title + '::' + category + '::' + priority + '::' + (repeatDaily ? '1' : '0');
      if (!map[key]) {
        map[key] = {
          id: uid(),
          seriesId: repeatDaily ? uid() : null,
          title: title,
          category: category,
          priority: priority,
          date: date,
          repeatDaily: repeatDaily,
          done: status === 'done',
          subtasks: [],
          createdAt: new Date().toISOString()
        };
        order.push(key);
        categoriesSeen[category] = true;
      }
      if (subtaskTitle) {
        map[key].subtasks.push({ id: uid(), title: subtaskTitle, done: subStatus === 'done' });
      }
    });
    return { tasks: order.map(function (k) { return map[k]; }), categories: Object.keys(categoriesSeen) };
  }

  var restoreXlsxInput = document.getElementById('restoreXlsxInput');
  function restoreXlsx() { restoreXlsxInput.click(); }
  restoreXlsxInput.addEventListener('change', function () {
    var file = restoreXlsxInput.files[0];
    if (!file) return;
    if (typeof XLSX === 'undefined') {
      showToast('Excel library failed to load — check your connection and try again.');
      restoreXlsxInput.value = '';
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = new Uint8Array(reader.result);
        var wb = XLSX.read(data, { type: 'array' });
        var sheet = wb.Sheets[wb.SheetNames[0]];
        var rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        var imported = reconstructTasksFromRows(rows);
        if (!imported.tasks.length) throw new Error('No tasks found in that spreadsheet.');
        tasks = imported.tasks;
        categories = imported.categories.length ? imported.categories : DEFAULT_CATEGORIES.slice();
        persistTasks();
        persistCategories();
        renderAll();
        showToast('Backup restored from Excel successfully. (Notes aren\u2019t stored in Excel exports — use a JSON backup to keep those.)');
      } catch (err) {
        showToast(err instanceof Error && err.message ? err.message : 'Could not read that Excel file.');
      }
    };
    reader.readAsArrayBuffer(file);
    restoreXlsxInput.value = '';
  });

  // ---------- import a document as a task (bullets/rows/lines become subtasks) ----------
  var importDocInput = document.getElementById('importDocInput');
  function triggerImportDoc() { importDocInput.click(); }

  function parseJsonDocument(text, filename) {
    var data = JSON.parse(text);
    var title = filename;
    var bullets = [];

    function stringifyItem(item) {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object') return item.title || item.name || item.text || JSON.stringify(item);
      return String(item);
    }

    if (Array.isArray(data)) {
      bullets = data.map(stringifyItem);
    } else if (data && typeof data === 'object') {
      title = data.title || data.name || filename;
      var arrKey = ['items', 'bullets', 'tasks', 'subtasks', 'points', 'list'].filter(function (k) { return Array.isArray(data[k]); })[0];
      if (arrKey) {
        bullets = data[arrKey].map(stringifyItem);
      } else {
        Object.keys(data).forEach(function (k) {
          if (k === 'title' || k === 'name') return;
          var v = data[k];
          if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') bullets.push(k + ': ' + v);
        });
      }
    }
    return { title: title, bullets: bullets.filter(Boolean).slice(0, 60) };
  }

  function parseExcelDocument(arrayBuffer, filename) {
    var data = new Uint8Array(arrayBuffer);
    var wb = XLSX.read(data, { type: 'array' });
    var sheet = wb.Sheets[wb.SheetNames[0]];
    var rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
    var bullets = [];
    rows.forEach(function (row) {
      row.forEach(function (cell) {
        var s = String(cell == null ? '' : cell).trim();
        if (s) bullets.push(s);
      });
    });
    return { title: filename, bullets: bullets.slice(0, 60) };
  }

  function parseWordDocument(arrayBuffer, filename) {
    return mammoth.convertToHtml({ arrayBuffer: arrayBuffer }).then(function (result) {
      var doc = new DOMParser().parseFromString(result.value, 'text/html');
      var bullets = [];
      var liEls = doc.querySelectorAll('li');
      if (liEls.length > 0) {
        liEls.forEach(function (li) { var t = li.textContent.trim(); if (t) bullets.push(t); });
      } else {
        // No real bullet/numbered lists in the doc — fall back to one subtask per paragraph.
        doc.querySelectorAll('p').forEach(function (p) { var t = p.textContent.trim(); if (t) bullets.push(t); });
      }
      return { title: filename, bullets: bullets.filter(Boolean).slice(0, 60) };
    });
  }

  var BULLET_LINE_RE = /^[-*\u2022\u2023\u25E6\u2043\u2219]\s*|^\d+[.)]\s*/;

  function parsePdfDocument(arrayBuffer, filename) {
    if (typeof pdfjsLib === 'undefined') return Promise.reject(new Error('PDF library failed to load \u2014 check your connection and try again.'));
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    return pdfjsLib.getDocument({ data: arrayBuffer }).promise.then(function (pdf) {
      var pagePromises = [];
      for (var i = 1; i <= pdf.numPages; i++) {
        pagePromises.push(pdf.getPage(i).then(function (page) { return page.getTextContent(); }));
      }
      return Promise.all(pagePromises);
    }).then(function (pages) {
      var lines = [];
      pages.forEach(function (content) {
        var lastY = null;
        var currentLine = '';
        content.items.forEach(function (item) {
          var y = item.transform[5];
          if (lastY !== null && Math.abs(y - lastY) > 2) {
            if (currentLine.trim()) lines.push(currentLine.trim());
            currentLine = '';
          }
          currentLine += item.str + ' ';
          lastY = y;
        });
        if (currentLine.trim()) lines.push(currentLine.trim());
      });
      var bulletLike = lines.filter(function (l) { return BULLET_LINE_RE.test(l.trim()); });
      var source = bulletLike.length >= 2 ? bulletLike : lines;
      var bullets = source.map(function (l) { return l.replace(BULLET_LINE_RE, '').trim(); });
      return { title: filename, bullets: bullets.filter(Boolean).slice(0, 60) };
    });
  }

  importDocInput.addEventListener('change', function () {
    var file = importDocInput.files[0];
    if (!file) return;
    var baseName = file.name.replace(/\.[^.]+$/, '');
    var ext = file.name.split('.').pop().toLowerCase();

    function finish(result) {
      openModal({ title: (result && result.title) || baseName, subtasks: (result && result.bullets) || [] });
      var count = result && result.bullets ? result.bullets.length : 0;
      showToast('Imported \u201c' + file.name + '\u201d as a draft task with ' + count + ' subtask' + (count === 1 ? '' : 's') + ' \u2014 review it, then tap Add task.');
    }
    function fail(err) {
      showToast('Could not read that file: ' + (err && err.message ? err.message : 'unknown error'));
    }

    if (ext === 'json') {
      file.text().then(function (text) { finish(parseJsonDocument(text, baseName)); }).catch(fail);
    } else if (ext === 'xlsx' || ext === 'xls') {
      if (typeof XLSX === 'undefined') { fail(new Error('Excel library failed to load \u2014 check your connection.')); }
      else file.arrayBuffer().then(function (buf) { finish(parseExcelDocument(buf, baseName)); }).catch(fail);
    } else if (ext === 'docx') {
      if (typeof mammoth === 'undefined') { fail(new Error('Word library failed to load \u2014 check your connection.')); }
      else file.arrayBuffer().then(function (buf) { return parseWordDocument(buf, baseName); }).then(finish).catch(fail);
    } else if (ext === 'doc') {
      fail(new Error('Only the newer .docx format is supported, not the older .doc format \u2014 try saving it as .docx first.'));
    } else if (ext === 'pdf') {
      if (typeof pdfjsLib === 'undefined') { fail(new Error('PDF library failed to load \u2014 check your connection.')); }
      else file.arrayBuffer().then(function (buf) { return parsePdfDocument(buf, baseName); }).then(finish).catch(fail);
    } else {
      fail(new Error('Unsupported file type.'));
    }
    importDocInput.value = '';
  });

  exportMenu.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action]');
    if (!btn) return;
    var action = btn.getAttribute('data-action');
    closeExportMenu();
    if (action === 'export-xlsx') exportExcel();
    else if (action === 'export-docx') exportWord();
    else if (action === 'export-pdf') exportPdf();
    else if (action === 'backup') backupJson();
    else if (action === 'restore-json') restoreJson();
    else if (action === 'restore-xlsx') restoreXlsx();
    else if (action === 'notify') toggleNotifications();
    else if (action === 'import-doc') triggerImportDoc();
  });

  // ---------- Momentum Coach (local, rule-based — no external calls) ----------
  function computeCoachTips() {
    var today = todayStr();
    var stats = computeStats();
    var tips = [];

    if (stats.todayTotal === 0) {
      tips.push('You haven\u2019t added anything for today yet. Tap + to set your first task and get moving.');
    } else if (stats.completion === 100) {
      tips.push('Everything on today\u2019s list is done. \uD83C\uDF89 Nice work — maybe get a head start on tomorrow?');
    } else {
      var remaining = stats.todayTotal - stats.todayDone;
      tips.push('You\u2019re at ' + stats.completion + '% today with ' + remaining + ' task' + (remaining === 1 ? '' : 's') + ' left. You can still close this out.');
    }

    if (stats.streak >= 3) {
      tips.push('\uD83D\uDD25 You\u2019re on a ' + stats.streak + '-day streak — that kind of consistency compounds. Keep it going.');
    }

    var overdue = tasks.filter(function (t) { return !t.done && t.date < today && !t.repeatDaily && !t.pinned; });
    if (overdue.length > 0) {
      tips.push('You have ' + overdue.length + ' task' + (overdue.length === 1 ? '' : 's') + ' from previous days still open. Worth clearing them out or moving the date so they don\u2019t pile up.');
    }

    var stalePriority = tasks.filter(function (t) { return !t.done && t.priority === 'high' && t.date < today; })
      .sort(function (a, b) { return a.date < b.date ? -1 : 1; })[0];
    if (stalePriority) {
      tips.push('"' + stalePriority.title + '" is marked high priority and has been open since ' + stalePriority.date + '. Might be worth tackling that one first today.');
    }

    var stuck = tasks.filter(function (t) {
      return !t.done && t.date === today && t.subtasks.length >= 3 && t.subtasks.every(function (s) { return !s.done; });
    })[0];
    if (stuck) {
      tips.push('"' + stuck.title + '" has ' + stuck.subtasks.length + ' subtasks and none checked off yet. Try knocking out just one — momentum builds from there.');
    }

    var openByCategory = {};
    var openTotal = 0;
    tasks.filter(function (t) { return !t.done; }).forEach(function (t) {
      openByCategory[t.category] = (openByCategory[t.category] || 0) + 1;
      openTotal += 1;
    });
    var topCategory = null;
    Object.keys(openByCategory).forEach(function (c) {
      if (!topCategory || openByCategory[c] > openByCategory[topCategory]) topCategory = c;
    });
    if (topCategory && openTotal >= 4 && openByCategory[topCategory] / openTotal > 0.6) {
      tips.push('Most of your open tasks are in "' + topCategory + '". Blocking dedicated time for that category could clear a lot at once.');
    }

    if (tips.length === 0) {
      tips.push('You\u2019re all caught up — nothing urgent to flag right now.');
    }
    return tips.slice(0, 4);
  }

  function renderCoachTips() {
    var wrap = document.getElementById('coachTips');
    var tips = computeCoachTips();
    wrap.innerHTML = tips.map(function (t) {
      return '<div class="coach-tip"><div class="coach-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/><circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/></svg></div><p>' + escapeHtml(t) + '</p></div>';
    }).join('');
  }

  // ---------- What's new ----------
  function renderWhatsNew() {
    var wrap = document.getElementById('whatsNewBody');
    wrap.innerHTML = CHANGELOG.map(function (entry) {
      var items = entry.items.map(function (it) {
        return '<li class="' + (it.type === 'fix' ? 'fix' : 'feat') + '">' + escapeHtml(it.text) + '</li>';
      }).join('');
      return '<div class="whats-new-version"><h3><span class="v-badge">v' + entry.version + '</span>' + escapeHtml(entry.date) + '</h3><ul>' + items + '</ul></div>';
    }).join('');
  }

  // ---------- generic overlay open/close (backdrop fade + liquid-glass scale-in) ----------
  var OVERLAY_ANIM_MS = 320;
  function openOverlay(el) {
    el.hidden = false;
    void el.offsetWidth; // force reflow so the transition plays
    el.classList.add('is-open');
  }
  function closeOverlayEl(el) {
    el.classList.remove('is-open');
    setTimeout(function () { el.hidden = true; }, OVERLAY_ANIM_MS);
  }

  var coachModal = document.getElementById('coachModal');
  document.getElementById('coachBtn').addEventListener('click', function () {
    renderCoachTips();
    openOverlay(coachModal);
  });
  coachModal.addEventListener('click', function (e) {
    if (e.target.closest('[data-close-modal]')) closeOverlayEl(coachModal);
  });

  var whatsNewModal = document.getElementById('whatsNewModal');
  function openWhatsNew() { renderWhatsNew(); openOverlay(whatsNewModal); }
  document.getElementById('whatsNewBtn').addEventListener('click', openWhatsNew);
  whatsNewModal.addEventListener('click', function (e) {
    if (e.target.closest('[data-close-modal]')) closeOverlayEl(whatsNewModal);
  });

  // ---------- inspirational quote rotator ----------
  var QUOTES = [
    'Small steps, done today, beat big plans done someday.',
    'Discipline is choosing what you want most over what you want now.',
    'You don\u2019t have to see the whole staircase — just take the first step.',
    'Progress, not perfection.',
    'The secret of getting ahead is getting started.',
    'Done is better than perfect — finish the task in front of you.',
    'A little progress each day adds up to big results.',
    'Motivation gets you started. Habit keeps you going.',
    'Your future is created by what you do today, not tomorrow.',
    'Focus on being productive instead of busy.',
    'One task at a time — that\u2019s how momentum builds.',
    'The best time to start was earlier. The next best time is now.'
  ];
  function startQuoteRotator() {
    var bar = document.getElementById('quoteBar');
    var textEl = document.getElementById('quoteText');
    if (!bar || !textEl) return;
    var i = Math.floor(Math.random() * QUOTES.length);
    textEl.textContent = QUOTES[i];
    setInterval(function () {
      bar.classList.add('fading');
      setTimeout(function () {
        i = (i + 1) % QUOTES.length;
        textEl.textContent = QUOTES[i];
        bar.classList.remove('fading');
      }, 400);
    }, 8000);
  }

  // ---------- PWA install ----------
  var deferredInstallPrompt = null;
  var installBtn = document.getElementById('installBtn');

  function isRunningStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches
      || window.matchMedia('(display-mode: window-controls-overlay)').matches
      || window.navigator.standalone === true; // iOS Safari's own flag
  }

  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

  function updateInstallButtonVisibility() {
    if (isRunningStandalone()) {
      // Already installed and running as the app itself — nothing to offer.
      installBtn.hidden = true;
      return;
    }
    // iOS has no beforeinstallprompt API at all, but people still need a way to find the
    // manual "Add to Home Screen" steps, so keep the button visible there regardless.
    installBtn.hidden = !(deferredInstallPrompt || isIOS);
  }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredInstallPrompt = e;
    updateInstallButtonVisibility();
  });

  function triggerInstall() {
    if (!deferredInstallPrompt) {
      // Most likely iOS Safari, or a desktop/browser without install-prompt support — there's
      // no programmatic install API there, so point the person at the manual steps instead.
      showToast(isIOS
        ? 'On iPhone/iPad: tap the Share icon, then "Add to Home Screen".'
        : 'Look for "Install app" or "Add to Home Screen" in your browser\u2019s menu (often the \u22ee or \u2261 icon, or an icon in the address bar).');
      return;
    }
    installBtn.disabled = true;
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.finally(function () {
      deferredInstallPrompt = null;
      installBtn.disabled = false;
      updateInstallButtonVisibility();
    });
  }

  installBtn.addEventListener('click', triggerInstall);

  window.addEventListener('appinstalled', function () {
    installBtn.hidden = true;
    showToast('Momentum installed \u2014 open it from your home screen or app list from now on.');
  });

  updateInstallButtonVisibility();

  if ('serviceWorker' in navigator) {
    // Auto-refresh once when a newer service worker takes over, so a fixed deployment
    // reaches an already-open tab without the person needing to know to hard-refresh.
    // (This does NOT fix an already-installed shortcut's baked-in start_url — that's an
    // OS-level install record, not something a service worker can rewrite. It only helps
    // the page's own cached files and future deployments update themselves.)
    var _swRefreshed = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (_swRefreshed) return;
      _swRefreshed = true;
      window.location.reload();
    });

    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').then(function (reg) {
        reg.update(); // check for a newer sw.js on every load, don't wait for the browser's own schedule
      }).catch(function () {
        // Fails silently when opened straight from disk (file://) or offline on first load —
        // the app still works normally without the service worker, just without offline caching.
      });
    });
  }

  // ---------- priority task notifications (local only — while this tab is open) ----------
  var NOTIFIED_KEY = 'momentum.notifiedTaskIds.v1';
  var notifyMenuItem = document.getElementById('notifyMenuItem');

  function refreshNotifyLabel() {
    if (!('Notification' in window)) {
      notifyMenuItem.textContent = '🔕 Notifications not supported in this browser';
      notifyMenuItem.disabled = true;
      return;
    }
    if (Notification.permission === 'granted') {
      notifyMenuItem.textContent = '✅ Priority task reminders on';
    } else if (Notification.permission === 'denied') {
      notifyMenuItem.textContent = '🔕 Notifications blocked \u2014 enable them in browser settings';
    } else {
      notifyMenuItem.textContent = '🔔 Enable priority task reminders';
    }
  }

  function toggleNotifications() {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'granted') {
      showToast('Priority task reminders are already on.');
      checkPriorityNotifications(true);
      return;
    }
    if (Notification.permission === 'denied') {
      showToast('Notifications are blocked for this site \u2014 enable them from your browser\u2019s site settings.');
      return;
    }
    Notification.requestPermission().then(function (perm) {
      refreshNotifyLabel();
      if (perm === 'granted') {
        showToast('Reminders on \u2014 you\u2019ll be notified about open high-priority tasks.');
        checkPriorityNotifications(true);
        startNotificationTimer();
      }
    });
  }

  function checkPriorityNotifications(forceShow) {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    var today = todayStr();
    var pending = tasks.filter(function (t) { return !t.done && t.priority === 'high' && t.date <= today; });
    if (pending.length === 0) return;

    var notified = loadJSON(NOTIFIED_KEY, {});
    var todayKey = today;
    var alreadyNotifiedToday = notified[todayKey] || [];
    var fresh = pending.filter(function (t) { return alreadyNotifiedToday.indexOf(t.id) === -1; });

    if (fresh.length === 0 && !forceShow) return;
    var toAnnounce = forceShow ? pending : fresh;

    var title = toAnnounce.length === 1 ? '1 high-priority task needs attention' : toAnnounce.length + ' high-priority tasks need attention';
    var body = toAnnounce.slice(0, 3).map(function (t) { return '\u2022 ' + t.title; }).join('\n') + (toAnnounce.length > 3 ? '\n\u2026and more' : '');

    try {
      new Notification(title, { body: body, icon: 'assets/favicon-192.png', tag: 'momentum-priority' });
    } catch (e) { /* some browsers restrict Notification() outside a service worker — fail quietly */ }

    notified[todayKey] = alreadyNotifiedToday.concat(fresh.map(function (t) { return t.id; }));
    // Only keep today's entry so this storage key doesn't grow forever.
    var pruned = {};
    pruned[todayKey] = notified[todayKey];
    saveJSON(NOTIFIED_KEY, pruned);
  }

  var _notifyTimer = null;
  function startNotificationTimer() {
    if (_notifyTimer) return;
    _notifyTimer = setInterval(function () { checkPriorityNotifications(false); }, 60 * 60 * 1000); // hourly, while the tab stays open
  }

  // ---------- sharing a task (snapshot link — no backend involved) ----------
  // The link carries the task + its progress inside the URL's #fragment, which browsers never
  // send to a server. Whoever opens it sees a read-only view of the task *as it was when the
  // link was made*; it doesn't update live, because there's nowhere to store live data.
  function toBase64Url(str) {
    var bytes = new TextEncoder().encode(str);
    var bin = '';
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function fromBase64Url(b64) {
    b64 = b64.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    var bin = atob(b64);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  function progressOf(doneCount, total, taskDone) {
    if (taskDone) return 100;
    return total ? Math.round((doneCount / total) * 100) : 0;
  }

  function buildShareLink(task) {
    var payload = {
      v: 1,
      n: task.title,
      o: task.notes || '',
      c: task.category,
      p: task.priority,
      d: task.date,
      x: task.done ? 1 : 0,
      s: task.subtasks.map(function (s) { return [s.title, s.done ? 1 : 0]; }),
      t: new Date().toISOString()
    };
    return location.href.split('#')[0] + '#share=' + toBase64Url(JSON.stringify(payload));
  }

  // Everything in a share link is untrusted input, so shape and size are checked here and the
  // result is only ever rendered through escapeHtml().
  function decodeSharedTask(encoded) {
    var data = JSON.parse(fromBase64Url(encoded));
    if (!data || typeof data.n !== 'string' || !data.n.trim()) throw new Error('Not a task');
    var subs = Array.isArray(data.s) ? data.s.slice(0, 200).map(function (x) {
      var isArr = Array.isArray(x);
      return { title: String(isArr ? x[0] : x).slice(0, 300), done: isArr ? !!x[1] : false };
    }) : [];
    return {
      title: data.n.slice(0, 300),
      notes: typeof data.o === 'string' ? data.o.slice(0, 2000) : '',
      category: typeof data.c === 'string' ? data.c.slice(0, 60) : '',
      priority: ['low', 'medium', 'high'].indexOf(data.p) !== -1 ? data.p : 'medium',
      date: typeof data.d === 'string' ? data.d.slice(0, 10) : '',
      done: !!data.x,
      subtasks: subs,
      sharedAt: typeof data.t === 'string' ? data.t : ''
    };
  }

  // --- share dialog (creating a link) ---
  var shareModal = document.getElementById('shareModal');
  var shareLinkInput = document.getElementById('shareLinkInput');
  var shareCopyBtn = document.getElementById('shareCopyBtn');
  var shareNativeBtn = document.getElementById('shareNativeBtn');
  var currentShare = null; // { title, text, url }

  function openShareModal(taskId) {
    var task = tasks.filter(function (t) { return t.id === taskId; })[0];
    if (!task) return;
    var url = buildShareLink(task);
    var doneCount = task.subtasks.filter(function (s) { return s.done; }).length;
    var percent = progressOf(doneCount, task.subtasks.length, task.done);

    document.getElementById('shareTaskTitle').textContent = task.title;
    document.getElementById('shareProgressFill').style.width = percent + '%';
    document.getElementById('shareProgressText').textContent = task.subtasks.length
      ? doneCount + ' of ' + task.subtasks.length + ' subtasks done \u00b7 ' + percent + '%'
      : (task.done ? 'Completed' : 'Not started yet');
    shareLinkInput.value = url;
    document.getElementById('shareLongNote').hidden = url.length < 4000;
    shareCopyBtn.textContent = 'Copy link';

    currentShare = {
      title: task.title + ' \u2014 ' + APP_NAME,
      text: 'Task: ' + task.title + ' (' + percent + '% done)',
      url: url
    };
    shareNativeBtn.hidden = !navigator.share;
    openOverlay(shareModal);
  }

  shareModal.addEventListener('click', function (e) {
    if (e.target.closest('[data-close-modal]')) closeOverlayEl(shareModal);
  });
  shareLinkInput.addEventListener('focus', function () { shareLinkInput.select(); });

  shareCopyBtn.addEventListener('click', function () {
    var url = shareLinkInput.value;
    function done() {
      shareCopyBtn.textContent = 'Copied \u2713';
      setTimeout(function () { shareCopyBtn.textContent = 'Copy link'; }, 2000);
    }
    function fallback() {
      // Older/insecure contexts have no async clipboard API — fall back to selecting the text.
      shareLinkInput.focus();
      shareLinkInput.select();
      shareLinkInput.setSelectionRange(0, url.length);
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      if (ok) done();
      else showToast('Couldn\u2019t copy automatically \u2014 the link is selected, so press Ctrl/Cmd+C.');
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(done).catch(fallback);
    } else {
      fallback();
    }
  });

  shareNativeBtn.addEventListener('click', function () {
    if (!currentShare || !navigator.share) return;
    navigator.share(currentShare).catch(function () { /* person dismissed the share sheet */ });
  });

  // --- shared-task viewer (opening a link someone sent) ---
  var sharedViewModal = document.getElementById('sharedViewModal');
  var currentSharedTask = null;

  function clearShareHash() {
    if (window.history && history.replaceState) history.replaceState(null, '', location.href.split('#')[0]);
    else location.hash = '';
  }

  function renderSharedView(shared) {
    currentSharedTask = shared;
    var doneCount = shared.subtasks.filter(function (s) { return s.done; }).length;
    var percent = progressOf(doneCount, shared.subtasks.length, shared.done);

    var meta = '<span class="badge priority-' + shared.priority + '">' + shared.priority + '</span>';
    if (shared.category) meta += '<span class="badge category">' + escapeHtml(shared.category) + '</span>';
    if (shared.date) meta += '<span class="badge category">' + escapeHtml(shared.date) + '</span>';

    var subs = shared.subtasks.map(function (s) {
      return '<li class="shared-sub' + (s.done ? ' is-done' : '') + '">'
        + '<span class="shared-check">' + (s.done ? '\u2713' : '') + '</span>'
        + '<span>' + escapeHtml(s.title) + '</span></li>';
    }).join('');

    var when = '';
    if (shared.sharedAt) {
      var d = new Date(shared.sharedAt);
      if (!isNaN(d.getTime())) when = 'Snapshot taken ' + d.toLocaleString() + '. ';
    }

    document.getElementById('sharedViewBody').innerHTML =
      '<h3 class="shared-title' + (shared.done ? ' done' : '') + '">' + escapeHtml(shared.title) + '</h3>'
      + '<div class="badge-row" style="margin:8px 0 12px;">' + meta + '</div>'
      + (shared.notes ? '<p class="task-notes" style="margin:0 0 12px;">' + escapeHtml(shared.notes) + '</p>' : '')
      + '<div class="progress-track"><div class="progress-fill" style="width:' + percent + '%"></div></div>'
      + '<p class="progress-text">'
      + (shared.subtasks.length ? doneCount + ' of ' + shared.subtasks.length + ' subtasks done \u00b7 ' + percent + '%' : (shared.done ? 'Completed' : 'Not started yet'))
      + '</p>'
      + (subs ? '<ul class="shared-subs">' + subs + '</ul>' : '')
      + '<p class="menu-note" style="padding:10px 0 0;">' + when + 'This is a snapshot \u2014 it won\u2019t update if the owner keeps working on it.</p>';
  }

  function closeSharedView() {
    closeOverlayEl(sharedViewModal);
    clearShareHash();
  }
  sharedViewModal.addEventListener('click', function (e) {
    if (e.target.closest('[data-close-modal]')) closeSharedView();
  });
  document.getElementById('sharedCopyBtn').addEventListener('click', function () {
    if (!currentSharedTask) return;
    var s = currentSharedTask;
    closeSharedView();
    setTimeout(function () {
      openModal({
        title: s.title,
        notes: s.notes,
        priority: s.priority,
        category: s.category,
        subtasks: s.subtasks.map(function (x) { return x.title; })
      });
    }, 340);
  });

  function handleShareHash() {
    var m = /^#share=([A-Za-z0-9_-]+)/.exec(location.hash);
    if (!m) return false;
    try {
      renderSharedView(decodeSharedTask(m[1]));
      openOverlay(sharedViewModal);
    } catch (err) {
      showToast('That share link looks broken or incomplete.');
      clearShareHash();
    }
    return true;
  }
  window.addEventListener('hashchange', handleShareHash);

  // ---------- init ----------
  document.getElementById('versionLabel').textContent = APP_VERSION;
  document.getElementById('yearLabel').textContent = new Date().getFullYear();
  applyTheme();
  startQuoteRotator();
  carryOverRecurringTasks();
  renderAll();
  refreshNotifyLabel();
  if ('Notification' in window && Notification.permission === 'granted') {
    checkPriorityNotifications(false);
    startNotificationTimer();
  }

  var openedShare = handleShareHash();

  // Auto-open "What's new" once per version, on the first load after an update
  // (skipped when someone just arrived via a shared-task link, so the two don't stack).
  var lastSeen = loadJSON(LAST_SEEN_VERSION_KEY, null);
  if (lastSeen !== APP_VERSION) {
    saveJSON(LAST_SEEN_VERSION_KEY, APP_VERSION);
    if (lastSeen !== null && !openedShare) {
      setTimeout(openWhatsNew, 500);
    }
  }
})();
