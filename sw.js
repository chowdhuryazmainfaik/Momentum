// Momentum service worker — minimal offline cache so the app is installable as a PWA
// and its shell still loads without a network connection. Task data itself lives in
// localStorage, not here.

var CACHE_NAME = 'momentum-cache-v4';
var CORE_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './assets/logo-icon-light.png',
  './assets/logo-icon-dark.png',
  './assets/favicon-192.png',
  './assets/favicon-512.png',
  './assets/manifest.webmanifest'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { return cache.addAll(CORE_ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) { return key !== CACHE_NAME; })
          .map(function (key) { return caches.delete(key); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

// Cache-first for the app shell, falling back to network (and caching the response)
// for anything else same-origin. Never intercepts cross-origin requests (CDN export
// libraries, the Daybook link, etc.) — those always go straight to the network.
self.addEventListener('fetch', function (event) {
  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin || event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;
      return fetch(event.request).then(function (response) {
        if (response && response.ok) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, copy); });
        }
        return response;
      }).catch(function () {
        if (event.request.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
