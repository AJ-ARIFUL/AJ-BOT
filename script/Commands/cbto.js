module.exports = {
    config: {
        name: "cbto",
        description: "Cock and Ball Torture মিম",
        usage: "{p}cbto [name]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const name = args.join(" ") || "আমি";
        
        const msg = `Cock and Ball Torture\n━━━━━━━━━━━━━━━\n${name} 😭👉🥥\n\n💀 RIP ${name}`;
        api.sendMessage(msg, threadID, messageID);
    }
}
