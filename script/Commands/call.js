module.exports = {
    config: {
        name: "call",
        aliases: ["report", "callad"],
        description: "বট এডমিনকে রিপোর্ট পাঠান",
        usage: "{p}call [মেসেজ]"
    },

    run: async ({ api, event, args, config }) => {
        const { threadID, messageID, senderID } = event;
        const msg = args.join(" ");
        if (!msg) return api.sendMessage("কি রিপোর্ট করবা?!call বট কাজ করছে না", threadID, messageID);
        
        const userInfo = await api.getUserInfo(senderID);
        const name = userInfo[senderID].name;
        const threadInfo = await api.getThreadInfo(threadID);
        
        const reportMsg = `📢 এডমিন কল 📢\n━━━━━━━━━━━━━━━\n👤 From: ${name}\n👥 Group: ${threadInfo.threadName}\n🆔 TID: ${threadID}\n\n📝 Report: ${msg}`;
        
        for (const adminID of config.adminUID) {
            api.sendMessage(reportMsg, adminID);
        }
        
        api.sendMessage("✅ এডমিনের কাছে রিপোর্ট পাঠানো হয়েছে", threadID, messageID);
    }
          }
