const axios = require("axios");
let targetMessageID;

module.exports = {
  config: {
    name: 'pi',
    version: '1.0.14',
    author: 'Shikaki & Aliester Crowley',
    countDown: 10,
    role: 0,
    category: 'Ai',
    description: {
      en: 'pi ai : Can use Internet.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },

  onStart: async function ({ api, message, event, args, commandName }) {
    let prompt = args.join(" ");

    if (prompt.toLowerCase() === "clear") {
      const clear = await axios.get(`https://pi.aliestercrowley.com/api/reset?uid=${event.senderID}`);
      message.reply(clear.data.message);
      return;
    }

    let content = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");
    targetMessageID = (event.type == "message_reply") ? event.messageReply.messageID : event.messageID;
    if (content != "" && event.type == "message_reply") {

      prompt += content;
      let updatedPrompt = `Mostly answer in short like 1 or 2 sentenes unless it requires a long answer such as essay, poem or story and so on. Analyze the prompt and answer as instructed and only the necessary part. no additional fillers. Now : ${prompt}`;
      const url = `https://pi.aliestercrowley.com/api?prompt=${encodeURIComponent(updatedPrompt)}&uid=${targetMessageID}`;

      try {
        const response = await axios.get(url);
        const result = response.data.response;

        message.reply(`${result}`, (err, info) => {
          if (!err) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID,
            });
          }
        });
      } catch (error) {
        message.reply('An error occurred.');
      }
    } else {


      let updatedPrompt = `Mostly answer in short like 1 or 2 sentenes unless it requires a long answer such as essay, poem or story and so on. Analyze the prompt and answer as instructed and only the necessary part. no additional fillers. Now : ${content}`;
      const url = `https://pi.aliestercrowley.com/api?prompt=${encodeURIComponent(updatedPrompt)}&uid=${event.senderID}`;

      try {
        const response = await axios.get(url);
        const result = response.data.response;

        message.reply(`${result}`, (err, info) => {
          if (!err) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID,
            });
          }
        });
        
      } catch (error) {
        message.reply('An error occurred.');
      }
    }
  },

  onReply: async function ({ api, message, event, Reply, args }) {
    const prompt = args.join(" ");
    let { author, commandName } = Reply;
    if (event.senderID !== author) return;

    const url = `https://pi.aliestercrowley.com/api?prompt=${encodeURIComponent(prompt)}&uid=${event.senderID}`;
    try {
      const response = await axios.get(url);

      const content = response.data.response;

      message.reply(`${content}`, (err, info) => {
        if (!err) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
          });
        }
      });

      
    } catch (error) {
      console.error(error.message);
      message.reply("An error occurred.");
      
    }
  },
};