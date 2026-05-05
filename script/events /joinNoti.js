const emoji = require('./emoji.json');

module.exports = {
    config: {
        name: "joinNoti",
        eventType: ["log:subscribe"],
        version: "1.0",
        credits: "Arif",
        description: "ইমোজি সহ ওয়েলকাম"
    },

    run: async ({ api, event }) => {
        const { threadID, logMessageData } = event;
        const randomEmoji = emoji[Math.floor(Math.random() * emoji.length)];
        
        for (let user of logMessageData.addedParticipants) {
            if (user.userFbId == api.getCurrentUserID()) continue;
            api.sendMessage(`${randomEmoji} স্বাগতম ${user.fullName} ${randomEmoji}`, threadID);
        }
    }
}
