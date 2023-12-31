# PWA-2

[**https://pwa--ludovic-lahougu.repl.co/**](https://pwa--ludovic-lahougu.repl.co/)
<img src="https://i.imgur.com/qpxXRxo.png" width="500" height="500">

## Manifest
```json
{
    "short_name": "NOTIF",
    "name": "PWA NOTIFICATION",
    "theme_color": "#f7f7f7",
    "background_color": "#d3d1d3",
    "display": "fullscreen",
    "Scope": "/",
    "orientation": "portrait",
    "start_url": "./index.html",
    "icons": [
      {
        "src": "./img/icon.png",
        "type": "image/png",
        "sizes": "48x48"
      },
      {
        "src": "./img/icon.png",
        "type": "image/png",
        "sizes": "96x96"
      },
      {
        "src": "/img/icon.png",
        "type": "image/png",
        "sizes": "192x192"
      }
    ]
  }
  ```
## Page d'accueil
* Fonction **navigator.serviceWorker.getRegistrations()** : pour obtennir les enregistrements des services workers,
si il y a au moins un enregistrement on affiche le bouton pour se désabonner, sinon on affiche le bouton pour s'abonner.
* Si on click sur s'abonner : on créer le service worker -> voir [**Service Workers**](#service-worker)
* Si on click sur se désabonner : on supprime le service worker

## Service Worker création
* Fonction **check()** : vérifie si le navigateur prend en charge les Service Workers.
* Fonction **registerServiceWorker()** : enregistrement du service worker
* Fonction **requestNotificationPermission()** : demande la permission d'afficher des notifications au navigateur
* Activation du service worker : event activate
    - On crée le service worker avec ses options (la key du serveur) -> renvoie un json avec l'endpoint
      (permet au navigateur d'envoyer la notificaton)
      et les keys qui permettent de différencier les services workers
    ```js
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
    ```
    - Requête vers le serveur pour enregistrer l'utilisateur dans la base de données
      des abonnés (enregistrement du json précédent).

## Envoie des notifications
* Page pour personnaliser la notification et l'envoyer
* Fonction **sendNotification()** : requête au serveur avec le contenu de la notification
    
```js
const sendNotification = async message => {
    const SERVER_URL = 'https://pwa--ludovic-lahougu.repl.co/send-notification'
    const response = await fetch(SERVER_URL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({message: message})
    })
    return response.json()
}
```
* Le serveur parcours la liste des abonnés et leur envoie une notification grace à la bibliothèque [**webpush**](https://www.npmjs.com/package/web-push)


## Module webpush
* Web push nécessite que les messages push déclenchés à partir d'un backend soient effectués via le protocole Web Push.
* Ce module facilite l'envoi de messages et gère également la prise en charge héritée des navigateurs s'appuyant sur GCM pour l'envoi/la livraison de messages.
* La Push API est une interface JavaScript qui permet aux développeurs d'enregistrer un utilisateur pour les notifications push et d'envoyer des messages push depuis un serveur vers le navigateur. Elle fournit des méthodes et des événements pour gérer les abonnements, les autorisations et les messages push.

## Service Worker réception
* Event push en écoute (il transporte les informations de la notification à envoyer)
    ```js
    self.addEventListener('push', function(event) {
            if (event.data) {
                console.log('Push event!! ', event.data.text())
                showLocalNotification("Nouveau message", event.data.text(),  self.registration);
        })
        
        const showLocalNotification = (title, body, swRegistration) => {
            const options = {
                body
            };
            swRegistration.showNotification(title, options);
    };
    ```
* Il affiche la notification avec la méthode [**showNotification()**](https://developer.mozilla.org/fr/docs/Web/API/ServiceWorkerRegistration/showNotification)

## Hébergement
* Serveur Express
* Solution choisie [**Replit**](https://replit.com/)
![Capture d'écran replit](https://i.imgur.com/3sCyrgZ.png)
