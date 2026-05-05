module.exports = {
    config: {
        name: "baby",
        description: "বটকে আদর করুন",
        noprefix: true
    },

    run: async ({ api, event }) => {
        const { threadID, messageID, body } = event;
        if (body.toLowerCase()!== "baby" && body.toLowerCase()!== "!baby") return;
        
        const replies = [
            "জ্বি বস বলুন 😊", "আমি আছি তো 🥰", "কি হয়েছে বাবু? 🍼", 
            "ডাকছো কেন? 😘", "বেবি বলে ডাকলে লজ্জা লাগে 🙈", "বলো জান 😚"
        ];
        const rand = replies[Math.floor(Math.random() * replies.length)];
        api.sendMessage(rand, threadID, messageID);
    }
          }
