const fs = require('fs');

module.exports = {
    config: {
        name: "adden",
        description: "বটের ভাষা ইংরেজি করুন",
        permissions: [1]
    },

    run: async ({ api, event }) => {
        const { threadID, messageID, senderID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        
        if (!threadInfo.adminIDs.some(e => e.id == senderID)) {
            return api.sendMessage("Only group admin can use ❌", threadID, messageID);
        }
        
        const path = require('path').join(__dirname, '../../config.json');
        const configData = JSON.parse(fs.readFileSync(path, 'utf8'));
        configData.language = "en";
        fs.writeFileSync(path, JSON.stringify(configData, null, 2));
        
        api.sendMessage("✅ Bot language changed to English\nPlease restart bot", threadID, messageID);
    }
}
