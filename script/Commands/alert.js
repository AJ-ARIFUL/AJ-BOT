module.exports = {
    config: {
        name: "alert",
        description: "সবাইকে মেনশন দিয়ে এলার্ট",
        usage: "{p}alert [মেসেজ]",
        permissions: [1]
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID, senderID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        
        if (!threadInfo.adminIDs.some(e => e.id == senderID)) {
            return api.sendMessage("শুধু গ্রুপ এডমিন এলার্ট দিতে পারবে ❌", threadID, messageID);
        }
        
        const text = args.join(" ") || "সবাইকে দৃষ্টি আকর্ষণ করছি";
        const mentions = [];
        let body = "🚨 ALERT 🚨\n" + text + "\n\n";
        
        for (const id of threadInfo.participantIDs) {
            if (id!== api.getCurrentUserID()) {
                const info = await api.getUserInfo(id);
                body += `@${info[id].name} `;
                mentions.push({ tag: info[id].name, id });
            }
        }
        
        api.sendMessage({ body, mentions }, threadID, messageID);
    }
}
