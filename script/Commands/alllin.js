const { random } = require('../../utils');

module.exports = {
    config: {
        name: "allin",
        description: "সব টাকা দিয়ে বাজি ধরুন",
        cooldown: 60
    },

    run: async ({ api, event, db }) => {
        const { threadID, messageID, senderID } = event;
        const user = await db.getUser(senderID);
        
        if (user.money <= 0) return api.sendMessage("তোমার কাছে টাকা নাই ❌", threadID, messageID);
        
        const win = random(0, 1); // 50% চান্স
        if (win) {
            const won = user.money;
            await db.addMoney(senderID, won);
            api.sendMessage(`🎉 ALL IN WIN! 🎉\n💰 জিতেছো: ${won * 2}৳\n💵 এখন আছে: ${user.money + won}৳`, threadID, messageID);
        } else {
            await db.removeMoney(senderID, user.money);
            api.sendMessage(`💥 ALL IN LOSE! 💥\n😭 সব হারাইছো: ${user.money}৳\n💵 এখন আছে: 0৳`, threadID, messageID);
        }
    }
}
