module.exports = {
    config: {
        name: "antijoin",
        eventType: ["log:subscribe"],
        version: "1.0",
        credits: "Arif",
        description: "এডমিন অ্যাপ্রুভাল ছাড়া জয়েন বন্ধ"
    },

    run: async ({ api, event, db }) => {
        const { threadID, logMessageData, author } = event;
        const thread = await db.getThread(threadID);
        
        if (!thread?.antiJoin) return;
        
        const added = logMessageData.addedParticipants;
        
        // এডমিন অ্যাড করলে কিছু করবে না
        if (thread.adminIDs.includes(author)) return;
        
        // বট অ্যাড হলে কিছু করবে না
        if (added.some(u => u.userFbId == api.getCurrentUserID())) return;
        
        for (let user of added) {
            try {
                await api.removeUserFromGroup(user.userFbId, threadID);
                api.sendMessage(`❌ ${user.fullName} কে কিক দেওয়া হয়েছে\nকারণ: এডমিন অ্যাপ্রুভাল ছাড়া জয়েন নিষেধ`, threadID);
            } catch (e) {
                api.sendMessage(`⚠️ এন্টি-জয়েন কাজ করছে না। বটকে এডমিন দিন`, threadID);
            }
        }
    }
}
