const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "4k",
        description: "ইমেজ 4K আপস্কেল করুন",
        usage: "{p}4k [ইমেজে রিপ্লাই]"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID, messageReply } = event;
        
        if (!messageReply ||!messageReply.attachments[0] || messageReply.attachments[0].type!== "photo") {
            return api.sendMessage("একটা ইমেজে রিপ্লাই দিয়ে!4k লিখো", threadID, messageID);
        }
        
        const imgUrl = messageReply.attachments[0].url;
        const cachePath = path.join(__dirname, 'cache', `4k_${Date.now()}.jpg`);
        
        api.sendMessage("⏳ 4K আপস্কেল হচ্ছে... অপেক্ষা করো", threadID, messageID);
        
        try {
            // ফ্রি API ইউজ করলাম
            const res = await axios.get(`https://api.popcat.xyz/upscale?image=${encodeURIComponent(imgUrl)}`, { 
                responseType: 'arraybuffer' 
            });
            
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            
            api.sendMessage({
                body: "✅ 4K আপস্কেল সফল",
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
            
        } catch (e) {
            api.sendMessage("❌ এরর! ইমেজ বড় বা API ডাউন", threadID, messageID);
        }
    }
}
