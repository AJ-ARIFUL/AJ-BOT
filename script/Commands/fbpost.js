const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "fbpost",
        description: "ফেক FB পোস্ট বানান",
        usage: "{p}fbpost [নাম] | [টেক্সট]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const text = args.join(" ").split("|").map(i => i.trim());
        
        if (text.length < 2) return api.sendMessage("ব্যবহার:!fbpost Arif Khan | আমি বট চালাই", threadID, messageID);
        
        const cachePath = path.join(__dirname, 'cache', `post_${Date.now()}.jpg`);
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/comment?text=${encodeURIComponent(text[1])}&username=${encodeURIComponent(text[0])}`, { 
                responseType: 'arraybuffer' 
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ পোস্ট বানাতে পারলাম না", threadID, messageID);
        }
    }
    }
