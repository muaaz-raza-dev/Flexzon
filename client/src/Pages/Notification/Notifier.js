const Notifier = () => {

    Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Unable to get permission to notify.');
        }
      });
        self.addEventListener('push', function(event) {
        const title = 'New notification is waiting for';
        const options = {
          body: 'Someone start selling his ass!',
        };
      event?.waitUntil(self?.registration.showNotification(title, options));
      });
}

export default Notifier
