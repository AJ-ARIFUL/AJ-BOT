module.exports = {
    config: {
        name: "diya",
        description: "দিয়া জ্বালিয়ে উইশ করুন",
        usage: "{p}diya [@mention]"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID, senderID, mentions } = event;
        const targetID = Object.keys(mentions)[0] || senderID;
        
        const userInfo = await api.getUserInfo(targetID);
        const name = userInfo[targetID].name;
        
        const diyaArt = `🪔 শুভ দীপাবলি 🪔\n━━━━━━━━━━━━━━━\n       🪔\n      ${name}\n     ✨✨✨\n\nআলোয় ভরে উঠুক তোমার জীবন\nশুভ কামনা রইলো 💖`;
        
        api.sendMessage(diyaArt, threadID, messageID);
    }
          }
