const axios = require('axios');
const { getStreamFromURL } = global.utils;
const rubishapi = global.GoatBot.config.rubishapi;

  module.exports = {
    config: {
      name: "bing",
      aliases: ["dalle"],
      version: "2.0",
      author: "RUBISH",
      shortDescription: {
        en: "An AI-based image generator using DALL·E 3 technology"
      },
      longDescription: {
        en: "Bing is an AI module that leverages the latest DALL·E 3 technology to generate images based on given prompts. It provides users with creative and unique images tailored to their inputs."
      },
      countDown: 30,
      role: 0,
      guide: {
        en: "{pn} 'prompt' ",
      },
      category: "AI",
    },


  onStart: async function ({ message, args }) {
    try {
      if (args.length === 0) {
        await message.reply("⚠️ | Please provide a prompt\n\nExample ► .dalle2 A beautiful Girl");
        return;
      }

      const prompt = args.join(" ");
      const encodedPrompt = encodeURIComponent(prompt);
      const apiKey = "rubish69";
      const cookies = ["16tGUEDlFmIZLT_2Y5bGwqVOU-GmHL6t5bt12hcM3p6XRzSRfhtEwd7KfZwdGh_atKyYjD1zlaY53GtUIuLfw8YGorTHuBnw4vrdPS-BD_ppPb6-mWBQdA-zFQAmp2AJrppaDrv-r1ciYgWzbsNJ1NWZV_6xRB1fQ2Xk2OuRiwy5Y2ok-KUtUFSu2tF8g28jix8Qi5t-8VhTcgMbAEAi1VWasF5YgonvTOsvxkZlhf-U"
]; 
      //add more cookie example "cookie", "2nd cookie"....

      const randomCookie = cookies[Math.floor(Math.random() * cookies.length)];

      const apiURL = `${rubishapi}/dalle?prompt=${encodedPrompt}&cookie=${randomCookie}&apikey=${apiKey}`;

      const startTime = Date.now();
      const processingMessage = await message.reply(`
⏳ | Processing your imagination

Prompt: ${prompt}

Please wait a few seconds...`);

      const response = await axios.get(apiURL);

      const endTime = Date.now();
      const processingTimeInSeconds = ((endTime - startTime) / 1000).toFixed(2);

      const data = response.data;
      if (!data.imageLinks || data.imageLinks.length === 0) {
        if (data.errorMessage === "Invalid API key") {
          await message.reply("⚠️ | Invalid API key. Please check your API key and try again.");
        } else {
          await message.reply(`
⭕ | No images found for the 

Please try again.`);
        }
        return;
      }

      const attachment = await Promise.all(data.imageLinks.map(async (imgURL) => {
        const imgStream = await getStreamFromURL(imgURL);
        return imgStream;
      }));

      await message.reply({
        body: `
✅ | Here are the images for..

Prompt: "${prompt}" 

Processing Time: ${processingTimeInSeconds}s`,
        attachment: attachment,
      });

      message.unsend((await processingMessage).messageID);
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 401) {
        await message.reply("⚠️ | Unauthorized your API key \n\nContact with Rubish for a new apikey");
      } else if (error.response && error.response.data) {
        const responseData = error.response.data;

        if (responseData.errorMessage === "Pending") {
          await message.reply("⚠️ | This prompt has been blocked by Bing. Please try again with another prompt.");
        } else if (typeof responseData === 'object') {
          const errorMessages = Object.entries(responseData).map(([key, value]) => `${key}: ${value}`).join('\n');
          await message.reply(`⚠️ | Server error details:\n\n${errorMessages}`);
        } else if (error.response.status === 404) {
          await message.reply("⚠️ | The DALL·E-3 API endpoint was not found. Please check the API URL.");
        } else {
          await message.reply(`⚠️ | Rubish DALL·E-3 server busy now\n\nPlease try again later`);
        }
      } else {
        await message.reply("⚠️ | An unexpected error occurred. Please try again later.");
      }
    }
  }
};