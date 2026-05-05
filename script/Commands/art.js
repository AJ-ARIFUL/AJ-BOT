const figlet = require('figlet');

module.exports = {
    config: {
        name: "art",
        description: "টেক্সট ASCII আর্ট বানান",
        usage: "{p}art [text]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const text = args.join(" ");
        if (!text) return api.sendMessage("টেক্সট দিন:!art Hello", threadID, messageID);
        if (text.length > 10) return api.sendMessage("10 অক্ষরের বেশি না ❌", threadID, messageID);
        
        figlet(text, (err, data) => {
            if (err) return api.sendMessage("❌ এরর হয়েছে", threadID, messageID);
            api.sendMessage(`\`\`\`\n${data}\n\`\`\``, threadID, messageID);
        });
    }
                               }
