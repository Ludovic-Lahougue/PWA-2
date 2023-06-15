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
   * Fonction **navigator.serviceWorker.getRegistrations()** : pour obtennir les enregistrements des services workers, si il y a au moins un enregistrement on affiche le bouton pour se désabonner, sinon on affiche le bouton pour s'abonner.
   * Si on click sur s'abonner : on créer le service worker -> voir [**Service Workers**](##Service-Worker)
   * Si on click sur se désabonner : 

  ## Service Worker

  * Fonction **document.getElementById('subscribe').addEventListener('click',...** : 
    - Fonction **check()** : vérifie si le navigateur prend en charge les Service Workers.
    - Fonction **registerServiceWorker()** : enregistrement du service worker
    - Fonction **requestNotificationPermission()** : demande la permission d'afficher des notifications au navigateur
      
  * Fonction **document.getElementById('unsubscribe').addEventListener('click',...)** : 
    - fonction **registration.unregister()** :
   
  * Fonction **sendNotification()** :
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
## Module webpush

  
  ## Hébergement
