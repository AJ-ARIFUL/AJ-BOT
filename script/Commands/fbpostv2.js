const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "fbpostv2",
        description: "ফেক FB স্ট্যাটাস ইমেজ",
        usage: "{p}fbpostv2 [text]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID, senderID } = event;
        const text = args.join(" ");
        if (!text) return api.sendMessage("টেক্সট দিন:!fbpostv2 আজকে মন ভালো নেই", threadID, messageID);
        
        const userInfo = await api.getUserInfo(senderID);
        const name = userInfo[senderID].name;
        const cachePath = path.join(__dirname, 'cache', `fbv2_${Date.now()}.jpg`);
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/post?text=${encodeURIComponent(text)}&username=${encodeURIComponent(name)}&avatar=https://graph.facebook.com/${senderID}/picture?width=512`, { 
                responseType: 'arraybuffer' 
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ এরর হয়েছে", threadID, messageID);
        }
    }
          }
