module.exports = {
    config: {
        name: "by",
        aliases: ["bye", "goodbye"],
        description: "বিদায় নিন",
        noprefix: true
    },

    run: async ({ api, event }) => {
        const { threadID, messageID, senderID, body } = event;
        if (!["by", "bye", "goodbye", "!by"].includes(body.toLowerCase())) return;
        
        const info = await api.getUserInfo(senderID);
        const name = info[senderID].firstName;
        
        const replies = [
            `আল্লাহ হাফেজ ${name} 🥺`, `Bye ${name}, আবার আসবেন 😢`, 
            `Take care ${name} ❤️`, `মিস করবো ${name} 😭`, `Goodbye ${name}, ভালো থাকবেন 🌸`
        ];
        const rand = replies[Math.floor(Math.random() * replies.length)];
        api.sendMessage(rand, threadID, messageID);
    }
                                        }
