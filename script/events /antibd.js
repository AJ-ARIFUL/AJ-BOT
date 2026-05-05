module.exports = {
    config: {
        name: "antibd",
        eventType: ["message", "message_reply"],
        version: "1.0",
        credits: "Arif",
        description: "খারাপ শব্দ/লিংক ব্লক"
    },

    run: async ({ api, event, db }) => {
        const { threadID, messageID, senderID, body } = event;
        if (!body) return;
        
        const thread = await db.getThread(threadID);
        if (!thread?.antiBD) return;
        
        // এডমিন হলে কিছু করবে না
        if (thread.adminIDs.includes(senderID)) return;
        
        const badWords = ["fuck", "bitch", "xvideos", "xnxx", "sex", "porn", "চুদ", "মাদারচোদ", "pornhub"];
        const bdLinks = [".com.bd", ".bd", "bdnews", "prothomalo"];
        
        const msg = body.toLowerCase();
        const hasBadWord = badWords.some(word => msg.includes(word));
        const hasBDLink = bdLinks.some(link => msg.includes(link));
        
        if (hasBadWord || hasBDLink) {
            try {
                await api.unsendMessage(messageID); // মেসেজ ডিলিট
                api.sendMessage(`⚠️ ওয়ার্নিং! খারাপ শব্দ/লিংক দেওয়া নিষেধ ❌`, threadID);
            } catch (e) {
                api.sendMessage(`⚠️ খারাপ শব্দ ডিটেক্টেড! বটকে এডমিন দিন যাতে ডিলিট করতে পারে`, threadID);
            }
        }
    }
}
