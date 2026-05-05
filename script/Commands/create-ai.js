const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "create-ai",
        description: "AI দিয়ে ইমেজ বানান",
        usage: "{p}create-ai [প্রম্পট]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const prompt = args.join(" ");
        
        if (!prompt) return api.sendMessage("প্রম্পট লিখো:!create-ai a cat flying", threadID, messageID);
        
        const cachePath = path.join(__dirname, 'cache', `ai_${Date.now()}.jpg`);
        api.sendMessage("🎨 AI ইমেজ বানাচ্ছে... 20 সেকেন্ড লাগবে", threadID, messageID);
        
        try {
            const res = await axios.get(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`, { 
                responseType: 'arraybuffer' 
            });
            
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            
            api.sendMessage({
                body: `✅ প্রম্পট: ${prompt}`,
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
            
        } catch (e) {
            api.sendMessage("❌ AI ইমেজ বানাতে পারলাম না", threadID, messageID);
        }
    }
}
