const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "banner2",
        description: "গেমিং স্টাইল ব্যানার",
        usage: "{p}banner2 [নাম]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const name = args.join(" ");
        if (!name) return api.sendMessage("নাম দিন:!banner2 Arif", threadID, messageID);
        
        const cachePath = path.join(__dirname, 'cache', `banner2_${Date.now()}.jpg`);
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/welcomecard?background=https://i.imgur.com/ijr1J2L.jpeg&text1=${encodeURIComponent(name)}&text2=Welcome&text3=To The Group`, { 
                responseType: 'arraybuffer' 
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ এরর", threadID, messageID);
        }
    }
}
