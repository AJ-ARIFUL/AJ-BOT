module.exports = {
    config: {
        name: "count",
        description: "গ্রুপের মোট মেসেজ কাউন্ট",
        usage: "{p}count [@mention]"
    },

    run: async ({ api, event, db }) => {
        const { threadID, messageID, mentions, senderID } = event;
        const targetID = Object.keys(mentions)[0] || senderID;
        
        const user = await db.getUser(targetID);
        if (!user) return api.sendMessage("ইউজার ডাটা নাই ❌", threadID, messageID);
        
        const userInfo = await api.getUserInfo(targetID);
        const name = userInfo[targetID].name;
        
        const threadInfo = await api.getThreadInfo(threadID);
        api.sendMessage(`💬 মেসেজ কাউন্ট 💬\n━━━━━━━━━━━━━━━\n👤 ${name}\n📊 মোট মেসেজ: ${user.msgCount} টি\n📈 গ্রুপের টোটাল: ${threadInfo.messageCount} টি`, threadID, messageID);
    }
                                          }
