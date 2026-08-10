(function () {
  'use strict';

  var APP_NAME = 'Momentum';
  var APP_TAGLINE = 'Focus. Plan. Achieve.';
  var APP_VERSION = '3.4.0';

  var TASKS_KEY = 'momentum.tasks.v1';
  var CATEGORIES_KEY = 'momentum.categories.v1';
  var THEME_KEY = 'momentum.theme.v1';
  var LAST_SEEN_VERSION_KEY = 'momentum.lastSeenVersion.v1';
  var DEFAULT_CATEGORIES = ['Personal', 'Work', 'Health', 'Learning'];

  var CHANGELOG = [
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
    btn.innerHTML = isDark
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  document.getElementById('themeToggle').addEventListener('click', function () {
    theme = theme === 'dark' ? 'light' : 'dark';
    saveJSON(THEME_KEY, theme);
    applyTheme();
  });

  // ---------- recurring task carry-over ----------
  // Each daily-repeating task shares a seriesId across its daily copies. Carry-over only
  // regenerates a copy for today from the most recent existing copy of a series — so once
  // every copy of a series is deleted, the series is gone for good and won't come back.
  function carryOverRecurringTasks() {
    var today = todayStr();
    var latestBySeries = {};
    tasks.forEach(function (t) {
      if (!t.repeatDaily || !t.seriesId) return;
      var cur = latestBySeries[t.seriesId];
      if (!cur || t.date > cur.date) latestBySeries[t.seriesId] = t;
    });

    var carried = [];
    Object.keys(latestBySeries).forEach(function (seriesId) {
      var latest = latestBySeries[seriesId];
      if (latest.date < today) {
        carried.push({
          id: uid(),
          seriesId: seriesId,
          title: latest.title,
          notes: latest.notes,
          category: latest.category,
          priority: latest.priority,
          date: today,
          repeatDaily: true,
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
    var task = {
      id: uid(),
      seriesId: input.repeatDaily ? uid() : null,
      title: input.title.trim(),
      notes: input.notes ? input.notes.trim() : undefined,
      category: input.category,
      priority: input.priority,
      date: input.date,
      repeatDaily: input.repeatDaily,
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

  function deleteTask(id) {
    var task = tasks.filter(function (t) { return t.id === id; })[0];
    if (task && task.repeatDaily && task.seriesId) {
      // Deleting a daily-repeating task stops the whole series — otherwise it would
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

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str == null ? '' : str;
    return div.innerHTML;
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
    return list.sort(function (a, b) {
      if (a.date !== b.date) return a.date < b.date ? -1 : 1;
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
    var subtaskDone = task.subtasks.filter(function (s) { return s.done; }).length;
    var expanded = !!expandedTaskIds[task.id];

    var badges = ''
      + '<span class="badge priority-' + task.priority + '">' + task.priority + '</span>'
      + '<span class="badge category">' + escapeHtml(task.category) + '</span>';
    if (task.repeatDaily) {
      badges += '<span class="badge repeat"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>Daily</span>';
    }
    if (task.subtasks.length > 0) {
      badges += '<button type="button" class="badge subtoggle' + (expanded ? ' expanded' : '') + '" data-toggle-expand="' + task.id + '">'
        + subtaskDone + '/' + task.subtasks.length + ' subtasks'
        + '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg></button>';
    }

    var subtaskHtml = '';
    if (expanded) {
      subtaskHtml += '<div class="subtask-list">';
      task.subtasks.forEach(function (s) {
        subtaskHtml += '<div class="subtask-row">'
          + '<input type="checkbox" class="momentum-check small" ' + (s.done ? 'checked' : '') + ' data-toggle-subtask="' + task.id + '::' + s.id + '" />'
          + '<span class="' + (s.done ? 'done' : '') + '">' + escapeHtml(s.title) + '</span>'
          + '<button type="button" class="icon-btn" data-delete-subtask="' + task.id + '::' + s.id + '"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg></button>'
          + '</div>';
      });
      subtaskHtml += '<form class="subtask-field-row" data-add-subtask="' + task.id + '" style="padding-left:4px;">'
        + '<input type="text" placeholder="Add a subtask…" />'
        + '</form>';
      subtaskHtml += '</div>';
    }

    var heading = showDateHeading ? '<p class="date-heading">' + formatDate(task.date, today) + '</p>' : '';

    return heading + '<div class="glass task-card">'
      + '<input type="checkbox" class="momentum-check" ' + (task.done ? 'checked' : '') + ' data-toggle-done="' + task.id + '" style="margin-top:2px;" />'
      + '<div class="task-body">'
      + '<div class="task-top">'
      + '<p class="task-title' + (task.done ? ' done' : '') + '">' + escapeHtml(task.title) + '</p>'
      + '<button type="button" class="icon-btn" data-delete-task="' + task.id + '" aria-label="Delete task"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z"/></svg></button>'
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
      if (task && task.repeatDaily) {
        if (confirm('This is a daily-repeating task. Deleting it will stop the whole series, not just today\u2019s copy. Continue?')) {
          deleteTask(taskId);
        }
      } else {
        deleteTask(taskId);
      }
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

  function addSubtaskFieldRow(value) {
    var row = document.createElement('div');
    row.className = 'subtask-field-row';
    row.innerHTML = '<input type="text" placeholder="Subtask" value="' + escapeHtml(value || '') + '" />'
      + '<button type="button" aria-label="Remove subtask"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg></button>';
    row.querySelector('button').addEventListener('click', function () {
      if (subtaskFieldsWrap.children.length > 1) row.remove();
      else row.querySelector('input').value = '';
    });
    subtaskFieldsWrap.appendChild(row);
  }

  function openModal() {
    populateCategoryDropdown();
    setDropdownValue(categoryDD, categories[0] || 'Personal', categories[0] || 'Personal');
    setDropdownValue(priorityDD, 'medium', 'Medium');
    categoryNewInput.hidden = true;
    categoryNewInput.value = '';
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskNotes').value = '';
    document.getElementById('taskDate').value = todayStr();
    document.getElementById('taskRepeat').checked = false;
    subtaskFieldsWrap.innerHTML = '';
    addSubtaskFieldRow('');
    openOverlay(modal.closest('.modal-overlay'));
    setTimeout(function () { document.getElementById('taskTitle').focus(); }, 200);
  }
  function closeModal() { closeOverlayEl(modal.closest('.modal-overlay')); closeAllDropdowns(); }

  document.getElementById('addTaskBtn').addEventListener('click', openModal);
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
    var subtaskValues = Array.prototype.map.call(subtaskFieldsWrap.querySelectorAll('input'), function (i) { return i.value; });

    addTask({
      title: title,
      notes: document.getElementById('taskNotes').value,
      category: category,
      priority: priorityDD.getAttribute('data-value'),
      date: document.getElementById('taskDate').value || todayStr(),
      repeatDaily: document.getElementById('taskRepeat').checked,
      subtasks: subtaskValues
    });
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
    else if (action === 'install') triggerInstall();
    else if (action === 'notify') toggleNotifications();
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

    var overdue = tasks.filter(function (t) { return !t.done && t.date < today && !t.repeatDaily; });
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
  var installMenuItem = document.getElementById('installMenuItem');

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredInstallPrompt = e;
    installMenuItem.hidden = false;
  });

  function triggerInstall() {
    if (!deferredInstallPrompt) {
      // Most likely iOS Safari, or a browser without install-prompt support — there's no
      // programmatic install API there, so point the person at the manual steps instead.
      var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
      showToast(isIOS
        ? 'On iPhone/iPad: tap the Share icon, then "Add to Home Screen".'
        : 'Your browser doesn\u2019t support one-tap install here — look for "Add to Home Screen" or "Install app" in its menu.');
      return;
    }
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.finally(function () {
      deferredInstallPrompt = null;
      installMenuItem.hidden = true;
    });
  }

  window.addEventListener('appinstalled', function () {
    installMenuItem.hidden = true;
    showToast('Momentum installed \u2014 you can now open it like any other app.');
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {
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

  // Auto-open "What's new" once per version, on the first load after an update.
  var lastSeen = loadJSON(LAST_SEEN_VERSION_KEY, null);
  if (lastSeen !== APP_VERSION) {
    saveJSON(LAST_SEEN_VERSION_KEY, APP_VERSION);
    if (lastSeen !== null) {
      setTimeout(openWhatsNew, 500);
    }
  }
})();
