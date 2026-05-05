module.exports = {
    config: {
        name: "auto",
        description: "অটো রিপ্লাই অন/অফ করুন",
        usage: "{p}auto [on/off]",
        permissions: [1]
    },

    run: async ({ api, event, args, db }) => {
        const { threadID, messageID, senderID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        
        if (!threadInfo.adminIDs.some(e => e.id == senderID)) {
            return api.sendMessage("শুধু গ্রুপ এডমিন ❌", threadID, messageID);
        }
        
        const status = args[0] === "on";
        global.autoReply = status;
        api.sendMessage(`✅ অটো রিপ্লাই ${status? "ON" : "OFF"} হয়েছে`, threadID, messageID);
    }
}
