module.exports = {
    config: {
        name: "automention",
        description: "@all দিলে সবাইকে মেনশন",
        usage: "{p}automention [on/off]",
        permissions: [1]
    },

    run: async ({ api, event, args, db }) => {
        const { threadID, messageID, senderID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        
        if (!threadInfo.adminIDs.some(e => e.id == senderID)) {
            return api.sendMessage("শুধু গ্রুপ এডমিন ❌", threadID, messageID);
        }
        
        const status = args[0] === "on";
        await db.createThread(threadID, { autoMention: status });
        api.sendMessage(`✅ অটো মেনশন ${status? "ON" : "OFF"}\nএখন @all লিখলে সবাইকে ট্যাগ করবে`, threadID, messageID);
    }
          }
