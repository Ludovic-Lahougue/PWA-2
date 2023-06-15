const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const webpush = require('web-push') //requiring the web-push module
const app = express()
var path = require('path');

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
const port = 4000;
const vapidKeys = {
  publicKey:
    'BIDc9rOrTX1dwYO5pKB9vIvC7h0PixN3zKTNCS-Or3m3rByfZfmj7mSzKu9jT6T36V8mCzNXstbRHWGc16o_oao',
  privateKey: 'RizUrB9KPjKW-eglSQ-LKdCr_OmuaJPChTn_KxjHlsA',
}//setting our previously generated VAPID keys
webpush.setVapidDetails(
  'mailto:myuserid@email.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend = '') => {
  webpush.sendNotification(subscription, dataToSend)
}
app.get('/', (req, res) => res.render('index.html'));
console.log(__dirname)
app.get('/send', (req, res) => res.sendFile(path.join(__dirname+'/public/html/send.html')))
const dummyDb = { subscriptions: [] }
const saveToDatabase = async subscription => {
  if (!dummyDb.subscriptions.includes(subscription))
    dummyDb.subscriptions.push(subscription)
  else console.log("Déjà enregistré")
}

app.post('/save-subscription', async (req, res) => {
  const subscription = req.body
  console.log('accepté', subscription);
  await saveToDatabase(subscription) //Method to save the subscription to Database
  res.json({ message: 'success' })
})
app.post('/send-notification', async (req, res) => {
  const {message} = req.body;
  for (const subscription of dummyDb.subscriptions) {
    sendNotification(subscription, message)
  }
  res.json({ message: 'message sent' })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))