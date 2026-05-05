module.exports = {
    config: {
        name: "autosetname",
        eventType: ["log:subscribe"],
        version: "1.0",
        credits: "Arif",
        description: "জয়েন করলে অটো নিকনেম"
    },

    run: async ({ api, event, db }) => {
        const { threadID, logMessageData } = event;
        const thread = await db.getThread(threadID);
        
        if (!thread?.autoSetName) return;
        
        const added = logMessageData.addedParticipants;
        for (let user of added) {
            const format = thread.nickNameFormat || "[{count}] {name}";
            const count = thread.members + 1;
            const nickname = format.replace("{count}", count).replace("{name}", user.fullName);
            
            try {
                await api.changeNickname(nickname, threadID, user.userFbId);
            } catch (e) {}
        }
    }
}
