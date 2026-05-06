const axios = require('axios');

module.exports = {
    config: {
        name: "cmdstore",
        aliases: ["store"],
        description: "অনলাইন কমান্ড স্টোর দেখুন"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        
        try {
            const res = await axios.get('https://raw.githubusercontent.com/arifkhan230/Arif-Bot-Store/main/store.json');
            const store = res.data;
            
            if (!args[0]) {
                let msg = "🛒 কমান্ড স্টোর 🛒\n━━━━━━━━━━━━━━━\n";
                store.forEach((cmd, i) => {
                    msg += `${i+1}. ${cmd.name} - ${cmd.desc}\n`;
                });
                msg += "\nইন্সটল:!cmdstore install <নাম>";
                return api.sendMessage(msg, threadID, messageID);
            }
            
            if (args[0] == "install") {
                const cmdName = args[1];
                const cmd = store.find(c => c.name == cmdName);
                if (!cmd) return api.sendMessage("কমান্ড পাওয়া যায়নি ❌", threadID, messageID);
                
                api.sendMessage(`✅ ইন্সটল কমান্ড:\n!cmdinstall ${cmd.url}`, threadID, messageID);
            }
        } catch (e) {
            api.sendMessage("❌ স্টোর লোড হয়নি", threadID, messageID);
        }
    }
                      }
