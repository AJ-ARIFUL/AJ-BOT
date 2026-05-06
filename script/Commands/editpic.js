const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "editpic",
        aliases: ["edit"],
        description: "ছবি এডিট করুন",
        usage: "{p}editpic [blur/invert/grayscale] + রিপ্লাই"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID, messageReply } = event;
        const filter = args[0] || "blur";
        
        if (!messageReply ||!messageReply.attachments[0] || messageReply.attachments[0].type!== "photo") {
            return api.sendMessage("ছবিতে রিপ্লাই দিয়ে লিখো:!editpic blur", threadID, messageID);
        }
        
        const cachePath = path.join(__dirname, 'cache', `edit_${Date.now()}.jpg`);
        const imgUrl = messageReply.attachments[0].url;
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/${filter}?image=${encodeURIComponent(imgUrl)}`, { 
                responseType: 'arraybuffer' 
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                body: `✅ Filter: ${filter}`,
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ এডিট ফেইল। ফিল্টার: blur, invert, grayscale, pixelate", threadID, messageID);
        }
    }
    }
