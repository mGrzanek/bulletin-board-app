/* eslint-env serviceworker */
/* eslint-disable no-restricted-globals */
/* global workbox, clients */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

if (typeof workbox !== 'undefined') {
  console.log('✅ Workbox loaded');

  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

  // HTML pages + API requests
  workbox.routing.registerRoute(
    ({ request, url }) =>
      request.mode === 'navigate' ||
      url.pathname.startsWith('/api/') ||
      url.pathname.startsWith('/auth/'),
    new workbox.strategies.NetworkFirst({
      cacheName: 'network-first-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 1 dzień
        }),
      ],
    })
  );

  // Images (uploads & static)
  workbox.routing.registerRoute(
    ({ request, url }) =>
      request.destination === 'image' &&
      (url.pathname.startsWith('/uploads/') || url.pathname.startsWith('/images/')),
    new workbox.strategies.CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dni
        }),
      ],
    })
  );

  // Offline fallback for missing images
  const FALLBACK_IMAGE = '/images/attention.jpg';
  const FALLBACK_AVATAR = '/images/default-avatar.jpg';

  self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.destination === 'image') {
      event.respondWith(
        caches.match(request).then((cached) =>
          cached ||
          fetch(request).catch(() =>
            request.url.includes('/uploads/')
              ? caches.match(FALLBACK_AVATAR)
              : caches.match(FALLBACK_IMAGE)
          )
        )
      );
    }
  });

  self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
    console.log('Service Worker activated.');
  });
} else {
  console.log('❌ Workbox did not load');
}
