const axios = require('axios');

module.exports = {
    config: {
        name: "playstore",
        description: "প্লে স্টোরে অ্যাপ খুঁজুন",
        usage: "{p}playstore [অ্যাপের নাম]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const query = args.join(" ");
        if (!query) return api.sendMessage("অ্যাপের নাম দিন:!playstore facebook", threadID, messageID);
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/playstore?q=${encodeURIComponent(query)}`);
            const app = res.data;
            
            const msg = `📱 Play Store\n━━━━━━━━━━━━━━━\n📌 নাম: ${app.title}\n⭐ রেটিং: ${app.rating}\n📥 ডাউনলোড: ${app.downloads}\n💰 দাম: ${app.price_text}\n\n📝 বর্ণনা: ${app.description.slice(0,200)}...\n\n🔗 লিংক: ${app.url}`;
            
            api.sendMessage({
                body: msg,
                attachment: await global.utils.getStreamFromURL(app.icon)
            }, threadID, messageID);
            
        } catch (e) {
            api.sendMessage("❌ অ্যাপ পাওয়া যায়নি", threadID, messageID);
        }
    }
}
