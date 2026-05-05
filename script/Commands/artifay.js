const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "artifay",
        description: "AI আর্ট জেনারেট করুন",
        usage: "{p}artifay [prompt]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const prompt = args.join(" ");
        if (!prompt) return api.sendMessage("প্রম্পট দিন:!artifay cyberpunk city", threadID, messageID);
        
        const cachePath = path.join(__dirname, 'cache', `art_${Date.now()}.jpg`);
        api.sendMessage("🎨 আর্ট বানাচ্ছি... 30s লাগবে", threadID, messageID);
        
        try {
            const res = await axios.get(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + ", 8k, ultra detailed")}`, { 
                responseType: 'arraybuffer' 
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                body: `✅ Prompt: ${prompt}`,
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ আর্ট বানাতে পারলাম না", threadID, messageID);
        }
    }
          }
