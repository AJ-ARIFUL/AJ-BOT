const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "animegirl",
        description: "রেন্ডম এনিমে মেয়ের ছবি"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID } = event;
        const cachePath = path.join(__dirname, 'cache', `anime_${Date.now()}.jpg`);
        
        try {
            const res = await axios.get(`https://api.waifu.pics/sfw/waifu`);
            const img = await axios.get(res.data.url, { responseType: 'arraybuffer' });
            fs.writeFileSync(cachePath, Buffer.from(img.data, 'binary'));
            
            api.sendMessage({
                body: "🌸 Random Anime Girl 🌸",
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ ইমেজ লোড হয়নি", threadID, messageID);
        }
    }
}
