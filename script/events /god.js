module.exports = {
    config: {
        name: "god",
        eventType: ["message"],
        version: "1.0",
        credits: "Arif",
        description: "এডমিনদের গড মোড"
    },

    run: async ({ api, event, config }) => {
        const { senderID, body, threadID } = event;
        if (!body) return;
        
        // শুধু এডমিন
        if (!config.adminUID.includes(senderID)) return;
        
        //!god off করলে বন্ধ
        if (body.toLowerCase() == `${config.prefix}god off`) {
            global.godMode = false;
            return api.sendMessage("God Mode OFF ❌", threadID);
        }
        
        if (body.toLowerCase() == `${config.prefix}god on`) {
            global.godMode = true;
            return api.sendMessage("God Mode ON ✅\nএখন সব কমান্ড পারমিশন ছাড়া চলবে", threadID);
        }
    }
}
