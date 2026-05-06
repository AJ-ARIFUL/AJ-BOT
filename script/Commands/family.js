const { random } = require('../../utils');

module.exports = {
    config: {
        name: "family",
        description: "গ্রুপ ফ্যামিলি রোল বানান"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        const members = threadInfo.participantIDs.filter(id => id!== api.getCurrentUserID());
        
        if (members.length < 3) return api.sendMessage("ফ্যামিলির জন্য কমপক্ষে 3 জন লাগবে ❌", threadID, messageID);
        
        const shuffled = members.sort(() => 0.5 - Math.random());
        const roles = ["👴 দাদা", "👵 দাদি", "👨 বাবা", "👩 মা", "👦 ছেলে", "👧 মেয়ে", "🐶 কুকুর", "🐱 বিড়াল"];
        
        let msg = "👨‍👩‍👧‍👦 গ্রুপ ফ্যামিলি 👨‍👩‍👧‍👦\n━━━━━━━━━━━━━━━\n";
        const mentions = [];
        
        for (let i = 0; i < Math.min(roles.length, shuffled.length); i++) {
            const info = await api.getUserInfo(shuffled[i]);
            msg += `${roles[i]}: ${info[shuffled[i]].name}\n`;
            mentions.push({ tag: info[shuffled[i]].name, id: shuffled[i] });
        }
        
        api.sendMessage({ body: msg, mentions }, threadID, messageID);
    }
          }
