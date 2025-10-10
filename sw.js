// sw.js — service worker
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open('v1').then(cache => cache.addAll(['/']))
  );
});

self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Site updated!';
  const body = data.body || 'Click to open the latest version.';
  const url = data.url || '/';

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: '/favicon.png',
      badge: '/favicon.png',
      data: { url }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data.url;
  event.waitUntil(clients.openWindow(url));
});
