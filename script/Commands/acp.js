module.exports = {
    config: {
        name: "acp",
        description: "ফ্রেন্ড রিকুয়েস্ট একসেপ্ট",
        usage: "{p}acp",
        permissions: [2]
    },

    run: async ({ api, event, config }) => {
        const { threadID, messageID, senderID } = event;
        
        if (!config.adminUID.includes(senderID)) {
            return api.sendMessage("শুধু বট এডমিন ইউজ করতে পারবে ❌", threadID, messageID);
        }
        
        api.sendMessage("⏳ ফ্রেন্ড রিকুয়েস্ট একসেপ্ট করছি...", threadID, messageID);
        
        try {
            const list = await api.getFriendRequests();
            if (list.length == 0) return api.sendMessage("কোনো রিকুয়েস্ট নাই ✅", threadID, messageID);
            
            for (const user of list) {
                await api.acceptFriendRequest(user.userID);
                await global.utils.delay(2000); // 2 সেকেন্ড ডিলে
            }
            
            api.sendMessage(`✅ ${list.length} টা রিকুয়েস্ট একসেপ্ট হয়েছে`, threadID, messageID);
        } catch (e) {
            api.sendMessage("❌ এরর! আবার ট্রাই করুন", threadID, messageID);
        }
    }
}
