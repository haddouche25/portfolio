// public/sw.js
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Gestionnaire fetch minimal requis par le moteur PWA de Chrome
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request)),
  );
});
