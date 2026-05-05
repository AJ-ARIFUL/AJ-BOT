const figlet = require('figlet');

module.exports = {
    config: {
        name: "bigtext",
        description: "বড় ASCII টেক্সট বানান",
        usage: "{p}bigtext [text]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const text = args.join(" ");
        if (!text) return api.sendMessage("টেক্সট দিন:!bigtext Hi", threadID, messageID);
        if (text.length > 8) return api.sendMessage("8 অক্ষরের বেশি না ❌", threadID, messageID);
        
        figlet.text(text, { font: 'Big' }, (err, data) => {
            if (err) return api.sendMessage("❌ এরর", threadID, messageID);
            api.sendMessage(`\`\`\`\n${data}\n\`\`\``, threadID, messageID);
        });
    }
                                            }
