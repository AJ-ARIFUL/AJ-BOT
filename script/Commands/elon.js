const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "elon",
        description: "Elon Musk এর ফেক টুইট",
        usage: "{p}elon [text]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const text = args.join(" ");
        if (!text) return api.sendMessage("টেক্সট দিন:!elon Tesla 🚀", threadID, messageID);
        
        const cachePath = path.join(__dirname, 'cache', `elon_${Date.now()}.jpg`);
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/elon?text=${encodeURIComponent(text)}`, { 
                responseType: 'arraybuffer' 
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                body: `Elon Musk tweeted:`,
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ টুইট বানাতে পারলাম না", threadID, messageID);
        }
    }
    }
