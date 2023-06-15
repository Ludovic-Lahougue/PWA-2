const check = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error('No Service Worker support!')
    }
    if (!('PushManager' in window)) {
        throw new Error('No Push API Support!')
    }
}

const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register('js/service.js');
    return swRegistration;
}

const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    if(permission !== 'granted'){
        throw new Error('Permission not granted for Notification');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
  const registrations = await navigator.serviceWorker.getRegistrations();
  console.log(registrations.length)
  if(registrations.length > 0) {
    document.getElementById('subscribe').style.display = "none";
    document.getElementById('unsubscribe').style.display = "inline";
  } else {
    document.getElementById('subscribe').style.display = "inline";
    document.getElementById('unsubscribe').style.display = "none";
  }
  document.getElementById('subscribe').addEventListener('click', async _e => {
    check();
    const swRegistration = await registerServiceWorker();
    const permission =  await requestNotificationPermission();
    document.getElementById('subscribe').style.display = "none";
    document.getElementById('unsubscribe').style.display = "inline";
  })

  document.getElementById('unsubscribe').addEventListener('click', async _e => {
    for(const registration of registrations) {
      registration.unregister();
    }
    document.getElementById('subscribe').style.display = "inline";
    document.getElementById('unsubscribe').style.display = "none";
  })
})
