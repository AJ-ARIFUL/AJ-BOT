module.exports = {
    config: {
        name: "admin",
        description: "গ্রুপ এডমিন লিস্ট দেখুন"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        
        let msg = "👑 গ্রুপ এডমিন লিস্ট 👑\n━━━━━━━━━━━━━━━\n";
        for (let i = 0; i < threadInfo.adminIDs.length; i++) {
            const id = threadInfo.adminIDs[i].id;
            const info = await api.getUserInfo(id);
            msg += `${i+1}. ${info[id].name}\n`;
        }
        
        api.sendMessage(msg, threadID, messageID);
    }
}
