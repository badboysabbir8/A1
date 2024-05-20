const axios = require('axios');

module.exports = {
  config: {
    name: "photoxy",
    aliases: ["py"],
    version: "1.0",
    author: "nayan",
    countDown: 5,
    role: 0,
    shortDescription: "Make A photoxy logo",
    longDescription: "Make A photoxy logo",
    category: "photoxy",
    guide: {
      en: "{pn}[text] | [number]",
    }
  },

  onStart: async function ({ api, message, args, event }) {
    try {
      api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
    const fuck = event.body.slice(event.body.indexOf(' ') + 1);
      const [text, number] = fuck.split("|").map((item) => item.trim());
    if (!text && !number) {
      return message.reply("❎ | Please enter a text and select number\n🔰 | Example: {pn}[text] | [number]");
    }
      if (number == "1"){ var url = "https://photooxy.com/logo-and-text-effects/put-your-text-on-a-coffee-cup--174.html"}
      if (number == "2"){ var url = "https://photooxy.com/logo-and-text-effects/write-text-on-the-cup-392.html"}
      if (number == "3"){ var url ="https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html"}
      if (number == "4"){ var url ="https://photooxy.com/logo-and-text-effects/butterfly-text-with-reflection-effect-183.html"}
      if (number == "5"){ var url ="https://photooxy.com/logo-and-text-effects/make-smoky-neon-glow-effect-343.html"}
      if (number == "6"){ var url ="https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html"} 
      if (number == "7"){ var url ="https://photooxy.com/create-online-reflected-neon-light-text-effect-421.html"}
      if (number == "8"){ var url ="https://photooxy.com/logo-and-text-effects/write-text-on-burn-paper-388.html"}
      if (number == "9"){ var url ="https://photooxy.com/logo-and-text-effects/bevel-text-between-royal-patterns-166.html"}
      if (number == "10"){ var url ="https://photooxy.com/logo-and-text-effects/text-on-scary-cemetery-gate-172.html"}
      if (number == "11"){ var url ="https://photooxy.com/logo-and-text-effects/put-text-on-the-cup-387.html"}
      if (number == "12"){ var url ="https://photooxy.com/logo-and-text-effects/love-text-effect-372.html"}
      if (number == "13"){ var url ="https://photooxy.com/logo-and-text-effects/glow-rainbow-effect-generator-201.html"} 
      if (number == "14"){ var url ="https://photooxy.com/logo-and-text-effects/carved-wood-effect-online-171.html"}
      if (number == "15"){ var url ="https://photooxy.com/logo-and-text-effects/put-your-text-on-a-coffee-cup--174.html"} 
      if (number == "16"){ var url ="https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html"} 
      if (number == "17"){ var url ="https://photooxy.com/logo-and-text-effects/rainbow-shine-text-223.html"} 
      if (number == "18"){ var url ="https://photooxy.com/logo-and-text-effects/create-harry-potter-text-on-horror-background-178.html"} 
      if (number == "19"){ var url ="https://photooxy.com/logo-and-text-effects/smoke-typography-text-effect-170.html"} 
      if (number == "20"){ var url ="https://photooxy.com/logo-and-text-effects/romantic-messages-for-your-loved-one-391.html"} 
const {textpro, photoxy} = require("nayan-server")

        const data = await photoxy(url, text)
      const img = data.url;
      console.log(data)
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
                 const form = {
        body: `
☂ | Here's Your photoxy logo...
⚫ | Name: ${text}
⚪ | Logo Number: ${number}/30
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