const axios = require('axios');

module.exports = {
    config: {
        name: "bot",
        description: "বটের সাথে চ্যাট করুন",
        usage: "{p}bot [মেসেজ]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID, senderID } = event;
        const query = args.join(" ");
        if (!query) return api.sendMessage("কিছু বলো বস 😊", threadID, messageID);
        
        const userInfo = await api.getUserInfo(senderID);
        const name = userInfo[senderID].firstName;
        
        try {
            const res = await axios.get(`https://api.simsimi.vn/v1/simtalk?text=${encodeURIComponent(query)}&lc=bn`);
            api.sendMessage(`${name}, ${res.data.message}`, threadID, messageID);
        } catch (e) {
            api.sendMessage(`${name}, বুঝি নাই আবার বলো 😅`, threadID, messageID);
        }
    }
        }
