const { random } = require('../../utils');

module.exports = {
    config: {
        name: "fp",
        aliases: ["friendship"],
        description: "বন্ধুত্বের % চেক করুন",
        usage: "{p}fp @mention"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID, senderID, mentions } = event;
        const targetID = Object.keys(mentions)[0];
        if (!targetID) return api.sendMessage("বন্ধুকে মেনশন দাও:!fp @friend", threadID, messageID);
        if (targetID == senderID) return api.sendMessage("নিজের সাথে বন্ধুত্ব 100% 😂", threadID, messageID);
        
        const percent = random(0, 100);
        const userInfo = await api.getUserInfo([senderID, targetID]);
        const name1 = userInfo[senderID].name;
        const name2 = userInfo[targetID].name;
        
        let msg = `💛 Friendship Test 💛\n━━━━━━━━━━━━━━━\n👥 ${name1} ❤️ ${name2}\n📊 বন্ধুত্ব: ${percent}%\n\n`;
        
        if (percent > 90) msg += "বেস্ট ফ্রেন্ড ফরেভার! 🤝💎";
        else if (percent > 70) msg += "পাকা বন্ধু 😍";
        else if (percent > 50) msg += "ভালো বন্ধু 🙂";
        else if (percent > 30) msg += "চেনা-জানা 😐";
        else msg += "শত্রু নাকি? 😭";
        
        api.sendMessage({
            body: msg,
            mentions: [{ tag: name1, id: senderID }, { tag: name2, id: targetID }]
        }, threadID, messageID);
    }
          }
