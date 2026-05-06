const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "enlarge",
        aliases: ["enrile", "upscale"],
        description: "ছবি বড়/AI Upscale করুন",
        usage: "{p}enlarge + রিপ্লাই"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID, messageReply } = event;
        
        if (!messageReply ||!messageReply.attachments[0] || messageReply.attachments[0].type!== "photo") {
            return api.sendMessage("ছবিতে রিপ্লাই দিয়ে!enlarge লিখো", threadID, messageID);
        }
        
        const cachePath = path.join(__dirname, 'cache', `enlarge_${Date.now()}.jpg`);
        const imgUrl = messageReply.attachments[0].url;
        api.sendMessage("⏳ Upscale করছি... 30s লাগবে", threadID, messageID);
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/upscale?image=${encodeURIComponent(imgUrl)}`, { 
                responseType: 'arraybuffer' 
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                body: "✅ 4x Upscaled",
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ Upscale ফেইল", threadID, messageID);
        }
    }
}
