module.exports = {
    config: {
        name: "birthday",
        description: "জন্মদিন সেট করুন",
        usage: "{p}birthday [DD/MM/YYYY]"
    },

    run: async ({ api, event, args, db }) => {
        const { threadID, messageID, senderID } = event;
        const date = args[0];
        
        if (!date) {
            const user = await db.getUser(senderID);
            if (user.birthday) return api.sendMessage(`🎂 তোমার জন্মদিন: ${user.birthday}`, threadID, messageID);
            return api.sendMessage("জন্মদিন সেট করো:!birthday 01/01/2000", threadID, messageID);
        }
        
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
            return api.sendMessage("ফরম্যাট ভুল ❌ DD/MM/YYYY এভাবে দিন", threadID, messageID);
        }
        
        await db.createUser(senderID, { birthday: date });
        api.sendMessage(`✅ জন্মদিন সেট হয়েছে: ${date}\n🎉 ওই দিন বট উইশ করবে`, threadID, messageID);
    }
    }
