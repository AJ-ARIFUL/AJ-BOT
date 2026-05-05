const getText = require('../../utils/getText');

module.exports = {
    config: {
        name: "join",
        eventType: ["log:subscribe"],
        version: "1.0",
        credits: "Arif",
        description: "জয়েন মেসেজ"
    },

    run: async ({ api, event, config, db }) => {
        const { threadID, logMessageData } = event;
        const lang = getText(config.language);
        const added = logMessageData.addedParticipants;
        
        for (let user of added) {
            if (user.userFbId == api.getCurrentUserID()) {
                return api.sendMessage(lang.get('system.botJoin', config.botName, config.prefix), threadID);
            }
            
            const name = user.fullName;
            api.sendMessage({
                body: lang.get('system.userJoin', name),
                mentions: [{ tag: name, id: user.userFbId }]
            }, threadID);
        }
    }
}
