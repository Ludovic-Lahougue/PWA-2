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
app.get('/', (req, res) => res.render('../index.html'));
app.get('/test-test', (req, res) => res.send('Hello World!'))
const dummyDb = { subscriptions: [] }
const saveToDatabase = async subscription => {
  if (!dummyDb.subscriptions.includes(subscription))
    dummyDb.subscriptions.push(subscription)
}
app.post('/save-subscription', async (req, res) => {
  const subscription = req.body
  console.log('accepté');
  await saveToDatabase(subscription) //Method to save the subscription to Database
  res.json({ message: 'success' })
})
app.get('/send-notification', (req, res) => {
  for (const subscription of dummyDb.subscriptions) {
    const message = 'Hello World'
    sendNotification(subscription, message)
    res.json({ message: 'message sent' })
  }
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))