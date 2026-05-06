const axios = require('axios');

module.exports = {
    config: {
        name: "fact",
        description: "রেন্ডম মজার ফ্যাক্ট"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID } = event;
        
        try {
            const res = await axios.get('https://api.popcat.xyz/fact');
            api.sendMessage(`💡 Fact:\n━━━━━━━━━━━━━━━\n${res.data.fact}`, threadID, messageID);
        } catch (e) {
            api.sendMessage("❌ ফ্যাক্ট লোড হয়নি", threadID, messageID);
        }
    }
}
