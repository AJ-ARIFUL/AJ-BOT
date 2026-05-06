module.exports = {
    config: {
        name: "delete",
        aliases: ["unsend", "del"],
        description: "বটের মেসেজ ডিলিট করুন",
        usage: "{p}delete [বটের মেসেজে রিপ্লাই]"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID, messageReply, senderID } = event;
        
        if (!messageReply) return api.sendMessage("বটের মেসেজে রিপ্লাই দিয়ে !delete লিখো", threadID, messageID);
        if (messageReply.senderID!== api.getCurrentUserID()) return api.sendMessage("শুধু বটের মেসেজ ডিলিট করতে পারবা ❌", threadID, messageID);
        
        api.unsendMessage(messageReply.messageID);
    }
}
