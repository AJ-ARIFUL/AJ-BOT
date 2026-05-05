module.exports = {
    config: {
        name: "botban",
        description: "গ্রুপকে বট থেকে ব্যান করুন",
        permissions: [2]
    },

    run: async ({ api, event, config, db }) => {
        const { threadID, messageID, senderID } = event;
        
        if (!config.adminUID.includes(senderID)) {
            return api.sendMessage("শুধু বট এডমিন ❌", threadID, messageID);
        }
        
        await db.createThread(threadID, { banned: true });
        api.sendMessage("⛔ এই গ্রুপকে ব্যান করা হয়েছে\n!approve দিয়ে আনব্যান করুন", threadID, messageID);
    }
}
