const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "avt",
        aliases: ["avatar", "pfp"],
        description: "ইউজারের প্রোফাইল পিকচার দেখুন",
        usage: "{p}avt [@mention/uid/reply]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID, senderID, mentions, messageReply } = event;
        
        // 1. মেনশন চেক
        // 2. রিপ্লাই চেক 
        // 3. UID দেওয়া আছে কিনা চেক
        // 4. কিছু না দিলে নিজের
        let targetID = Object.keys(mentions)[0] || (messageReply && messageReply.senderID) || args[0] || senderID;
        
        if (isNaN(targetID)) {
            try {
                targetID = await api.getUID(args[0]);
            } catch (e) {
                return api.sendMessage("❌ UID/লিংক ভুল। @mention দিন বা রিপ্লাই দিন", threadID, messageID);
            }
        }
        
        const cachePath = path.join(__dirname, 'cache', `avt_${targetID}.jpg`);
        
        try {
            const userInfo = await api.getUserInfo(targetID);
            const name = userInfo[targetID].name;
            
            // HD প্রোফাইল পিক URL
            const avatarUrl = `https://graph.facebook.com/${targetID}/picture?width=512&height=512&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`;
            
            const img = await axios.get(avatarUrl, { responseType: 'arraybuffer' });
            fs.writeFileSync(cachePath, Buffer.from(img.data, 'binary'));
            
            api.sendMessage({
                body: `🖼️ ${name} এর প্রোফাইল পিক\nUID: ${targetID}`,
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
            
        } catch (e) {
            api.sendMessage("❌ প্রোফাইল পিক আনতে পারলাম না। ইউজার ব্লক দিছে বা আইডি ডিএক্টিভ", threadID, messageID);
        }
    }
}
