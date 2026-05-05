module.exports = {
    config: {
        name: "autoban",
        description: "গালি দিলে অটো ব্যান",
        usage: "{p}autoban [on/off]",
        permissions: [1]
    },

    run: async ({ api, event, args, db }) => {
        const { threadID, messageID, senderID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        
        if (!threadInfo.adminIDs.some(e => e.id == senderID)) {
            return api.sendMessage("শুধু গ্রুপ এডমিন ❌", threadID, messageID);
        }
        
        const status = args[0] === "on";
        await db.createThread(threadID, { autoBan: status });
        api.sendMessage(`✅ অটো ব্যান ${status? "ON" : "OFF"}\nএখন গালি দিলে কিক`, threadID, messageID);
    }
                                         }
