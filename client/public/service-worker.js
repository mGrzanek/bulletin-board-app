/* eslint-disable no-restricted-globals */

const STATIC_CACHE = "static-v2";
const DYNAMIC_CACHE = "dynamic-v2";
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

const networkFirstAPI = async (req) => {
  try {
    const resp = await fetch(req);
    if (!resp.ok) throw new Error("network error");
    return resp;
  } catch (err) {
    return new Response(JSON.stringify({ error: "offline" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
};

const cacheFirstDynamic = async (req) => {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResp = await cache.match(req);
  if (cachedResp) return cachedResp;

  try {
    const networkResp = await fetch(req);
    if (networkResp && networkResp.ok) cache.put(req, networkResp.clone());
    return networkResp;
  } catch {
    return cachedResp || new Response("offline", { status: 503 });
  }
};

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (url.pathname.startsWith("/api") || url.pathname.startsWith("/auth")) {
    event.respondWith(networkFirstAPI(req));
    return;
  }

  if (req.mode === "navigate") {
    event.respondWith(
      caches.match("/index.html").then((resp) => resp || fetch("/index.html"))
    );
    return;
  }

  if (url.origin !== self.origin) return;


  if (req.method === "GET") {
    event.respondWith(cacheFirstDynamic(req));
  }
});
