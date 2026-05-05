module.exports = {
    config: {
        name: "boxinfo",
        aliases: ["groupinfo"],
        description: "গ্রুপের তথ্য দেখুন"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        
        const adminList = [];
        for (const admin of threadInfo.adminIDs) {
            const info = await api.getUserInfo(admin.id);
            adminList.push(info[admin.id].name);
        }
        
        const msg = `📊 গ্রুপ ইনফো 📊\n━━━━━━━━━━━━━━━\n📌 নাম: ${threadInfo.threadName}\n🆔 TID: ${threadID}\n👥 মেম্বার: ${threadInfo.participantIDs.length}\n👑 এডমিন: ${adminList.length} জন\n${adminList.map((a,i) => `${i+1}. ${a}`).join('\n')}\n💬 মেসেজ: ${threadInfo.messageCount}\n😂 ইমোজি: ${threadInfo.emoji || "নাই"}\n🔒 এপ্রুভাল: ${threadInfo.approvalMode? "On" : "Off"}`;
        
        api.sendMessage(msg, threadID, messageID);
    }
}
