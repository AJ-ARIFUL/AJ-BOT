const fs = require('fs');

module.exports = {
    config: {
        name: "adbot",
        description: "বট এডমিন ম্যানেজ করুন",
        usage: "{p}adbot [add/remove] [@mention]",
        permissions: [2]
    },

    run: async ({ api, event, args, config }) => {
        const { threadID, messageID, mentions, senderID } = event;
        
        if (!config.adminUID.includes(senderID)) {
            return api.sendMessage("শুধু বট এডমিন ইউজ করতে পারবে ❌", threadID, messageID);
        }
        
        const action = args[0];
        const targetID = Object.keys(mentions)[0];
        
        if (!targetID) return api.sendMessage("মেনশন দিন:!adbot add @name", threadID, messageID);
        
        const path = require('path').join(__dirname, '../../config.json');
        const configData = JSON.parse(fs.readFileSync(path, 'utf8'));
        
        if (action == "add") {
            if (configData.adminUID.includes(targetID)) {
                return api.sendMessage("ইনি অলরেডি এডমিন ✅", threadID, messageID);
            }
            configData.adminUID.push(targetID);
            fs.writeFileSync(path, JSON.stringify(configData, null, 2));
            api.sendMessage("✅ নতুন বট এডমিন অ্যাড হয়েছে", threadID, messageID);
        } 
        else if (action == "remove") {
            configData.adminUID = configData.adminUID.filter(id => id!== targetID);
            fs.writeFileSync(path, JSON.stringify(configData, null, 2));
            api.sendMessage("✅ বট এডমিন রিমুভ হয়েছে", threadID, messageID);
        }
        else {
            api.sendMessage("ব্যবহার:!adbot add @mention\n!adbot remove @mention", threadID, messageID);
        }
    }
}
