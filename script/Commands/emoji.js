const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "emoji",
        description: "ইমোজি বড় করে দেখুন",
        usage: "{p}emoji [emoji]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const emoji = args[0];
        if (!emoji) return api.sendMessage("ইমোজি দিন:!emoji 😂", threadID, messageID);
        
        const cachePath = path.join(__dirname, 'cache', `emoji_${Date.now()}.png`);
        
        try {
            // Twemoji CDN
            const code = emoji.codePointAt(0).toString(16);
            const url = `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${code}.png`;
            
            const img = await axios.get(url, { responseType: 'arraybuffer' });
            fs.writeFileSync(cachePath, Buffer.from(img.data, 'binary'));
            api.sendMessage({
                body: `Emoji: ${emoji}`,
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ এই ইমোজি সাপোর্ট করে না", threadID, messageID);
        }
    }
    }
