const axios = require('axios');

module.exports = {
  config: {
    name: "imgur2",
    version: "1.0",
    author: "otinxsandip",
    countDown: 5,
    role: 0,
    longDescription: "Imgur link",
    category: "image",
    guide: {
      en: "{n} reply to image"
    }
  },

  onStart: async function(){},
  onChat: async function({ message, event, args, commandName, api, usersData}) {
    const permission = global.GoatBot.config.vipUser;
     if (!permission.includes(event.senderID));
       
    const input = event.body;
          if(input && input.trim().toLowerCase().startsWith('imgurl')){
           const data = input.split(" ");
           data.shift();
    const puti = event.messageReply?.attachments[0]?.url || data.join(" ");

    if (!puti) {

    }

    try {
        const response = await axios.get(`https://d1p-imgur.onrender.com/dip?url=${encodeURIComponent(puti)}`);
      const imgurLink = response.data.data;
      return message.reply(imgurLink);
    } catch (error) {
      console.error(error);
      return message.reply('api error.');
    }
  }
  }
};