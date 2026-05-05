module.exports = async function ({ api, event, config }) {
    const { threadID, logMessageType, logMessageData } = event;
    
    // নতুন মেম্বার অ্যাড হইলে
    if (logMessageType === "log:subscribe") {
        const added = logMessageData.addedParticipants;
        for (let user of added) {
            const name = user.fullName;
            api.sendMessage({
                body: `স্বাগতম @${name} 👋\nআমি ${config.botName}\n!help লিখে কমান্ড দেখো`,
                mentions: [{ tag: `@${name}`, id: user.userFbId }]
            }, threadID);
        }
    }
    
    // কেউ লিভ নিলে
    if (logMessageType === "log:unsubscribe") {
        const leftID = logMessageData.leftParticipantFbId;
        api.getUserInfo(leftID, (err, info) => {
            if (err) return;
            const name = info[leftID].name;
            api.sendMessage(`আল্লাহ হাফেজ ${name} 😢`, threadID);
        });
    }

    // গ্রুপ নাম চেঞ্জ হইলে
    if (logMessageType === "log:thread-name") {
        const db = require('../index');
        await db.createThread(threadID, { threadName: logMessageData.name });
    }
}
