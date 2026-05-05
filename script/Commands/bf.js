module.exports = {
    config: {
        name: "bf",
        description: "বেস্ট ফ্রেন্ড সেট করুন",
        usage: "{p}bf [@mention]"
    },

    run: async ({ api, event, db }) => {
        const { threadID, messageID, senderID, mentions } = event;
        const targetID = Object.keys(mentions)[0];
        
        if (!targetID) {
            const user = await db.getUser(senderID);
            if (user.bestFriend) {
                const info = await api.getUserInfo(user.bestFriend);
                return api.sendMessage(`💕 তোমার বেস্ট ফ্রেন্ড: ${info[user.bestFriend].name}`, threadID, messageID);
            }
            return api.sendMessage("বেস্ট ফ্রেন্ড সেট করো:!bf @mention", threadID, messageID);
        }
        
        await db.createUser(senderID, { bestFriend: targetID });
        const info = await api.getUserInfo(targetID);
        api.sendMessage(`💕 ${info[targetID].name} কে বেস্ট ফ্রেন্ড সেট করা হয়েছে`, threadID, messageID);
    }
                        }
