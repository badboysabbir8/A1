const axios = require('axios');
const path = require('path');
const fs = require('fs');

module.exports = {
  config: {
    name: "animegen",
    aliases: [`anigen`],
    version: "1.1",
    author: "ArYAN",
    countDown: 0,
    role: 0,
    shortDescription: {
      en: 'Generate anime images based on user inputs.'
    },
    longDescription: {
      en: "Text to image"
    },
    category: "media",
    guide: {
      en: ".anigen < prompt >"
    }
  },

  onStart: async function({ message, args, event }) {
    const text = args.join(" ");
    if (!text) {
      return message.reply("⛔ Invalid Usage\nPlease provide a prompt.");
    }

    let prompt = text;

    try {
      message.reply("⏰ Creating your Imagination...").then((info) => { id = info.messageID });

      const API = `https://aryan-apis.onrender.com/api/anigen?prompt=${encodeURIComponent(prompt)}&apikey=aryan`;
      const imageStream = await global.utils.getStreamFromURL(API);

      return message.reply({
        body: `🖼️ 𝗔𝗡𝗜𝗚𝗘𝗡\n━━━━━━━━━━━━━━`,
        attachment: imageStream
      });
    } catch (error) {
      console.error(error);
      message.reply("Failed to generate your imagination.");
    }
  }
}; 