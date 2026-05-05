module.exports = {
    config: {
        name: "add",
        description: "গ্রুপে মেম্বার অ্যাড করুন",
        usage: "{p}add [uid]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const uid = args[0];
        
        if (!uid) return api.sendMessage("UID দিন:!add 1000xxxxx", threadID, messageID);
        
        try {
            await api.addUserToGroup(uid, threadID);
            api.sendMessage("✅ ইউজার অ্যাড হয়েছে", threadID, messageID);
        } catch (e) {
            api.sendMessage("❌ অ্যাড করতে পারলাম না। বট ফ্রেন্ড না বা ব্লক আছে", threadID, messageID);
        }
    }
}
