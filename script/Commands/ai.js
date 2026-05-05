const axios = require('axios');

module.exports = {
    config: {
        name: "ai",
        description: "AI এর সাথে কথা বলুন",
        usage: "{p}ai [প্রশ্ন]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const query = args.join(" ");
        if (!query) return api.sendMessage("প্রশ্ন লিখো:!ai তুমি কে", threadID, messageID);
        
        api.sendMessage("🤖 AI ভাবছে...", threadID, messageID);
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(query)}&owner=Arif&botname=ArifBot`);
            api.sendMessage(res.data.response, threadID, messageID);
        } catch (e) {
            api.sendMessage("❌ AI এখন ঘুমাচ্ছে", threadID, messageID);
        }
    }
}
