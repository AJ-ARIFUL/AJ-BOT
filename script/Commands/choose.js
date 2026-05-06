module.exports = {
    config: {
        name: "choose",
        description: "বট অপশন থেকে চুজ করে দিবে",
        usage: "{p}choose [option1] | [option2] | [option3]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const options = args.join(" ").split("|").map(i => i.trim()).filter(i => i);
        
        if (options.length < 2) return api.sendMessage("2টা অপশন দিন:!choose ভাত | বিরিয়ানি", threadID, messageID);
        
        const choice = options[Math.floor(Math.random() * options.length)];
        api.sendMessage(`🤔 আমি চুজ করলাম:\n➡️ ${choice}`, threadID, messageID);
    }
            }
