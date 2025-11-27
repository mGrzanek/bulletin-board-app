/* eslint-disable no-restricted-globals */

const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";
const FALLBACK_IMAGE = "/images/attention.jpg";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(async (cache) => {
      const manifestResponse = await fetch("/asset-manifest.json");
      const manifest = await manifestResponse.json();

      const files = [
        "/",
        "/index.html",
        "/manifest.json",
        "/favicon.ico",
        FALLBACK_IMAGE,
      ];

      Object.values(manifest.files).forEach((file) => {
        if (file.startsWith("/static/")) files.push(file);
      });

      return cache.addAll(files);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== STATIC_CACHE && k !== DYNAMIC_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (url.pathname.startsWith("/api") || url.pathname.startsWith("/auth")) {
    return;
  }

  if (req.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then((resp) => resp || fetch("/index.html"))
    );
    return;
  }

  if (url.origin !== self.origin) return;
  event.respondWith(
    caches.match(req).then((cacheResp) => {
      if (cacheResp) return cacheResp;

      return fetch(req)
        .then((networkResp) => {
          if (!networkResp || !networkResp.ok) return cacheResp;

          const clone = networkResp.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => cache.put(req, clone));
          return networkResp;
        })
        .catch(() => cacheResp || caches.match(FALLBACK_IMAGE));
    })
  );
});
