self.addEventListener('push', event => {
    const data = event.data ? event.data.text() : 'No data';
    self.registration.showNotification('Received:', {
        body: data,
        icon: '/logo192.png'
    });
});
