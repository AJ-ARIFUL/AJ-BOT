const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "album",
        description: "রেন্ডম ইমেজ দেখুন",
        usage: "{p}album [cat/girl/flower]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const tag = args[0] || "anime";
        const cachePath = path.join(__dirname, 'cache', `album_${Date.now()}.jpg`);
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/album?q=${tag}`, { 
                responseType: 'arraybuffer' 
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                body: `🖼️ Album: ${tag}`,
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ ইমেজ পাওয়া যায়নি", threadID, messageID);
        }
    }
}
