document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('testNotif').addEventListener('click', _e => {
      const message = document.getElementById("message").value;
      sendNotification(message);
  })
})

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