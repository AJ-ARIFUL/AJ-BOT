module.exports = {
    config: {
        name: "allbox",
        description: "বট কত গ্রুপে আছে দেখুন",
        permissions: [2]
    },

    run: async ({ api, event, config }) => {
        const { threadID, messageID, senderID } = event;
        
        if (!config.adminUID.includes(senderID)) {
            return api.sendMessage("শুধু বট এডমিন দেখতে পারবে ❌", threadID, messageID);
        }
        
        const allThreads = await api.getThreadList(100, null, ['INBOX']);
        const groups = allThreads.filter(t => t.isGroup);
        
        let msg = `📊 বটের গ্রুপ লিস্ট: ${groups.length} টি\n━━━━━━━━━━━━━━━\n`;
        groups.slice(0, 20).forEach((g, i) => {
            msg += `${i+1}. ${g.name} - ${g.participantIDs.length} মেম্বার\n`;
        });
        
        if (groups.length > 20) msg += `\n...আরো ${groups.length - 20} টি গ্রুপ`;
        api.sendMessage(msg, threadID, messageID);
    }
}
