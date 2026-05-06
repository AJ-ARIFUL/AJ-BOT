const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "fyoutoo",
        aliases: ["fuckyou", "fucku"],
        description: "Fuck You মিম বানান",
        usage: "{p}fyoutoo @mention"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID, mentions, senderID } = event;
        const targetID = Object.keys(mentions)[0] || senderID;
        
        const userInfo = await api.getUserInfo(targetID);
        const name = userInfo[targetID].name;
        const avatar = `https://graph.facebook.com/${targetID}/picture?width=512&height=512`;
        const cachePath = path.join(__dirname, 'cache', `fuck_${Date.now()}.jpg`);
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/facts?text=Fuck You ${encodeURIComponent(name)}&image=${encodeURIComponent(avatar)}`, { 
                responseType: 'arraybuffer' 
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                body: `🖕 ${name}`,
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage(`🖕 Fuck You ${name}`, threadID, messageID);
        }
    }
  }
