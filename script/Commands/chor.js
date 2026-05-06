const { random } = require('../../utils');

module.exports = {
    config: {
        name: "chor",
        description: "চোর ধরো মিনি গেম",
        usage: "{p}chor @mention"
    },

    run: async ({ api, event, db }) => {
        const { threadID, messageID, senderID, mentions } = event;
        const targetID = Object.keys(mentions)[0];
        if (!targetID) return api.sendMessage("কাকে ধরব?!chor @mention", threadID, messageID);
        if (targetID == senderID) return api.sendMessage("নিজেকে ধরা যায় না 😂", threadID, messageID);
        
        const win = random(0, 1);
        const amount = random(100, 500);
        
        const targetInfo = await api.getUserInfo(targetID);
        const name = targetInfo[targetID].name;
        
        if (win) {
            await db.addMoney(senderID, amount);
            await db.removeMoney(targetID, amount);
            api.sendMessage(`🚨 চোর ধরেছি! 🚨\n👮 তুমি ${name} এর কাছ থেকে ${amount}৳ উদ্ধার করেছো`, threadID, messageID);
        } else {
            await db.removeMoney(senderID, amount);
            api.sendMessage(`😭 চোর পালিয়েছে!\n💸 তোমার ${amount}৳ জরিমানা`, threadID, messageID);
        }
    }
    }
