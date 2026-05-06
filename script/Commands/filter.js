module.exports = {
    config: {
        name: "filter",
        description: "খারাপ শব্দ ফিল্টার করুন",
        usage: "{p}filter [add/remove/list] [word]",
        permissions: [1]
    },

    run: async ({ api, event, args, db }) => {
        const { threadID, messageID, senderID } = event;
        const threadInfo = await api.getThreadInfo(threadID);
        
        if (!threadInfo.adminIDs.some(e => e.id == senderID)) {
            return api.sendMessage("শুধু গ্রুপ এডমিন ❌", threadID, messageID);
        }
        
        const action = args[0];
        const word = args.slice(1).join(" ").toLowerCase();
        const threadData = await db.getThread(threadID);
        let badWords = threadData.badWords || [];
        
        if (action == "add") {
            if (!word) return api.sendMessage("শব্দ দিন:!filter add বাজে", threadID, messageID);
            if (badWords.includes(word)) return api.sendMessage("এই শব্দ অলরেডি ফিল্টারে আছে", threadID, messageID);
            badWords.push(word);
            await db.createThread(threadID, { badWords });
            api.sendMessage(`✅ "${word}" ফিল্টারে অ্যাড হয়েছে`, threadID, messageID);
        }
        else if (action == "remove") {
            badWords = badWords.filter(w => w!== word);
            await db.createThread(threadID, { badWords });
            api.sendMessage(`✅ "${word}" ফিল্টার থেকে রিমুভ হয়েছে`, threadID, messageID);
        }
        else if (action == "list") {
            if (badWords.length == 0) return api.sendMessage("ফিল্টার লিস্ট খালি", threadID, messageID);
            api.sendMessage(`🚫 ব্যান শব্দ লিস্ট:\n${badWords.map((w,i) => `${i+1}. ${w}`).join('\n')}`, threadID, messageID);
        }
        else {
            api.sendMessage("ব্যবহার:!filter add word\n!filter remove word\n!filter list", threadID, messageID);
        }
    }
          }
