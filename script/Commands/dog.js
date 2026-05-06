const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "dog",
        aliases: ["doggo"],
        description: "রেন্ডম কুকুরের ছবি"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID } = event;
        const cachePath = path.join(__dirname, 'cache', `dog_${Date.now()}.jpg`);
        
        try {
            const res = await axios.get('https://dog.ceo/api/breeds/image/random');
            const img = await axios.get(res.data.message, { responseType: 'arraybuffer' });
            fs.writeFileSync(cachePath, Buffer.from(img.data, 'binary'));
            
            api.sendMessage({
                body: "🐶 Random Doggo 🐶",
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ কুকুর পালাইছে", threadID, messageID);
        }
    }
              }
