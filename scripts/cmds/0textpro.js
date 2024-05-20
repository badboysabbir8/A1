const axios = require('axios');

module.exports = {
  config: {
    name: "textpro",
    aliases: ["txtpro"],
    version: "1.0",
    author: "XNIL", //error fix xnil
    countDown: 5,
    role: 0,
    shortDescription: "Make A TextPro logo",
    longDescription: "Make A TextPro logo",
    category: "textpro",
    guide: {
      en: "{pn}[text] | [number]",
    }
  },

  onStart: async function ({ api, message, args, event }) {
    const uid = event.senderID;
    const prompt = args.join(" ");

    if (!prompt) {
      message.reply(`Example:${global.GoatBot.config.prefix}textpro Mostakim | 1\n\n🔥Total Edit limit 210...`);
      return;
    }

    try {
      api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
    const fuck = event.body.slice(event.body.indexOf(' ') + 1);
      const [text, number] = fuck.split("-").map((item) => item.trim());
    if (!text && !number) {
      return message.reply("❎ | Please enter a text and select number\n🔰 | Example: {pn}[text] | [number]");
    }

        const img = `https://xnil.replit.app/api/textpro?number=${number}&text=${encodeURIComponent(text)}`;		
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
                 const form = {
        body: `
☂ | Here's Your TextPro logo...
⚫ | Name: ${text}
⚪ | Logo Number: ${number}/205
🔰 | API BY XNIL ☂`
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