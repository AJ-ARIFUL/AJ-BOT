const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "fire",
        description: "নামে আগুন ইফেক্ট",
        usage: "{p}fire [name]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const text = args.join(" ");
        if (!text) return api.sendMessage("নাম দিন:!fire Arif", threadID, messageID);
        
        const cachePath = path.join(__dirname, 'cache', `fire_${Date.now()}.jpg`);
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/fire?text=${encodeURIComponent(text)}`, { 
                responseType: 'arraybuffer' 
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                body: `🔥 ${text} 🔥`,
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ আগুন লাগাতে পারলাম না", threadID, messageID);
        }
    }
}
