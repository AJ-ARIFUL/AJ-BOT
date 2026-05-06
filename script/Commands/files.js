const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "files",
        description: "কমান্ড ফাইল লিস্ট দেখুন",
        permissions: [2]
    },

    run: async ({ api, event, config }) => {
        const { threadID, messageID, senderID } = event;
        
        if (!config.adminUID.includes(senderID)) {
            return api.sendMessage("শুধু বট এডমিন ❌", threadID, messageID);
        }
        
        const cmdPath = path.join(__dirname);
        const files = fs.readdirSync(cmdPath).filter(f => f.endsWith('.js'));
        
        let msg = `📁 কমান্ড ফাইল: ${files.length} টি 📁\n━━━━━━━━━━━━━━━\n`;
        files.slice(0, 30).forEach((f, i) => {
            const size = (fs.statSync(path.join(cmdPath, f)).size / 1024).toFixed(1);
            msg += `${i+1}. ${f} - ${size}KB\n`;
        });
        
        if (files.length > 30) msg += `\n...আরো ${files.length - 30} টি ফাইল`;
        api.sendMessage(msg, threadID, messageID);
    }
                                    }
