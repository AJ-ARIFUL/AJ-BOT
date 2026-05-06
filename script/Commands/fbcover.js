const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "fbcover",
        aliases: ["cover"],
        description: "নাম দিয়ে FB কভার বানান",
        usage: "{p}fbcover [নাম]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID, senderID } = event;
        const name = args.join(" ");
        if (!name) return api.sendMessage("নাম দিন:!fbcover Arif Khan", threadID, messageID);
        
        const cachePath = path.join(__dirname, 'cache', `cover_${Date.now()}.jpg`);
        api.sendMessage("🎨 কভার বানাচ্ছি...", threadID, messageID);
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/welcomecard?background=https://i.imgur.com/N6RgVwW.jpeg&text1=${encodeURIComponent(name)}&text2=Facebook&text3=Cover&avatar=https://graph.facebook.com/${senderID}/picture?width=512`, { 
                responseType: 'arraybuffer' 
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                body: `✅ FB Cover: ${name}`,
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ কভার বানাতে পারলাম না", threadID, messageID);
        }
    }
    }
