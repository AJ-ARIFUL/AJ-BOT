const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "flux",
        description: "Flux AI দিয়ে ছবি জেনারেট করুন",
        usage: "{p}flux [prompt]",
        cooldown: 20
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const prompt = args.join(" ");
        if (!prompt) return api.sendMessage("প্রম্পট দিন:!flux cyberpunk city, 8k", threadID, messageID);
        
        const cachePath = path.join(__dirname, 'cache', `flux_${Date.now()}.jpg`);
        api.sendMessage("🎨 Flux AI দিয়ে বানাচ্ছি... 40s লাগবে", threadID, messageID);
        
        try {
            // Pollinations API Flux মডেল সাপোর্ট করে
            const res = await axios.get(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=flux&width=1024&height=1024&nologo=true`, { 
                responseType: 'arraybuffer',
                timeout: 60000
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                body: `✅ Flux AI\n📌 Prompt: ${prompt}`,
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ ইমেজ বানাতে পারলাম না। পরে ট্রাই করুন", threadID, messageID);
        }
    }
          }
