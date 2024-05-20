const express = require('express');
const bodyParser = require('body-parser');
const { Expo } = require('expo-server-sdk');

// Create a new Expo SDK client
const expo = new Expo();

// Create an Express application
const app = express();
app.use(bodyParser.json());

// Store push tokens
let savedPushTokens = [];

const saveToken = (token) => {
  if (!savedPushTokens.includes(token)) {
    savedPushTokens.push(token);
    console.log(`Saved push token: ${token}`); // Log saved token
  }
};

app.post('/store-push-token', (req, res) => {
  const { token } = req.body;
  console.log(`Received push token: ${token}`); // Log received token
  saveToken(token);
  res.send('Token stored');
});

app.post('/send-notification', (req, res) => {
  const { title, body, data, priority } = req.body;
  console.log(`Sending notification with title: ${title}, body: ${body}, priority: ${priority}`); // Log notification details

  let notifications = [];
  for (let pushToken of savedPushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    notifications.push({
      to: pushToken,
      sound: 'default',
      title,
      body,
      data,
      priority,
    });
  }

  let chunks = expo.chunkPushNotifications(notifications);
  let tickets = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
        console.log(`Sent notification: ${JSON.stringify(ticketChunk)}`); // Log sent notification
      } catch (error) {
        console.error(error);
      }
    }
  })();

  res.send('Notifications sent');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
