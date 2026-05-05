module.exports = {
    config: {
        name: "approve",
        description: "গ্রুপ অ্যাপ্রুভ করুন",
        permissions: [2]
    },

    run: async ({ api, event, config, db }) => {
        const { threadID, messageID, senderID } = event;
        
        if (!config.adminUID.includes(senderID)) {
            return api.sendMessage("শুধু বট এডমিন অ্যাপ্রুভ করতে পারবে ❌", threadID, messageID);
        }
        
        await db.createThread(threadID, { banned: false });
        api.sendMessage("✅ এই গ্রুপ অ্যাপ্রুভ হয়েছে। এখন সব কমান্ড চলবে", threadID, messageID);
    }
}
