const cache_name = 'clarity-v2';
const cacheUrls = [
  './',
  './app.js',
  './challenge-collection.js',
  './challenge-form.js',
  './challenge-repo.js',
  './challenge.js',
  './sanitize.js',
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
      .then(() => {

      })
  );
});

self.addEventListener('activate', function(event) {
  // Active worker won't be treated as activated until promise
  // resolves successfully.
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== cache_name) {
            console.log('Deleting out of date cache:', cacheName);
            
            return caches.delete(cacheName);
          }
        })
      );
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