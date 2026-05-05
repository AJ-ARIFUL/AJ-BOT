module.exports = {
    config: {
        name: "autoreact",
        description: "মেসেজে অটো রিয়েক্ট সেট করুন",
        usage: "{p}autoreact [emoji/off]",
        permissions: [1]
    },

    run: async ({ api, event, args, db }) => {
        const { threadID, messageID, senderID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        
        if (!threadInfo.adminIDs.some(e => e.id == senderID)) {
            return api.sendMessage("শুধু গ্রুপ এডমিন ❌", threadID, messageID);
        }
        
        const emoji = args[0];
        if (emoji == "off") {
            await db.createThread(threadID, { autoReact: null });
            return api.sendMessage("✅ অটো রিয়েক্ট OFF", threadID, messageID);
        }
        
        await db.createThread(threadID, { autoReact: emoji });
        api.sendMessage(`✅ অটো রিয়েক্ট সেট: ${emoji}\nএখন সব মেসেজে ${emoji} দিবো`, threadID, messageID);
    }
        }
