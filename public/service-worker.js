const CACHE_NAME = "hoop-cache-v1";

// الملفات اللي فعلاً موجودة في مجلد public
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon512_rounded.png",
];

// install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }).catch(err => {
      console.error("Error caching during install:", err);
    })
  );
});

// activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((response) => {
          if (!response || !response.ok) return response;

          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch((err) => {
          console.error("Fetch failed:", err);
          // ممكن ترجعي صفحة offline.html هنا لو حابة
        });
    })
  );
});
