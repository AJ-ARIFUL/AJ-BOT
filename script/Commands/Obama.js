const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "obama",
        description: "ওবামার ফেক টুইট বানান",
        usage: "{p}obama [টেক্সট]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const text = args.join(" ");
        if (!text) return api.sendMessage("টেক্সট দিন:!obama Hello World", threadID, messageID);
        
        const cachePath = path.join(__dirname, 'cache', `obama_${Date.now()}.jpg`);
        api.sendMessage("⏳ টুইট বানাচ্ছি...", threadID, messageID);
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/obama?text=${encodeURIComponent(text)}`, { 
                responseType: 'arraybuffer' 
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                body: `Barack Obama tweeted:`,
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ টুইট বানাতে পারলাম না", threadID, messageID);
        }
    }
}
