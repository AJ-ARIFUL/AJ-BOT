const axios = require('axios');

module.exports = {
    config: {
        name: "convert",
        description: "কারেন্সি/ইউনিট কনভার্ট করুন",
        usage: "{p}convert [amount] [from] [to]"
    },

    run: async ({ api, event, args }) => {
        const { threadID, messageID } = event;
        const [amount, from, to] = args;
        
        if (!amount ||!from ||!to) {
            return api.sendMessage("ব্যবহার:!convert 100 usd bdt", threadID, messageID);
        }
        
        try {
            const res = await axios.get(`https://api.popcat.xyz/convert?amount=${amount}&from=${from}&to=${to}`);
            const result = res.data;
            api.sendMessage(`💱 কনভার্ট রেজাল্ট:\n${amount} ${from.toUpperCase()} = ${result.converted} ${to.toUpperCase()}`, threadID, messageID);
        } catch (e) {
            api.sendMessage("❌ কনভার্ট করতে পারলাম না। কারেন্সি কোড চেক করুন", threadID, messageID);
        }
    }
                                                                                 }
