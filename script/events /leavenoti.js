const getText = require('../../utils/getText');

module.exports = {
    config: {
        name: "leavenoti",
        eventType: ["log:unsubscribe"],
        version: "1.0",
        credits: "Arif",
        description: "লিভ নোটিফিকেশন"
    },

    run: async ({ api, event, config }) => {
        const { threadID, logMessageData } = event;
        const lang = getText(config.language);
        const leftID = logMessageData.leftParticipantFbId;
        
        if (leftID == api.getCurrentUserID()) return;
        
        const info = await api.getUserInfo(leftID);
        const name = info[leftID]?.name || "একজন মেম্বার";
        api.sendMessage(lang.get('system.userLeave', name), threadID);
    }
}
