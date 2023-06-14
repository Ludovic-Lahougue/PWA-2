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

const main = async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for(let registration of registrations) {
        console.log(registration);
        registration.unregister();
    }
    check();
    const swRegistration = await registerServiceWorker();
    const permission =  await requestNotificationPermission();
}

main();

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('testNotif').addEventListener('click', e => {
        sendNotification();
    })
})

const sendNotification = async subscription => {
    const SERVER_URL = 'https://pwa--ludovic-lahougu.repl.co/send-notification'
    const response = await fetch(SERVER_URL, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.json()
}