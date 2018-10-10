/* eslint no-restricted-globals: "off", no-console: "off" */

// Log utility
const logMsg = msg => console.log('%c [SW] ', 'padding: 4px; color: white; background: #16a085', msg);
const logErr = err => console.log('%c [SW] ', 'padding: 4px; color: white; background: #c0392b', err);

// This comes from the serviceworker-webpack-plugin
const { assets } = global.serviceWorkerOption;

// Config
const config = {
  caches: {
    [`youprefer-statics-${new Date().toISOString()}`]: [
      ...assets,
      '/',
    ],
  },

  indexPage: '/index.html',
};

self.addEventListener('install', (event) => {
  logMsg('Install event');

  event.waitUntil(
    Promise.all(
      Object.keys(config.caches).map(cacheName => caches.open(cacheName).then((cache) => {
        cache.addAll(config.caches[cacheName]);
      }).then(() => {
        logMsg(`Added ${config.caches[cacheName].lentgh} items to cache ${cacheName}`);
      }).catch(err => logErr(err))),
    ),
  );
});

self.addEventListener('activate', (event) => {
  logMsg('Activate event');

  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.filter(name => !Object.keys(config.caches).includes(name))
        .map(name => caches.delete(name)),
    )),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore not GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Send the index page when needed
  if (url.origin === location.origin && url.pathname === '/') {
    event.respondWith(caches.match(config.indexPage));
    return;
  }

  // For every request, try to pull it from the cache, fallback to network
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match(config.indexPage)),
  );
});
