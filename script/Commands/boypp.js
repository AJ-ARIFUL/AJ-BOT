const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "boypp",
        aliases: ["boypic"],
        description: "ছেলেদের রেন্ডম প্রোফাইল পিক"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID } = event;
        const cachePath = path.join(__dirname, 'cache', `boy_${Date.now()}.jpg`);
        
        try {
            const res = await axios.get(`https://api.unsplash.com/photos/random?query=boy,portrait&client_id=YOUR_UNSPLASH_KEY`, { 
                responseType: 'arraybuffer' 
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                body: "👦 Random Boy PP",
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            // ব্যাকআপ API
            const res = await axios.get(`https://api.popcat.xyz/album?q=boy`, { responseType: 'arraybuffer' });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({ attachment: fs.createReadStream(cachePath) }, threadID, () => fs.unlinkSync(cachePath), messageID);
        }
    }
              }
