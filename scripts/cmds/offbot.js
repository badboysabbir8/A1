module.exports = {
  config: {
    name: "offbot",
    version: "1.0",
    author: " 𝐗-𝐍𝐢𝐥 𝐗𝐡𝐨𝐰𝐝𝐡𝐮𝐫𝐲 ",
    countDown: 45,
    role: 0,
    shortDescription: "Turn off bot",
    longDescription: "Turn off bot",
    category: "owner",
    guide: "{p}{n}"
  },
  onStart: async function ({event, api}) {
    const permission = [ "100000768468627" ];
  if (!permission.includes(event.senderID)) {
    api.sendMessage("╔════ஜ۩۞۩ஜ═══╗\nYou don't have permission to use this command.\n═══ஜ۩۞۩ஜ═══╝", event.threadID, event.messageID);
    return;
  }
    api.sendMessage("╔════ஜ۩۞۩ஜ═══╗\nsuccessfully Turned Off System ✅\═══ஜ۩۞۩ஜ═══╝",event.threadID, () =>process.exit(0))}
};