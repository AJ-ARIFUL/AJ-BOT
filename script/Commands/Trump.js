const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "trump",
        description: "ট্রাম্পের ফেক টুইট",
        usage: "{p}trump [টেক্সট]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const text = args.join(" ");
        if (!text) return api.sendMessage("টেক্সট দিন:!trump Make America Great", threadID, messageID);
        
        const cachePath = path.join(__dirname, 'cache', `trump_${Date.now()}.jpg`);
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/trump?text=${encodeURIComponent(text)}`, { 
                responseType: 'arraybuffer' 
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                body: `Donald Trump tweeted:`,
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ টুইট বানাতে পারলাম না", threadID, messageID);
        }
    }
}
