const axios = require('axios');
const fs = require('fs-extra');
const d1pt0 = require('tinyurl');
const path = require('path');

module.exports.config = {
  name: "alldl",
  version: "1.0.",
  role: 0,
  author: "Dipto",
  description: "All Video Downloader",
  category: "other",
  guide: {en:"video link"},
  coolDowns: 0
};

module.exports.onStart = async function ({ api, event, args }) {
  let dipto = args.join(" ") || (event.messageReply && event.messageReply.attachments.length > 0 ? event.messageReply.attachments[0].url : "");
  if (!dipto) {
    api.sendMessage("No URL provided or found in message reply.", event.threadID, event.messageID);
    return;
  }

  const w = await api.sendMessage("Your video is downloading...", event.threadID);
  api.setMessageReaction("⏳", event.messageID, (err) => {}, true);

  try {
if (dipto.startsWith('https://www.facebook.com/reel/')) {
      const response = await axios.get(`${global.GoatBot.config.api}/alldl?url=${encodeURIComponent(dipto)}`);
      const result = response.data;
      const shortUrl = await d1pt0.shorten(result.result);
      api.sendMessage({
        body: `${result.cp}\nVideo URL = ${shortUrl}`,
        attachment: await global.utils.getStreamFromURL(result.result)
      }, event.threadID, event.messageID)
        //async () => {
        api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        await api.unsendMessage(w.messageID);

    }
    else if (dipto.startsWith('https://www.facebook.com/') || dipto.startsWith('https://fb.watch')) {
      let vidInfo = event.attachments[0] || event.messageReply.attachments[0];
      const shortUrl = await d1pt0.shorten(vidInfo.playableUrl);
      api.sendMessage({
        body: `description: ${vidInfo.description || 'N/A'}\nsource: ${vidInfo.source || 'N/A'}\nurl: ${shortUrl}`,
        attachment: await global.utils.getStreamFromURL(vidInfo.playableUrl)
      }, event.threadID, event.messageID)
        //, async () => {
        api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        await api.unsendMessage(w.messageID);
     // });
    }
    else if (dipto.match(/https:\/\/(vt|vm)\.tiktok\.com|https:\/\/www\.instagram\.com\/|https:\/\/youtu\.be\/|https:\/\/www\.instagram\.com\/p\/|https:\/\/pin\.it\/|https:\/\/youtube\.com\/|https:\/\/www\.capcut\.com\/|https:\/\/www\.threads\.net\/|https:\/\/twitter\.com\/|https:\/\/x\.com\/|https:\/\/l\.likee\.video\//)) {
      const response = await axios.get(`${global.GoatBot.config.api}/alldl?url=${encodeURIComponent(dipto)}`);
      const result = response.data;
      const shortUrl = await d1pt0.shorten(result.result);
      api.sendMessage({
        body: `${result.cp}\nVideo URL = ${shortUrl}`,
        attachment: await global.utils.getStreamFromURL(result.result)
      }, event.threadID, event.messageID)
        //, async () => {
        api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        await api.unsendMessage(w.messageID);
     // });
    }
    else if (dipto.startsWith('https://i.imgur.com')) {
      const response = await axios.get(dipto, { responseType: 'arraybuffer' });
      const fileExtension = path.extname(dipto);
      const filePath = path.join(__dirname, `/cache/dipto${fileExtension}`);
      fs.writeFileSync(filePath, Buffer.from(response.data, 'binary'));
      api.sendMessage({
        body: "Downloaded from link",
        attachment: fs.createReadStream(filePath)
      }, event.threadID, () => fs.unlinkSync(filePath), event.messageID)
        //, async () => {
        api.setMessageReaction("✅", event.messageID, (err) => {}, true);
        await api.unsendMessage(w.messageID);
     // });
    }
    else {
      api.sendMessage("Unsupported URL or command usage.", event.threadID, event.messageID);
      await api.unsendMessage(w.messageID);
    }
  } catch (e) {
    api.sendMessage(`Error: ${e.message}`, event.threadID, event.messageID);
    await api.unsendMessage(w.messageID);
  }
};