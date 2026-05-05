module.exports = {
    config: {
        name: "0out",
        description: "বট গ্রুপ থেকে লিভ নিবে",
        permissions: [1] // 1 = গ্রুপ এডমিন
    },

    run: async ({ api, event }) => {
        const { threadID, messageID, senderID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        
        if (!threadInfo.adminIDs.some(e => e.id == senderID)) {
            return api.sendMessage("শুধু গ্রুপ এডমিন কমান্ড দিতে পারবে ❌", threadID, messageID);
        }
        
        api.sendMessage("আল্লাহ হাফেজ সবাইকে 😢 বট লিভ নিচ্ছে...", threadID, () => {
            api.removeUserFromGroup(api.getCurrentUserID(), threadID);
        });
    }
}
