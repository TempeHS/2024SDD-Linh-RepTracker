self.addEventListener('install', function (event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function (event) {
  const title = 'RepTracker Timer Ended';
  const options = {
      body: 'Your timer has ended!',
      icon: '/path/to/icon.png', // Replace with path to your app's icon
      badge: '/path/to/badge.png' // Replace with path to your app's badge
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
