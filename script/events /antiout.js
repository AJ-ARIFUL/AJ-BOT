module.exports = {
    config: {
        name: "antiout",
        eventType: ["log:unsubscribe"],
        version: "1.0",
        credits: "Arif",
        description: "কেউ লিভ নিলে অটো অ্যাড"
    },

    run: async ({ api, event, db }) => {
        const { threadID, logMessageData } = event;
        const leftID = logMessageData.leftParticipantFbId;
        
        // বট নিজে লিভ নিলে কিছু করবে না
        if (leftID == api.getCurrentUserID()) return;
        
        const thread = await db.getThread(threadID);
        if (thread?.antiOut) {
            try {
                await api.addUserToGroup(leftID, threadID);
                api.sendMessage("গ্রুপ থেকে পালানো যাবে না 😼 আবার অ্যাড করে দিলাম", threadID);
            } catch (e) {
                api.sendMessage("অ্যাড করতে পারলাম না, হয়তো ব্লক মারছে 😢", threadID);
            }
        }
    }
}
