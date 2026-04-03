const VERSION = 'la-liste-v7';
const CACHE = VERSION;
const PRECACHE = ['/la-liste/', '/la-liste/index.html', '/la-liste/manifest.json'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PRECACHE))); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
  const url = event.request.url;
  if (url.includes('firebaseio.com') || url.includes('firebase') || url.includes('googleapis') || url.includes('gstatic')) { event.respondWith(fetch(event.request)); return; }
  event.respondWith(fetch(event.request).then(response => { if (response.ok) { const copy = response.clone(); caches.open(CACHE).then(cache => cache.put(event.request, copy)); } return response; }).catch(() => caches.match(event.request)));
});
self.addEventListener('message', event => { if (event.data && event.data.action === 'skipWaiting') self.skipWaiting(); });