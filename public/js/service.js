const urlB64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

const saveSubscription = async subscription => {
    const SERVER_URL = 'https://pwa--ludovic-lahougu.repl.co/save-subscription'
    const response = await fetch(SERVER_URL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
    })
    return response.json()
}

self.addEventListener('activate', async () => {
    try {
        const applicationServerKey = urlB64ToUint8Array(
            'BIDc9rOrTX1dwYO5pKB9vIvC7h0PixN3zKTNCS-Or3m3rByfZfmj7mSzKu9jT6T36V8mCzNXstbRHWGc16o_oao'
            )
            const options = { applicationServerKey, userVisibleOnly: true }
            const subscription = await self.registration.pushManager.subscribe(options)
            const response = await saveSubscription(subscription)
        } catch (err) {
            console.log('Error', err)
        }
  clients.claim();
})
    
    self.addEventListener('push', function(event) {
      console.log(event.data)
        if (event.data) {
            console.log('Push event!! ', event.data.text())
            showLocalNotification("Nouveau message", event.data.text(),  self.registration);
        } else {
            console.log('Push event but no data')
        }
    })
    
    const showLocalNotification = (title, body, swRegistration) => {
        console.log('notif');
        const options = {
            body
        };
        swRegistration.showNotification(title, options);
    };