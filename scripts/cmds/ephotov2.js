const axios = require('axios');

module.exports = {
  config: {
    name: "ephotov2",
    aliases: ["e3v2"],
    version: "1.0",
    author: "nayan",
    countDown: 5,
    role: 0,
    shortDescription: "Make A ephoto logo",
    longDescription: "Make A ephoto logo",
    category: "ephoto",
    guide: {
      en: "{pn}[text] | [number]",
    }
  },

  onStart: async function ({ api, message, args, event }) {
    try {
      api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
    const fuck = event.body.slice(event.body.indexOf(' ') + 1);
      const [text, text2, number] = fuck.split("|").map((item) => item.trim());
    if (!text && !number) {
      return message.reply("❎ | Please enter a text and select number\n🔰 | Example: {pn}[text] | [number]");
    }

      if (number == "1"){ var url = "https://ephoto360.com/tao-logo-phong-cach-pornhub-612.html"} 

const {textpro, photoxy, ephoto} = require("nayan-server")

        const data = await ephoto(url, [text, text2])
      console.log(data)
      const img = data.url;
      console.log(data)
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
                 const form = {
        body: `
☂ | Here's Your ephoto logo...
⚫ | Name: ${text}
⚪ | Logo Number: ${number}/10
🔰 | Mostakim☂`
      };
        form.attachment = []
        form.attachment[0] = await global.utils.getStreamFromURL(img);
      message.reply(form);

      } catch (err) {
        api.setMessageReaction("❎", event.messageID, (err) => {}, true);
        console.log(err);
      };
}
}