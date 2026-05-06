const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "clearcache",
        aliases: ["cc"],
        description: "Cache ফোল্ডার খালি করুন",
        permissions: [2]
    },

    run: async ({ api, event, config }) => {
        const { threadID, messageID, senderID } = event;
        
        if (!config.adminUID.includes(senderID)) {
            return api.sendMessage("শুধু বট এডমিন ❌", threadID, messageID);
        }
        
        const cachePath = path.join(__dirname, 'cache');
        const files = fs.readdirSync(cachePath);
        let count = 0;
        
        files.forEach(file => {
            if (file!== "index.js") {
                fs.unlinkSync(path.join(cachePath, file));
                count++;
            }
        });
        
        api.sendMessage(`✅ ${count} টা ফাইল ডিলিট হয়েছে\n🗑️ Cache ক্লিন`, threadID, messageID);
    }
          }
