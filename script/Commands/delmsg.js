module.exports = {
    config: {
        name: "delmsg",
        description: "যেকোনো মেসেজ ডিলিট করুন - এডমিন",
        usage: "{p}delmsg [মেসেজে রিপ্লাই]",
        permissions: [1]
    },

    run: async ({ api, event }) => {
        const { threadID, messageID, senderID, messageReply } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        
        if (!threadInfo.adminIDs.some(e => e.id == senderID)) {
            return api.sendMessage("শুধু গ্রুপ এডমিন ❌", threadID, messageID);
        }
        
        if (!messageReply) return api.sendMessage("যে মেসেজ ডিলিট করবা সেটায় রিপ্লাই দাও", threadID, messageID);
        
        try {
            await api.unsendMessage(messageReply.messageID);
        } catch (e) {
            api.sendMessage("❌ মেসেজ ডিলিট করতে পারলাম না। বট এডমিন না বা পুরান মেসেজ", threadID, messageID);
        }
    }
                                    }
