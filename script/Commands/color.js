const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "color",
        description: "রেন্ডম কালার বা কালার কোডের ইমেজ",
        usage: "{p}color [#hex]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        let hex = args[0] || '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        if (!hex.startsWith('#')) hex = '#' + hex;
        
        const cachePath = path.join(__dirname, 'cache', `color_${Date.now()}.png`);
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/color/image/${hex.replace('#', '')}`, { 
                responseType: 'arraybuffer' 
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                body: `🎨 Color: ${hex.toUpperCase()}`,
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ ভ্যালিড হেক্স কোড দিন:!color FF0000", threadID, messageID);
        }
    }
          }
