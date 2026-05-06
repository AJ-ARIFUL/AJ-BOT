const axios = require('axios');

module.exports = {
    config: {
        name: "fbget",
        description: "ফেসবুক ভিডিও ইনফো",
        usage: "{p}fbget [fb video link]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const url = args[0];
        if (!url ||!url.includes('facebook.com')) return api.sendMessage("ভ্যালিড FB লিংক দিন", threadID, messageID);
        
        try {
            const res = await axios.get(`https://api.snapcdn.app/api/download?url=${encodeURIComponent(url)}`);
            const data = res.data.data;
            
            const msg = `📹 FB ভিডিও ইনফো 📹\n━━━━━━━━━━━━━━━\n📌 Title: ${data.title || "N/A"}\n⏱️ Duration: ${data.duration || "N/A"}\n📊 Quality: ${data.quality || "HD"}\n\nডাউনলোড:!download ${url}`;
            
            api.sendMessage(msg, threadID, messageID);
        } catch (e) {
            api.sendMessage("❌ ইনফো আনতে পারলাম না। লিংক প্রাইভেট হতে পারে", threadID, messageID);
        }
    }
              }
