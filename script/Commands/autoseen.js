module.exports = {
    config: {
        name: "autoseen",
        description: "মেসেজ অটো সিন করুন",
        permissions: [2]
    },

    run: async ({ api, event, args, config }) => {
        const { threadID, messageID, senderID } = event;
        
        if (!config.adminUID.includes(senderID)) {
            return api.sendMessage("শুধু বট এডমিন ❌", threadID, messageID);
        }
        
        const status = args[0] === "on";
        global.autoSeen = status;
        api.sendMessage(`✅ অটো সিন ${status? "ON" : "OFF"} হয়েছে`, threadID, messageID);
    }
  }
