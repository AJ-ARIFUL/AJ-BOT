const { random } = require('../../utils');

module.exports = {
    config: {
        name: "rushi",
        description: "রাশিয়ান রুলেট খেলুন",
        cooldown: 10
    },

    run: async ({ api, event, db }) => {
        const { threadID, messageID, senderID } = event;
        const bullet = random(1, 6);
        const trigger = random(1, 6);
        
        if (bullet == trigger) {
            await db.removeMoney(senderID, 500);
            api.sendMessage("💥 BOOM! তুমি মারা গেছো 😵\n-500৳ জরিমানা", threadID, messageID);
        } else {
            await db.addMoney(senderID, 200);
            api.sendMessage("😎 ক্লিক! তুমি বেঁচে গেছো\n+200৳ পেয়েছো", threadID, messageID);
        }
    }
}
