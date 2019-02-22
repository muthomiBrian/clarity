const cache_name = 'clarity-v1';
const cacheUrls = [
  './',
  './app.js',
  './challenge-collection.js',
  './challenge-form.js',
  './challenge-repo.js',
  './challenge.js',
  './idb.js',
  './main.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cache_name)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(cacheUrls)
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(cache_name)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});