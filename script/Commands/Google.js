const axios = require('axios');

module.exports = {
    config: {
        name: "google",
        description: "গুগল সার্চ করুন",
        usage: "{p}google [কি সার্চ করবা]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const query = args.join(" ");
        
        if (!query) return api.sendMessage("কি সার্চ করব?!google arif", threadID, messageID);
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/search?q=${encodeURIComponent(query)}`);
            const results = res.data.results.slice(0, 5);
            
            if (results.length == 0) return api.sendMessage("কিছু পাওয়া যায়নি ❌", threadID, messageID);
            
            let msg = `🔍 Google: ${query}\n━━━━━━━━━━━━━━━\n`;
            results.forEach((r, i) => {
                msg += `${i+1}. ${r.title}\n${r.url}\n\n`;
            });
            
            api.sendMessage(msg, threadID, messageID);
            
        } catch (e) {
            api.sendMessage("❌ সার্চ করতে পারলাম না", threadID, messageID);
        }
    }
}
