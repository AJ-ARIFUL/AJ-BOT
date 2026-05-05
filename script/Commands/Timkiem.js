const axios = require('axios');

module.exports = {
    config: {
        name: "timkiem",
        description: "ইউটিউব সার্চ করুন",
        usage: "{p}timkiem [ভিডিও নাম]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const query = args.join(" ");
        if (!query) return api.sendMessage("কি খুঁজব?!timkiem lofi", threadID, messageID);
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/ytsearch?q=${encodeURIComponent(query)}`);
            const videos = res.data.results.slice(0, 5);
            
            let msg = `🔍 YouTube: ${query}\n━━━━━━━━━━━━━━━\n`;
            videos.forEach((v, i) => {
                msg += `${i+1}. ${v.title}\n⏰ ${v.duration} | 👁️ ${v.views}\n🔗 ${v.url}\n\n`;
            });
            
            api.sendMessage(msg, threadID, messageID);
        } catch (e) {
            api.sendMessage("❌ সার্চ করতে পারলাম না", threadID, messageID);
        }
    }
}
