/* Service worker: cachea el "shell" de la app para que funcione offline.
   Los datos NO se cachean acá: viven en localStorage y se sincronizan
   contra api.github.com (que siempre va a la red). */
const CACHE = "finanzas-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // La API de GitHub (sincronización) siempre va a la red, nunca al cache.
  if (url.hostname === "api.github.com" || url.hostname === "gist.githubusercontent.com") return;

  // El HTML de la app: NETWORK-FIRST → siempre trae la última versión cuando
  // hay internet, y usa el cache solo si estás offline. Así se actualiza sola.
  const isDoc = req.mode === "navigate" || req.destination === "document" ||
                url.pathname.endsWith("/") || url.pathname.endsWith(".html");
  if (isDoc) {
    e.respondWith(
      fetch(req)
        .then((resp) => {
          const copy = resp.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return resp;
        })
        .catch(() => caches.match(req).then((c) => c || caches.match("./index.html")))
    );
    return;
  }

  // Resto de archivos (íconos, manifest): cache-first con actualización de fondo.
  e.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((resp) => {
          if (resp && resp.status === 200 && url.protocol.startsWith("http")) {
            const copy = resp.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return resp;
        })
        .catch(() => cached || caches.match("./index.html"));
      return cached || network;
    })
  );
});
