const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "drake",
        description: "Drake মিম বানান",
        usage: "{p}drake [no] | [yes]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const text = args.join(" ").split("|").map(i => i.trim());
        
        if (text.length < 2) return api.sendMessage("ব্যবহার:!drake পড়ালেখা | গেম খেলা", threadID, messageID);
        
        const cachePath = path.join(__dirname, 'cache', `drake_${Date.now()}.jpg`);
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/drake?text1=${encodeURIComponent(text[0])}&text2=${encodeURIComponent(text[1])}`, { 
                responseType: 'arraybuffer' 
            });
            fs.writeFileSync(cachePath, Buffer.from(res.data, 'binary'));
            api.sendMessage({
                attachment: fs.createReadStream(cachePath)
            }, threadID, () => fs.unlinkSync(cachePath), messageID);
        } catch (e) {
            api.sendMessage("❌ মিম বানাতে পারলাম না", threadID, messageID);
        }
    }
          }
