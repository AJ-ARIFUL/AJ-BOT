const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "download",
        aliases: ["dl"],
        description: "YouTube/TikTok/FB ভিডিও ডাউনলোড",
        usage: "{p}download [url]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const url = args[0];
        if (!url) return api.sendMessage("লিংক দিন:!download https://...", threadID, messageID);
        
        api.sendMessage("⏳ ডাউনলোড হচ্ছে... 1 মিনিট লাগবে", threadID, messageID);
        
        try {
            // ফ্রি API
            const res = await axios.get(`https://api.snapcdn.app/api/download?url=${encodeURIComponent(url)}`);
            const data = res.data.data;
            
            if (!data.video_url) return api.sendMessage("❌ ডাউনলোড লিংক পাইনি", threadID, messageID);
            
            const cachePath = path.join(__dirname, 'cache', `dl_${Date.now()}.mp4`);
            const video = await axios.get(data.video_url, { responseType: 'arraybuffer' });
            fs.writeFileSync(cachePath, Buffer.from(video.data, 'binary'));
            
            api.sendMessage({
                body: `✅ ডাউনলোড সফল\n📌 ${data.title || "Video"}`,
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
            
        } catch (e) {
            api.sendMessage("❌ ডাউনলোড ফেইল। লিংক চেক করুন বা পরে ট্রাই করুন", threadID, messageID);
        }
    }
        }
