module.exports = {
    config: {
        name: "box",
        description: "গ্রুপ সেটিংস চেঞ্জ করুন",
        usage: "{p}box [name/emoji/image] [value]",
        permissions: [1]
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID, senderID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        
        if (!threadInfo.adminIDs.some(e => e.id == senderID)) {
            return api.sendMessage("শুধু গ্রুপ এডমিন ❌", threadID, messageID);
        }
        
        const action = args[0];
        const value = args.slice(1).join(" ");
        
        try {
            if (action == "name") {
                await api.setTitle(value, threadID);
                api.sendMessage(`✅ গ্রুপের নাম চেঞ্জ: ${value}`, threadID, messageID);
            }
            else if (action == "emoji") {
                await api.changeThreadEmoji(value, threadID);
                api.sendMessage(`✅ ইমোজি চেঞ্জ: ${value}`, threadID, messageID);
            }
            else if (action == "image" && event.messageReply) {
                const url = event.messageReply.attachments[0].url;
                await api.changeGroupImage(url, threadID);
                api.sendMessage("✅ গ্রুপ ফটো চেঞ্জ হয়েছে", threadID, messageID);
            }
            else {
                api.sendMessage("ব্যবহার:!box name নতুন নাম\n!box emoji 😂\n!box image + রিপ্লাই", threadID, messageID);
            }
        } catch (e) {
            api.sendMessage("❌ চেঞ্জ করতে পারলাম না", threadID, messageID);
        }
    }
          }
