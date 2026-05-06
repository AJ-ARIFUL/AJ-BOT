module.exports = {
    config: {
        name: "config",
        description: "বটের কনফিগ দেখুন",
        permissions: [2]
    },

    run: async ({ api, event, config }) => {
        const { threadID, messageID, senderID } = event;
        
        if (!config.adminUID.includes(senderID)) {
            return api.sendMessage("শুধু বট এডমিন ❌", threadID, messageID);
        }
        
        const msg = `⚙️ বট কনফিগ ⚙️\n━━━━━━━━━━━━━━━\n📌 নাম: ${config.botName}\n👑 এডমিন: ${config.adminName}\n📝 প্রিফিক্স: ${config.prefix}\n🌐 ভাষা: ${config.language}\n🔧 ভার্সন: ${config.version || "3.0"}`;
        
        api.sendMessage(msg, threadID, messageID);
    }
}
