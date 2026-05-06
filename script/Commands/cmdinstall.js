const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = {
    config: {
        name: "cmdinstall",
        aliases: ["install"],
        description: "নতুন কমান্ড ইন্সটল করুন",
        usage: "{p}cmdinstall [ফাইল/লিংক রিপ্লাই]",
        permissions: [2]
    },

    run: async ({ api, event, args, config }) => {
        const { threadID, messageID, senderID, messageReply } = event;
        
        if (!config.adminUID.includes(senderID)) {
            return api.sendMessage("শুধু বট এডমিন ❌", threadID, messageID);
        }
        
        let code, fileName;
        
        if (messageReply && messageReply.attachments[0]) {
            const url = messageReply.attachments[0].url;
            fileName = messageReply.attachments[0].filename;
            code = (await axios.get(url)).data;
        }
        else if (args[0] && args[0].startsWith('http')) {
            fileName = args[0].split('/').pop();
            code = (await axios.get(args[0])).data;
        }
        else {
            return api.sendMessage("ফাইল/লিংক রিপ্লাই দিন", threadID, messageID);
        }
        
        if (!fileName.endsWith('.js')) return api.sendMessage(".js ফাইল হতে হবে ❌", threadID, messageID);
        
        const savePath = path.join(__dirname, fileName);
        fs.writeFileSync(savePath, code);
        delete require.cache[require.resolve(savePath)];
        
        api.sendMessage(`✅ ${fileName} ইন্সটল হয়েছে\nবট রিস্টার্ট দিন`, threadID, messageID);
    }
              }
