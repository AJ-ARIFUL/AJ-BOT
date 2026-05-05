module.exports = {
    config: {
        name: "antirobbery",
        eventType: ["log:thread-name", "log:thread-icon"],
        version: "1.0",
        credits: "Arif",
        description: "গ্রুপের নাম/ইমোজি চুরি আটকানো"
    },

    run: async ({ api, event, db }) => {
        const { threadID, logMessageType, logMessageData, author } = event;
        const thread = await db.getThread(threadID);
        
        if (!thread?.antiRobbery) return;
        
        // বট বা এডমিন চেঞ্জ করলে কিছু করবে না
        if (author == api.getCurrentUserID() || thread.adminIDs.includes(author)) return;

        if (logMessageType === "log:thread-name") {
            await api.setTitle(thread.threadName, threadID);
            api.sendMessage("গ্রুপের নাম চেঞ্জ করা নিষেধ ❌ আগের নাম ফিরিয়ে দিলাম", threadID);
        }
        
        if (logMessageType === "log:thread-icon") {
            await api.changeThreadEmoji(thread.emoji || '👍', threadID);
            api.sendMessage("ইমোজি চেঞ্জ করা নিষেধ ❌ আগেরটা ফিরিয়ে দিলাম", threadID);
        }
    }
}
