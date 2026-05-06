const axios = require('axios');

module.exports = {
    config: {
        name: "catsay",
        description: "বিড়াল দিয়ে কথা বলান",
        usage: "{p}catsay [text]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const text = args.join(" ");
        if (!text) return api.sendMessage("টেক্সট দিন:!catsay Meow", threadID, messageID);
        
        try {
            const res = await axios.get(`https://cataas.com/cat/says/${encodeURIComponent(text)}?json=true`);
            const img = await global.utils.getStreamFromURL(`https://cataas.com${res.data.url}`);
            api.sendMessage({ attachment: img }, threadID, messageID);
        } catch (e) {
            api.sendMessage("❌ বিড়াল এখন ঘুমাচ্ছে", threadID, messageID);
        }
    }
          }
