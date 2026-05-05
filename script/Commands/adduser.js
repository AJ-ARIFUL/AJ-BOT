module.exports = {
    config: {
        name: "adduser",
        description: "ফেসবুক লিংক থেকে ইউজার অ্যাড",
        usage: "{p}adduser [profile link]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const link = args[0];
        
        if (!link) return api.sendMessage("লিংক দিন:!adduser https://facebook.com/xxx", threadID, messageID);
        
        try {
            const uid = await api.getUID(link);
            await api.addUserToGroup(uid, threadID);
            api.sendMessage("✅ ইউজার অ্যাড হয়েছে", threadID, messageID);
        } catch (e) {
            api.sendMessage("❌ UID বের করতে পারলাম না বা অ্যাড হয়নি", threadID, messageID);
        }
    }
}
