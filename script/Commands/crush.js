const { random } = require('../../utils');

module.exports = {
    config: {
        name: "crush",
        description: "ক্রাশ কত % ভালোবাসে চেক করুন",
        usage: "{p}crush @mention"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID, senderID, mentions } = event;
        const targetID = Object.keys(mentions)[0];
        if (!targetID) return api.sendMessage("ক্রাশকে মেনশন দাও:!crush @crush", threadID, messageID);
        
        const percent = random(0, 100);
        const userInfo = await api.getUserInfo(targetID);
        const name = userInfo[targetID].name;
        
        let msg = `💘 ক্রাশ টেস্ট 💘\n━━━━━━━━━━━━━━━\n😍 ${name} তোমাকে ${percent}% ভালোবাসে\n\n`;
        
        if (percent > 90) msg += "বিয়ে করে ফেলো! 💍";
        else if (percent > 70) msg += "চান্স আছে, প্রপোজ করো 😘";
        else if (percent > 50) msg += "ট্রাই করতে পারো 🥺";
        else if (percent > 30) msg += "ফ্রেন্ডজোন কনফার্ম 😭";
        else msg += "ভাই মুভ অন করো 💔";
        
        api.sendMessage(msg, threadID, messageID);
    }
}
