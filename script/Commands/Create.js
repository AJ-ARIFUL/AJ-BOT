module.exports = {
    config: {
        name: "create",
        description: "ফেক পোস্ট বানান",
        usage: "{p}create [fb/yt] [টেক্সট]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID, senderID } = event;
        const type = args[0];
        const text = args.slice(1).join(" ");
        
        if (!text) return api.sendMessage("ব্যবহার:!create fb আমি ভাইরাল\n!create yt নতুন ভিডিও", threadID, messageID);
        
        const userInfo = await api.getUserInfo(senderID);
        const name = userInfo[senderID].name;
        
        if (type == "fb") {
            const fakePost = `╭─ Facebook ─╮\n│ 👤 ${name}\n│ 🕐 এখনই\n├───────────\n│ ${text}\n├───────────\n│ 👍 1.2K 💬 300 ↗️ 50\n╰─────────╯`;
            api.sendMessage(fakePost, threadID, messageID);
        } 
        else if (type == "yt") {
            const fakeYt = `▶️ YouTube\n━━━━━━━━━━━━━━━\n${text}\n👤 ${name} • 1M views • 1 hour ago\n👍 50K 👎 1K`;
            api.sendMessage(fakeYt, threadID, messageID);
        }
        else {
            api.sendMessage("fb বা yt লিখো:!create fb টেক্সট", threadID, messageID);
        }
    }
}
