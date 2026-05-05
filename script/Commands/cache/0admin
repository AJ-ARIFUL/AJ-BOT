module.exports = {
    config: {
        name: "0admin",
        description: "বট এডমিন প্যানেল",
        usage: "{p}0admin [off/restart]",
        permissions: [2] // 2 = শুধু বট এডমিন
    },

    run: async ({ api, event, args, config }) => {
        const { threadID, messageID, senderID } = event;
        
        if (!config.adminUID.includes(senderID)) {
            return api.sendMessage("শুধু বট এডমিন ইউজ করতে পারবে ❌", threadID, messageID);
        }

        const action = args[0];
        
        if (action == "off") {
            await api.sendMessage("✅ বট বন্ধ হচ্ছে...", threadID);
            process.exit(0);
        }
        
        if (action == "restart") {
            await api.sendMessage("✅ বট রিস্টার্ট হচ্ছে...", threadID);
            process.exit(1); // replit/railway এ অটো রিস্টার্ট হবে
        }
        
        api.sendMessage("ব্যবহার:!0admin [off/restart]", threadID, messageID);
    }
}
