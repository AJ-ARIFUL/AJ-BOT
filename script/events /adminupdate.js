module.exports = {
    config: {
        name: "adminupdate",
        eventType: ["log:thread-admins"],
        version: "1.0",
        credits: "Arif",
        description: "এডমিন আপডেট নোটিফিকেশন"
    },

    run: async ({ api, event, db }) => {
        const { threadID, logMessageData, logMessageType } = event;
        
        // নতুন এডমিন লিস্ট নাও
        const threadInfo = await api.getThreadInfo(threadID);
        const adminIDs = threadInfo.adminIDs.map(e => e.id);
        
        // DB আপডেট করো
        await db.createThread(threadID, { adminIDs });
        
        const targetID = logMessageData.TARGET_ID;
        const userInfo = await api.getUserInfo(targetID);
        const name = userInfo[targetID].name;

        if (logMessageData.ADMIN_EVENT == "add_admin") {
            api.sendMessage(`👑 অভিনন্দন ${name}\nআপনাকে গ্রুপের নতুন এডমিন বানানো হয়েছে`, threadID);
        } else {
            api.sendMessage(`😢 ${name} কে এডমিন থেকে সরিয়ে দেওয়া হয়েছে`, threadID);
        }
    }
}
