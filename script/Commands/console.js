module.exports = {
    config: {
        name: "console",
        aliases: ["log"],
        description: "টার্মিনালে লগ পাঠান",
        usage: "{p}console [text]",
        permissions: [2]
    },

    run: async ({ api, event, args, config }) => {
        const { threadID, messageID, senderID } = event;
        
        if (!config.adminUID.includes(senderID)) {
            return api.sendMessage("শুধু বট এডমিন ❌", threadID, messageID);
        }
        
        const text = args.join(" ");
        if (!text) return api.sendMessage("টেক্সট দিন:!console Hello", threadID, messageID);
        
        console.log(`[CONSOLE] ${text}`);
        api.sendMessage(`✅ টার্মিনালে পাঠানো হয়েছে:\n${text}`, threadID, messageID);
    }
}
