const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "coupledp",
        aliases: ["cpp"],
        description: "কাপল DP দেখুন"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID } = event;
        const cachePath1 = path.join(__dirname, 'cache', `cpp1_${Date.now()}.jpg`);
        const cachePath2 = path.join(__dirname, 'cache', `cpp2_${Date.now()}.jpg`);
        
        try {
            const res = await axios.get('https://api.popcat.xyz/couple');
            const img1 = await axios.get(res.data.male, { responseType: 'arraybuffer' });
            const img2 = await axios.get(res.data.female, { responseType: 'arraybuffer' });
            
            fs.writeFileSync(cachePath1, Buffer.from(img1.data, 'binary'));
            fs.writeFileSync(cachePath2, Buffer.from(img2.data, 'binary'));
            
            api.sendMessage({
                body: "💑 Couple DP 💑\n1. Boy | 2. Girl",
                attachment: [fs.createReadStream(cachePath1), fs.createReadStream(cachePath2)]
            }, threadID, () => {
                fs.unlinkSync(cachePath1);
                fs.unlinkSync(cachePath2);
            }, messageID);
        } catch (e) {
            api.sendMessage("❌ DP লোড হয়নি", threadID, messageID);
        }
    }
    }
