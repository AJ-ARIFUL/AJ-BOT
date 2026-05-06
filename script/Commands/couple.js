const { random } = require('../../utils');

module.exports = {
    config: {
        name: "couple",
        description: "রেন্ডম কাপল বানান"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        const members = threadInfo.participantIDs.filter(id => id!== api.getCurrentUserID());
        
        if (members.length < 2) return api.sendMessage("কাপল বানানোর জন্য 2 জন লাগবে ❌", threadID, messageID);
        
        const id1 = members[random(0, members.length - 1)];
        let id2 = members[random(0, members.length - 1)];
        while (id2 == id1) id2 = members[random(0, members.length - 1)];
        
        const info1 = await api.getUserInfo(id1);
        const info2 = await api.getUserInfo(id2);
        const percent = random(50, 100);
        
        const msg = `💑 আজকের কাপল 💑\n━━━━━━━━━━━━━━━\n❤️ ${info1[id1].name}\n❤️ ${info2[id2].name}\n\n💕 ম্যাচ: ${percent}%\n${percent > 80? "পারফেক্ট জুটি! 😍" : "চেষ্টা করে দেখো 😘"}`;
        
        api.sendMessage({
            body: msg,
            mentions: [{ tag: info1[id1].name, id: id1 }, { tag: info2[id2].name, id: id2 }]
        }, threadID, messageID);
    }
          }
