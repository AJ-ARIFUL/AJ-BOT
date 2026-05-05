module.exports = {
    config: {
        name: "antijoin",
        description: "এন্টি-জয়েন অন/অফ",
        usage: "{p}antijoin [on/off]",
        permissions: [1]
    },

    run: async ({ api, event, args, db }) => {
        const { threadID, messageID, senderID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        
        if (!threadInfo.adminIDs.some(e => e.id == senderID)) {
            return api.sendMessage("শুধু গ্রুপ এডমিন ❌", threadID, messageID);
        }
        
        const status = args[0] === "on";
        await db.createThread(threadID, { antiJoin: status });
        api.sendMessage(`✅ এন্টি-জয়েন ${status? "ON" : "OFF"} হয়েছে`, threadID, messageID);
    }
}
