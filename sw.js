// KIDNY Service Worker - Offline Support & Asset Caching
const CACHE_NAME = 'kidny-cache-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './index2.html',
  './manifest.json',
  './favicon.ico',
  './icons/kidney.svg',
  './icons/kidney-mark.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32x32.png'
];

// External CDN dependencies to cache when fetched
const CDN_URLS = [
  'cdn.tailwindcss.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Check if request is local or from allowed CDNs
  const isLocal = url.origin === self.location.origin;
  const isCDN = CDN_URLS.some((cdn) => url.hostname.includes(cdn));

  if (isLocal || isCDN) {
    const isNavigation = event.request.mode === 'navigate' ||
      url.pathname.endsWith('.html') ||
      url.pathname === '/' ||
      url.pathname.endsWith('/');

    if (isNavigation) {
      // Network-First for HTML/navigation to guarantee immediate live updates
      event.respondWith(
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => {
            return caches.match(event.request).then((cached) => cached || caches.match('./index.html'));
          })
      );
      return;
    }

    // Stale-While-Revalidate for images, stylesheets, fonts, and assets
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        }).catch(() => null);

        return cachedResponse || fetchPromise;
      })
    );
  }
});
