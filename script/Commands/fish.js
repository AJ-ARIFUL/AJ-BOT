const { random } = require('../../utils');

module.exports = {
    config: {
        name: "fish",
        aliases: ["fishing"],
        description: "মাছ ধরার গেম",
        cooldown: 60
    },

    run: async ({ api, event, db }) => {
        const { threadID, messageID, senderID } = event;
        
        const fishes = [
            { name: "🐟 পুঁটি মাছ", price: 50 },
            { name: "🐠 রুই মাছ", price: 200 },
            { name: "🦈 হাঙ্গর", price: 1000 },
            { name: "🐡 পাফার ফিশ", price: 300 },
            { name: "👟 পুরান জুতা", price: 0 },
            { name: "🦀 কাঁকড়া", price: 150 }
        ];
        
        const caught = fishes[random(0, fishes.length - 1)];
        
        if (caught.price > 0) {
            await db.addMoney(senderID, caught.price);
            api.sendMessage(`🎣 মাছ ধরেছো! 🎣\n━━━━━━━━━━━━━━━\n${caught.name}\n💰 বিক্রি: ${caught.price}৳\n\nআবার ধরো:!fish`, threadID, messageID);
        } else {
            api.sendMessage(`😭 হায় হায়!\n━━━━━━━━━━━━━━━\n${caught.name} ধরেছো\n💸 লস: 0৳`, threadID, messageID);
        }
    }
          }
