const axios = require("axios");

module.exports = {
    config: {
        name: "hercai",
        longDescription: { en: "Interact with an AI to get responses to your questions." },
        guide: { en: "{p}ai <question>" },
        author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
        role: 0,
    },

    onStart: async function (context) {
        const { api, event } = context;
        const args = event.body.slice("/ai".length).trim(); // Extract the arguments after ":ai"

        // Check if there are any arguments
        if (args) {
            try {
                const response = await axios.get(`https://hercai.onrender.com/v3-beta/hercai?question=${encodeURIComponent(args)}`);
                const aiResponse = response.data.reply;
                api.sendMessage(aiResponse, event.threadID, event.messageID);
            } catch (error) {
                console.error("Error fetching AI response:", error);
                api.sendMessage("Failed to get AI response. Please try again later.", event.threadID, event.messageID);
            }
        } else {
            api.sendMessage("Please provide a question after the command. For example: `/ai Hello`", event.threadID, event.messageID);
        }
    }
};