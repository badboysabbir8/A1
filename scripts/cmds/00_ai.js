const axios = require("axios");

module.exports = function(app) {
  // Handle incoming messages
  app.post('/webhook', async function(req, res) {
    const { body } = req;
    const messagingEvents = body.entry[0].messaging;

    for (let i = 0; i < messagingEvents.length; i++) {
      const event = messagingEvents[i];

      if (event.message && event.message.text) {
        await handleMessage(event.sender.id, event.message.text);
      }
    }

    res.sendStatus(200);
  });

  // Handle incoming messages
  async function handleMessage(senderId, messageText) {
    try {
      // Make an API call to get the answer
      const response = await axios.get("https://api.example.com/answer", {
        params: {
          question: messageText
        }
      });

      if (response.data && typeof response.data === "string") {
        // Truncate the answer to 500 characters
        const truncatedAnswer = response.data.slice(0, 500);
        await sendTextMessage(senderId, truncatedAnswer);
      } else {
        throw new Error("Invalid response from API");
      }
    } catch (error) {
      console.error(error);
      await sendTextMessage(senderId, "Sorry, I couldn't find an answer for your question.");
    }
  }

  // Send a text message
  async function sendTextMessage(recipientId, messageText) {
    try {
      const response = await axios.post("https://graph.facebook.com/v2.6/me/messages", {
        recipient: {
          id: recipientId
        },
        message: {
          text: messageText
        }
      }, {
        params: {
          access_token: "YOUR_ACCESS_TOKEN"
        }
      });

      if (response.status !== 200) {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
```