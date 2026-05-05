module.exports = {
    config: {
        name: "bio",
        description: "বটের বায়ো চেঞ্জ করুন",
        usage: "{p}bio [নতুন বায়ো]",
        permissions: [2]
    },

    run: async ({ api, event, args, config }) => {
        const { threadID, messageID, senderID } = event;
        
        if (!config.adminUID.includes(senderID)) {
            return api.sendMessage("শুধু বট এডমিন বায়ো চেঞ্জ করতে পারবে ❌", threadID, messageID);
        }
        
        const newBio = args.join(" ");
        if (!newBio) return api.sendMessage("নতুন বায়ো লিখো:!bio আমি আরিফ বট", threadID, messageID);
        
        try {
            await api.changeBio(newBio);
            api.sendMessage(`✅ বায়ো চেঞ্জ হয়েছে:\n${newBio}`, threadID, messageID);
        } catch (e) {
            api.sendMessage("❌ বায়ো চেঞ্জ করতে পারলাম না", threadID, messageID);
        }
    }
}
