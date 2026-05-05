const { random } = require('../../utils');

module.exports = {
    config: {
        name: "work",
        description: "কাজ করে টাকা ইনকাম করুন",
        cooldown: 600 // 10 মিনিট
    },

    run: async ({ api, event, db }) => {
        const { threadID, messageID, senderID } = event;
        
        const jobs = [
            { name: "কোডিং করলেন", pay: random(500, 1500) },
            { name: "রিকশা চালালেন", pay: random(200, 800) },
            { name: "ইউটিউব ভিডিও বানালেন", pay: random(1000, 3000) },
            { name: "চা বিক্রি করলেন", pay: random(100, 500) },
            { name: "বসের গালি খেলেন", pay: random(50, 200) }
        ];
        
        const job = jobs[Math.floor(Math.random() * jobs.length)];
        await db.addMoney(senderID, job.pay);
        
        api.sendMessage(`💼 ${job.name}\n💰 আয়: ${job.pay}৳`, threadID, messageID);
    }
}
