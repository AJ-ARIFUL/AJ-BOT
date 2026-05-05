module.exports = {
    config: {
        name: "bro",
        description: "ব্রো রিপ্লাই",
        noprefix: true
    },

    run: async ({ api, event }) => {
        const { threadID, messageID, body } = event;
        if (body.toLowerCase()!== "bro" && body.toLowerCase()!== "!bro") return;
        
        const replies = [
            "Yes bro? 😎", "কি খবর ব্রো? 🔥", "বলো ব্রাদার 💪", 
            "Bro for life 🤝", "কি লাগবে ব্রো? 😏", "আমি আছি ব্রো 🫡"
        ];
        const rand = replies[Math.floor(Math.random() * replies.length)];
        api.sendMessage(rand, threadID, messageID);
    }
}
