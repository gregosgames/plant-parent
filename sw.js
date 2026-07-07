/* Plant Parent service worker — offline-first app shell.
   Bump CACHE_VERSION whenever the shell files change. */
const CACHE_VERSION = 'pp-v1';
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const CDN_CACHE = `${CACHE_VERSION}-cdn`;

const SHELL_ASSETS = [
  './plant-parent.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
];

// CDN hosts we cache (Leaflet + Supabase libs). Everything else — Supabase
// data, iNaturalist, Anthropic, Nominatim, OSM tiles — goes straight to the
// network: live data shouldn't be served stale, and OSM's tile policy asks
// apps not to bulk-cache tiles.
const CDN_HOSTS = ['unpkg.com', 'cdn.jsdelivr.net'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => !k.startsWith(CACHE_VERSION)).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET') return;

  // Navigations: network-first so updates land, cached shell when offline
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL_CACHE).then((c) => c.put('./plant-parent.html', copy));
          return res;
        })
        .catch(() => caches.match('./plant-parent.html'))
    );
    return;
  }

  // Shell assets: cache-first
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then((hit) => hit || fetch(event.request))
    );
    return;
  }

  // CDN libraries: stale-while-revalidate
  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(
      caches.open(CDN_CACHE).then(async (cache) => {
        const hit = await cache.match(event.request);
        const refresh = fetch(event.request)
          .then((res) => { if (res.ok) cache.put(event.request, res.clone()); return res; })
          .catch(() => hit);
        return hit || refresh;
      })
    );
  }
});
