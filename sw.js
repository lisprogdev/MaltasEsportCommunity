// Service Worker untuk PWA dan Caching
const CACHE_NAME = 'maltas-esport-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/index.css',
  '/js/index.js',
  '/img/Logo/Logo.png',
  '/img/favicon/android-chrome-192x192.png',
  '/img/favicon/android-chrome-512x512.png',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
  'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.js',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap',
  'https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap'
];

// Install event
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
