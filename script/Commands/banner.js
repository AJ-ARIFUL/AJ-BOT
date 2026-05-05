const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "banner",
        description: "নাম দিয়ে ব্যানার বানান স্টাইল 1",
        usage: "{p}banner [নাম]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const name = args.join(" ");
        if (!name) return api.sendMessage("নাম দিন:!banner Arif", threadID, messageID);
        
        const cachePath = path.join(__dirname, 'cache', `banner_${Date.now()}.jpg`);
        api.sendMessage("🎨 ব্যানার বানাচ্ছি...", threadID, messageID);
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/banner?text=${encodeURIComponent(name)}`, { 
                responseType: 'arraybuffer' 
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                body: `✅ Banner: ${name}`,
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ ব্যানার বানাতে পারলাম না", threadID, messageID);
        }
    }
                        }
