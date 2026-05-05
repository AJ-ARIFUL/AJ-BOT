const axios = require('axios');

module.exports = {
    config: {
        name: "ajan",
        description: "নামাজের সময়সূচী",
        usage: "{p}ajan [শহর]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const city = args[0] || "dhaka";
        
        try {
            const res = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Bangladesh&method=1`);
            const t = res.data.data.timings;
            
            const msg = `🕌 নামাজের সময় - ${city.toUpperCase()}\n━━━━━━━━━━━━━━━\n🌅 ফজর: ${t.Fajr}\n☀️ যোহর: ${t.Dhuhr}\n🌤️ আসর: ${t.Asr}\n🌇 মাগরিব: ${t.Maghrib}\n🌙 ইশা: ${t.Isha}`;
            
            api.sendMessage(msg, threadID, messageID);
        } catch (e) {
            api.sendMessage("❌ শহরের নাম ভুল বা API ডাউন", threadID, messageID);
        }
    }
}
