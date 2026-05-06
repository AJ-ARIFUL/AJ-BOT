const { random } = require('../../utils');

module.exports = {
    config: {
        name: "cpt",
        aliases: ["captcha"],
        description: "ক্যাপচা গেম খেলুন",
        cooldown: 30
    },

    run: async ({ api, event, db }) => {
        const { threadID, messageID, senderID } = event;
        
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let captcha = '';
        for (let i = 0; i < 5; i++) captcha += chars[random(0, chars.length - 1)];
        
        api.sendMessage(`🔒 ক্যাপচা সলভ করো:\n\`\`\`\n${captcha}\n\`\`\`\n\n30 সেকেন্ড সময়। রিপ্লাই দিয়ে উত্তর দাও`, threadID, (err, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: senderID,
                answer: captcha
            });
        }, messageID);
    },
    
    handleReply: async ({ api, event, db, handleReply }) => {
        const { threadID, messageID, senderID, body } = event;
        if (senderID!== handleReply.author) return;
        
        if (body.toUpperCase() == handleReply.answer) {
            await db.addMoney(senderID, 500);
            api.sendMessage("✅ সঠিক! +500৳ পেয়েছো", threadID, messageID);
        } else {
            api.sendMessage(`❌ ভুল! সঠিক উত্তর: ${handleReply.answer}`, threadID, messageID);
        }
        
        const index = global.client.handleReply.findIndex(e => e.messageID == handleReply.messageID);
        global.client.handleReply.splice(index, 1);
    }
}
