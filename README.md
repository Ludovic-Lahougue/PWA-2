# PWA-2

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
     - essai

  ## Service Worker
    * Fonction **check()** : vérifie si le navigateur prend en charge les Service Workers.
    * Fonction **registerServiceWorker()** : enregistrement du service worker
    * Fonction **requestNotificationPermission()** : demande la permission d'afficher des notifications au navigateur
    * Activation du service worker : event activate
    - On crée le service worker avec ses options (la key du serveur) -> renvoie un json avec l'endpoint
        (permet au navigateur d'envoyer la notificaton)
        et les keys qui permettent de différencier les services workers
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
* Le serveur parcours la liste des abonnés et leur envoie une notification grace à la bibliothèque [**webpush**](https://www.npmjs.com/package/web-push){target="_blank"}


## Module webpush

  
  ## Hébergement
