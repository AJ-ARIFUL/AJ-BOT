const fs = require('fs');

module.exports = {
    config: {
        name: "appstate",
        description: "বটের কুকি ফাইল নিন",
        permissions: [2]
    },

    run: async ({ api, event, config }) => {
        const { threadID, messageID, senderID } = event;
        
        if (!config.adminUID.includes(senderID)) {
            return api.sendMessage("শুধু বট এডমিন ❌", threadID, messageID);
        }
        
        const path = require('path').join(__dirname, '../../appstate.json');
        if (!fs.existsSync(path)) return api.sendMessage("appstate.json পাওয়া যায়নি ❌", threadID, messageID);
        
        api.sendMessage({
            body: "🔐 বটের Appstate ফাইল। কাউকে দিবেন না!",
            attachment: fs.createReadStream(path)
        }, threadID, messageID);
    }
}
