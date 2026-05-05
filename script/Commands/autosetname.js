module.exports = {
    config: {
        name: "autosetname",
        description: "নতুন মেম্বারের অটো নিকনেম",
        usage: "{p}autosetname [on/off] [format]",
        permissions: [1]
    },

    run: async ({ api, event, args, db }) => {
        const { threadID, messageID, senderID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        
        if (!threadInfo.adminIDs.some(e => e.id == senderID)) {
            return api.sendMessage("শুধু গ্রুপ এডমিন ❌", threadID, messageID);
        }
        
        const status = args[0] === "on";
        const format = args.slice(1).join(" ") || "[{count}] {name}";
        
        await db.createThread(threadID, { 
            autoSetName: status,
            nickNameFormat: format 
        });
        api.sendMessage(`✅ অটো নিকনেম ${status? "ON" : "OFF"}\nফরম্যাট: ${format}`, threadID, messageID);
    }
          }
