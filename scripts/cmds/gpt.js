 import axios from "axios";
export const meta = {
name: `bestgpt`,
version: "1.0",
author: `Liane`,
permissions: [0, 1, 2],
category: "Ai-Chat",
description: `Best ChatGPT Ever!`,
usage: `{prefix}{name}bestgpt <message>`,
waitingTime: 5,
noPrefix: true,
};

export async function entry({ input, output, userInfos, api }) {
try {
const query = input.arguments.join(" ") || "hello";
const { name } = await userInfos.get(input.senderID);

if (query) {
output.reaction("⏳");
const processingMessage = await output.reply(
`Asking Best GPT. Please wait a moment...`,
);

const apiUrl = `https://liaspark.chatbotcommunity.ltd/@unregistered/api/bestgpt?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name)}&query=${encodeURIComponent(query)}`;
const response = await axios.get(apiUrl);

if (response.data && response.data.message) {
const trimmedMessage = response.data.message.trim();
output.reaction("✅");
await output.reply(trimmedMessage);

console.log(`Sent Best GPT's response to the user`);
} else {
throw new Error(`Invalid or missing response from Best GPT API`);
}

await api.unsendMessage(processingMessage.messageID);
}
} catch (error) {
console.error(`❌ | Failed to get Best GPT's response: ${error.message}`);
const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
output.reply(errorMessage);
}
}

