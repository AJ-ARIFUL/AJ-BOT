module.exports = {
    config: {
        name: "autosent",
        eventType: ["bot:ready"],
        version: "1.0",
        credits: "Arif",
        description: "বট চালু হলে নোটিফিকেশন"
    },

    run: async ({ api, config }) => {
        const time = new Date().toLocaleString('bn-BD', { timeZone: 'Asia/Dhaka' });
        const msg = `✅ ${config.botName} চালু হয়েছে\n⏰ সময়: ${time}\n🤖 প্রিফিক্স: ${config.prefix}`;
        
        for (const admin of config.adminUID) {
            api.sendMessage(msg, admin);
        }
    }
}
