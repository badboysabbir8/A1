module.exports = {
 config: {
 name: "kick1",
 version: "1.0",
 author: "𝐍𝐎𝐁𝐈𝐓𝐀　𝟐.𝟎",
 countDown: 5,
 role: 2,
 shortDescription: "no prefix",
 longDescription: "no prefix",
 category: "no prefix",
 },
 
 onStart: async function(){}, 
 onChat: async function({ message, event, args, threadsData, api, getLang }) {
   const input = event.body;
 if (input && input.trim().toLowerCase().startsWith('kick1') || input && input.trim().toLowerCase().startsWith('kick2')){
    const data = input.split(" ");
    data.shift();
   const prompt = data.join(" ");
   
   const adminIDs = await threadsData.get(event.threadID, "adminIDs");
   if (!adminIDs.includes(api.getCurrentUserID()))
     return message.reply(getLang("needAdmin"));
   async function kickAndCheckError(uid) {
     try {
       await api.removeUserFromGroup(uid, event.threadID);
     }
     catch (e) {
       message.reply(getLang("needAdmin"));
       return "ERROR";
     }
   }
   if (!prompt[0]) {
     if (!event.messageReply)
       return message.SyntaxError();
     await kickAndCheckError(event.messageReply.senderID);
   }
   else {
     const uids = Object.keys(event.mentions);
     if (uids.length === 0)
       return message.SyntaxError();
     if (await kickAndCheckError(uids.shift()) === "ERROR")
       return;
     for (const uid of uids)
       api.removeUserFromGroup(uid, event.threadID);

 }
 }
}
};