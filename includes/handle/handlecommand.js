const fs = require('fs');
const path = require('path');
const db = require('../index'); // includes/index.js থেকে DB নিবে

module.exports = async function ({ api, event, config }) {
    const { body, threadID, messageID, senderID, mentions } = event;
    if (!body) return;

    // ইউজার + থ্রেড অটো সেভ
    const userInfo = await api.getUserInfo(senderID);
    await db.createUser(senderID, userInfo[senderID].name);
    await db.increaseExp(senderID, 1);

    if (threadID!== senderID) {
        const threadInfo = await api.getThreadInfo(threadID);
        await db.createThread(threadID, {
            threadID,
            threadName: threadInfo.threadName,
            members: threadInfo.participantIDs.length,
            adminIDs: threadInfo.adminIDs.map(e => e.id)
        });
    }

    const botID = api.getCurrentUserID();
    const isGroup = threadID!== senderID;

    // 1. Prefix কমান্ড চেক:!help,!teach
    if (body.startsWith(config.prefix)) {
        const args = body.slice(config.prefix.length).trim().split(/ +/);
        const cmdName = args.shift().toLowerCase();
        const commandPath = path.join(__dirname, '../../Script', `${cmdName}.js`);
        
        if (fs.existsSync(commandPath)) {
            const command = require(commandPath);
            return command.run({ api, event, args, config, db });
        }
        return;
    }

    // 2. Teach ডাটাবেস চেক
    const userMsg = body.toLowerCase();
    const data = await db.getTeach(userMsg);
    
    if (data) {
        if (isGroup) {
            const isMentioned = Object.keys(mentions).includes(botID);
            const isReplyToBot = event.messageReply?.senderID == botID;
            if (isMentioned || isReplyToBot) {
                api.sendMessage(data.reply, threadID, messageID);
            }
        } else {
            api.sendMessage(data.reply, threadID, messageID);
        }
    }
}
