module.exports = {
    config: {
        name: "ban",
        description: "ইউজারকে বট থেকে ব্যান করুন",
        usage: "{p}ban [@mention/uid]",
        permissions: [2]
    },

    run: async ({ api, event, args, config, db }) => {
        const { threadID, messageID, mentions, senderID, messageReply } = event;
        
        if (!config.adminUID.includes(senderID)) {
            return api.sendMessage("শুধু বট এডমিন ব্যান করতে পারবে ❌", threadID, messageID);
        }
        
        const targetID = Object.keys(mentions)[0] || (messageReply && messageReply.senderID) || args[0];
        if (!targetID) return api.sendMessage("মেনশন/UID দিন:!ban @user", threadID, messageID);
        if (config.adminUID.includes(targetID)) return api.sendMessage("এডমিনকে ব্যান করা যাবে না ❌", threadID, messageID);
        
        await db.createUser(targetID, { banned: true });
        const info = await api.getUserInfo(targetID);
        api.sendMessage(`✅ ${info[targetID].name} কে বট থেকে ব্যান করা হয়েছে`, threadID, messageID);
    }
                                              }
