const axios = require("axios");

module.exports.config ={
    name: "claude",
    version: "1.0",
    author: "Dipto",
    description:"Claude 3 | made by Anthropic",
    countDown: 5,
    role: 0,
    category: "Claude ai",
    guide: {
      en: "{pn} message | photo reply"
    }
  },
module.exports.onStart = async ({ api, args , event}) => {
  const prompt = args.join(' ');
//---- Image Reply -----//
   if (event.type === "message_reply") {
  var t = event.messageReply.attachments[0].url;
    try {
      const response= await axios.get(`${global.api.dipto}/claude?prompt=${encodeURIComponent(prompt)}&url=${encodeURIComponent(t)}`)
      const data2 = response.data.data;
  api.sendMessage(data2, event.threadID, event.messageID);
  } catch (error) {
    console.error('Error:', error.message);
    api.sendMessage(error, event.threadID, event.messageID);
  }
  }
  //---------- Message Reply ---------//
else if(!prompt) {
   return api.sendMessage('Please provide a prompt or message reply', event.threadID, event.messageID);}
    else {
  try {
    const respons = await axios.get(`${global.api.dipto}/claude?prompt=${encodeURIComponent(prompt)}`)
    const message = respons.data.data;
    api.sendMessage(message, event.threadID,event.messageID);
    } catch (error) {
      console.error('Error calling Gemini AI:', error);
      api.sendMessage(`Sorry, there was an error processing your request.${error}`, event.threadID, event.messageID);
  }
 }
};