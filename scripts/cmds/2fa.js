const axios = require("axios");

module.exports = {
  config: {
    name: "2fa",
    aliases: ["2factorauth"],
    version: "1.0",
    author: "ASIF",
    countDown: 2,
    role: 0,
    description: {
      en: "𝗥𝗲𝘁𝗿𝗶𝗲𝘃𝗲 2𝗳𝗮 𝗰𝗼𝗱𝗲𝘀 𝗯𝘆 𝗸𝗲𝘆"
    },
    category: "𝗧𝗢𝗢𝗟𝗦",
    guide: {
      en: "{pn} [key]"
    }
  },

  onStart: async function ({ api, message, args, event }) {
    const key = args.join(' ');
    if(!key){
      return message.reply("⚠ | 𝗣𝗹𝗲𝗮𝘀𝗲 𝗣𝗿𝗼𝘃𝗶𝗱𝗲 𝗮 2𝗳𝗮 𝗞𝗲𝘆 ");
      }
   try {
        api.setMessageReaction("⏳", event.messageID, (err) => {}, true);
        const w = await message.reply("⏳ | 𝗣𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁...");
        const { data } = await axios.get(`${global.api.dipto}/2fa?key=${encodeURI(key)}`);
        if (data){
        api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        await message.reply(`
✅ | 2𝙵𝙰 𝙲𝙾𝙳𝙴 𝙵𝙾𝚁 ▶ ${data.key}
  ☂️ | 𝙲𝙾𝙳𝙴: ${data.data}
  `);
        }else{
          message.reply("⚠ | 𝗣𝗹𝗲𝗮𝘀𝗲 𝗶𝗻𝗽𝘂𝘁 𝗮 𝘃𝗮𝗹𝗶𝗱 2𝗳𝗮 𝗸𝗲𝘆  ");
         }
         message.unsend(w.messageID);
      } catch (error) {
        console.error(error);
        message.reply(`❌ | 𝗘𝗿𝗿𝗼𝗿: ${error.message}`);
      }
  }
};