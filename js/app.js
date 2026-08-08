(function () {
  'use strict';

  var APP_NAME = 'Momentum';
  var APP_VERSION = '1.0.0';

  var TASKS_KEY = 'momentum.tasks.v1';
  var CATEGORIES_KEY = 'momentum.categories.v1';
  var THEME_KEY = 'momentum.theme.v1';
  var DEFAULT_CATEGORIES = ['Personal', 'Work', 'Health', 'Learning'];

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

  // ---------- filter tabs ----------
  document.getElementById('filterTabs').addEventListener('click', function (e) {
    var btn = e.target.closest('.tab');
    if (!btn) return;
    filter = btn.getAttribute('data-filter');
    document.querySelectorAll('#filterTabs .tab').forEach(function (b) { b.classList.toggle('active', b === btn); });
    renderTaskList();
  });

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
    modal.hidden = false;
    setTimeout(function () { document.getElementById('taskTitle').focus(); }, 50);
  }
  function closeModal() { modal.hidden = true; closeAllDropdowns(); }

  document.getElementById('addTaskBtn').addEventListener('click', openModal);
  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-close-modal]')) closeModal();
  });
  document.getElementById('addSubtaskField').addEventListener('click', function () { addSubtaskFieldRow(''); });

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
    var ws = XLSX.utils.json_to_sheet(rows);
    ws['!cols'] = [{ wch: 12 }, { wch: 30 }, { wch: 14 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 30 }, { wch: 14 }];
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

    var html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">'
      + '<head><meta charset="utf-8"><title>' + APP_NAME + ' Report</title></head><body>'
      + '<h1 style="font-family:Calibri,Arial,sans-serif;">' + APP_NAME + ' — Task Report</h1>'
      + '<p style="font-family:Calibri,Arial,sans-serif;color:#666;font-size:11px;">Generated ' + new Date().toLocaleString() + ' · ' + APP_NAME + ' v' + APP_VERSION + '</p>'
      + '<table border="1" cellspacing="0" cellpadding="6" style="border-collapse:collapse;font-family:Calibri,Arial,sans-serif;font-size:12px;width:100%;">'
      + '<tr style="background:#5B2A9E;color:#fff;"><th>Date</th><th>Task / Subtask</th><th>Category</th><th>Priority</th><th>Status</th><th>Repeats</th></tr>'
      + body + '</table></body></html>';

    var blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    downloadBlob(blob, filenameBase() + '.doc');
  }

  function exportPdf() {
    if (typeof window.jspdf === 'undefined') { showToast('PDF export library failed to load. Check your connection.'); return; }
    var doc = new window.jspdf.jsPDF();
    doc.setFontSize(18);
    doc.text(APP_NAME + ' — Task Report', 14, 18);
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text('Generated ' + new Date().toLocaleString() + ' · ' + APP_NAME + ' v' + APP_VERSION, 14, 25);

    var rows = flattenRows().map(function (r) {
      return [r.Date, r.Subtask ? ('  • ' + r.Subtask) : r.Task, r.Category, r.Priority, r.Subtask ? r.SubStatus : r.Status, r.Repeats];
    });

    doc.autoTable({
      startY: 32,
      head: [['Date', 'Task / Subtask', 'Category', 'Priority', 'Status', 'Repeats']],
      body: rows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [91, 42, 158] }
    });
    doc.save(filenameBase() + '.pdf');
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

  var restoreInput = document.getElementById('restoreInput');
  function restoreJson() { restoreInput.click(); }
  restoreInput.addEventListener('change', function () {
    var file = restoreInput.files[0];
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
        showToast('Backup restored successfully.');
      } catch (err) {
        showToast('This file does not look like a valid Momentum backup.');
      }
    };
    reader.readAsText(file);
    restoreInput.value = '';
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
    else if (action === 'restore') restoreJson();
  });

  // ---------- init ----------
  document.getElementById('versionLabel').textContent = APP_VERSION;
  applyTheme();
  carryOverRecurringTasks();
  renderAll();
})();
