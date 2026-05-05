module.exports = {
    config: {
        name: "offbot",
        description: "এই গ্রুপে বট অফ করুন",
        permissions: [1]
    },

    run: async ({ api, event, db }) => {
        const { threadID, messageID, senderID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        
        if (!threadInfo.adminIDs.some(e => e.id == senderID)) {
            return api.sendMessage("শুধু গ্রুপ এডমিন অফ করতে পারবে ❌", threadID, messageID);
        }
        
        await db.createThread(threadID, { banned: true });
        api.sendMessage("✅ এই গ্রুপে বট বন্ধ করা হয়েছে।!onbot দিয়ে চালু করুন", threadID, messageID);
    }
}
