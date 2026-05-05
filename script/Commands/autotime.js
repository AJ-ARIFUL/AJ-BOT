module.exports = {
    config: {
        name: "autotime",
        description: "প্রতি ঘন্টায় সময় বলবে",
        usage: "{p}autotime [on/off]",
        permissions: [1]
    },

    run: async ({ api, event, args, db }) => {
        const { threadID, messageID, senderID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        
        if (!threadInfo.adminIDs.some(e => e.id == senderID)) {
            return api.sendMessage("শুধু গ্রুপ এডমিন ❌", threadID, messageID);
        }
        
        const status = args[0] === "on";
        await db.createThread(threadID, { autoTime: status });
        
        if (status) {
            api.sendMessage("✅ অটো টাইম ON\nএখন প্রতি ঘন্টায় সময় বলবো", threadID, messageID);
            // টাইমার স্টার্ট
            setInterval(() => {
                const time = new Date().toLocaleTimeString('bn-BD', { timeZone: 'Asia/Dhaka' });
                api.sendMessage(`🕐 এখন সময়: ${time}`, threadID);
            }, 3600000); // 1 ঘন্টা
        } else {
            api.sendMessage("✅ অটো টাইম OFF", threadID, messageID);
        }
    }
                              }
