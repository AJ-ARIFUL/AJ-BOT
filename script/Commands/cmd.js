const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "cmd",
        description: "কমান্ড ম্যানেজ করুন",
        usage: "{p}cmd [list/load/unload] [name]",
        permissions: [2]
    },

    run: async ({ api, event, args, config }) => {
        const { threadID, messageID, senderID } = event;
        
        if (!config.adminUID.includes(senderID)) {
            return api.sendMessage("শুধু বট এডমিন ❌", threadID, messageID);
        }
        
        const action = args[0];
        const cmdName = args[1];
        const cmdPath = path.join(__dirname, `${cmdName}.js`);
        
        if (action == "list") {
            const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.js'));
            return api.sendMessage(`📝 টোটাল কমান্ড: ${files.length}\n${files.map((f,i) => `${i+1}. ${f}`).join('\n')}`, threadID, messageID);
        }
        
        if (action == "unload") {
            if (!fs.existsSync(cmdPath)) return api.sendMessage("কমান্ড নাই ❌", threadID, messageID);
            delete require.cache[require.resolve(cmdPath)];
            return api.sendMessage(`✅ ${cmdName}.js আনলোড হয়েছে`, threadID, messageID);
        }
        
        if (action == "load") {
            if (!fs.existsSync(cmdPath)) return api.sendMessage("ফাইল নাই ❌", threadID, messageID);
            delete require.cache[require.resolve(cmdPath)];
            require(cmdPath);
            return api.sendMessage(`✅ ${cmdName}.js লোড হয়েছে`, threadID, messageID);
        }
        
        api.sendMessage("ব্যবহার:!cmd list\n!cmd load help\n!cmd unload help", threadID, messageID);
    }
                                  }
