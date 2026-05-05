const fs = require('fs');

module.exports = {
    config: {
        name: "bn",
        description: "বটের ভাষা বাংলা করুন",
        permissions: [1]
    },

    run: async ({ api, event }) => {
        const { threadID, messageID, senderID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        
        if (!threadInfo.adminIDs.some(e => e.id == senderID)) {
            return api.sendMessage("শুধু গ্রুপ এডমিন ❌", threadID, messageID);
        }
        
        const path = require('path').join(__dirname, '../../config.json');
        const configData = JSON.parse(fs.readFileSync(path, 'utf8'));
        configData.language = "bn";
        fs.writeFileSync(path, JSON.stringify(configData, null, 2));
        
        api.sendMessage("✅ বটের ভাষা বাংলা করা হয়েছে\nবট রিস্টার্ট দিন", threadID, messageID);
    }
}
