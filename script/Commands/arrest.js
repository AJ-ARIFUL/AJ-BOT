module.exports = {
    config: {
        name: "arrest",
        description: "কাউকে মজা করে এরেস্ট করুন",
        usage: "{p}arrest @mention"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID, mentions, senderID } = event;
        const targetID = Object.keys(mentions)[0];
        
        if (!targetID) return api.sendMessage("কাকে এরেস্ট করব?!arrest @mention", threadID, messageID);
        
        const userInfo = await api.getUserInfo(targetID);
        const name = userInfo[targetID].name;
        const copInfo = await api.getUserInfo(senderID);
        const copName = copInfo[senderID].name;
        
        const msg = `🚔 পুলিশ এলার্ট 🚔\n━━━━━━━━━━━━━━━\n👮 অফিসার ${copName} গ্রেফতার করেছে\n👤 আসামী: ${name}\n\n⛓️ কারণ: গ্রুপের নিয়ম ভঙ্গ\n🏛️ শাস্তি: 24 ঘন্টা মিউট\n\nসবাই সাবধান! 😎`;
        
        api.sendMessage({
            body: msg,
            mentions: [{ tag: name, id: targetID }, { tag: copName, id: senderID }]
        }, threadID, messageID);
    }
}
