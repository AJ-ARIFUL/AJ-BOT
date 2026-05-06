module.exports = {
    config: {
        name: "flop",
        description: "Flop রোস্ট মিম",
        usage: "{p}flop @mention"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID, mentions, senderID } = event;
        const targetID = Object.keys(mentions)[0] || senderID;
        
        const userInfo = await api.getUserInfo(targetID);
        const name = userInfo[targetID].name;
        
        const roasts = [
            `${name} এর IQ রুম টেম্পারেচারের চেয়েও কম 🧠`,
            `${name} WiFi ছাড়া একদিনও বাঁচতে পারবে না 📶`,
            `${name} এর ফোনে 1% চার্জ থাকলেও টিকটক দেখে 😂`,
            `${name} গোসল করে মাসে একবার 🛁`,
            `${name} এর ক্রাশ ওরে ভাই ডাকে 💔`
        ];
        
        const roast = roasts[Math.floor(Math.random() * roasts.length)];
        api.sendMessage(`💀 ROASTED 💀\n━━━━━━━━━━━━━━━\n${roast}`, threadID, messageID);
    }
                                        }
