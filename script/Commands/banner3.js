const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "banner3",
        description: "ফায়ার স্টাইল ব্যানার",
        usage: "{p}banner3 [নাম]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const name = args.join(" ");
        if (!name) return api.sendMessage("নাম দিন:!banner3 Arif", threadID, messageID);
        
        const cachePath = path.join(__dirname, 'cache', `banner3_${Date.now()}.jpg`);
        
        try {
            const res = await axios.get(`https://image.pollinations.ai/prompt/${encodeURIComponent(name + " text logo, fire effect, 8k")}`, { 
                responseType: 'arraybuffer' 
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                body: `🔥 Fire Banner: ${name}`,
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ এরর", threadID, messageID);
        }
    }
                                                                                                   }
