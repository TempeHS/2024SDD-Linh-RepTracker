self.addEventListener('push', function(event) {
    const options = {
        body: 'Your timer has expired!',
        icon: 'path/to/your/icon.png',
        badge: 'path/to/your/badge.png'
    };

    event.waitUntil(
        self.registration.showNotification('Timer Expired', options)
    );
});