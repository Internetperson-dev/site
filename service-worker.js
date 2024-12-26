const CACHE_NAME = 'fortnite-pwa-cache-v1';
const urlsToCache = [
    'https://internetperson-dev.github.io/site/fornite/',
    'https://internetperson-dev.github.io/site/fornite/index.html',
    'https://internetperson-dev.github.io/site/icon-192x192.png',
    'https://internetperson-dev.github.io/site/icon-512x512.png',
    'https://internetperson-dev.github.io/site/fornite/style.css', // Include your CSS file if applicable
    'https://internetperson-dev.github.io/site/fornite/script.js'  // Include your JS file if applicable
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        }).catch(err => {
            console.error('Failed to cache resources:', err);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
