const CACHE_NAME = "hoop-cache-v2"; // غيرنا الاسم عشان يجبره يحدث الكاش
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
];

// install
self.addEventListener("install", (event) => {
  self.skipWaiting(); // عشان التحديث يشتغل فورًا
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim(); // يخلي الـ SW يسيطر على الصفحات فورًا
});

// fetch (network first, fallback to cache)
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // fallback من الكاش لو حصل خطأ
        return caches.match(event.request);
      })
  );
});
