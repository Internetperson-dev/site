self.addEventListener('push', e => {
  const data = e.data?.json() || {};
  e.waitUntil(
    self.registration.showNotification(
      data.title || 'Site Updated!',
      { body: data.body || 'A new version is live.', icon:'/favicon.png' }
    )
  );
});
