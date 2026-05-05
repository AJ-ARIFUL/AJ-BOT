const { Threads } = require('../index');

module.exports = {
    // গ্রুপ বানাও বা আপডেট করো
    createThread: async (threadID, data) => {
        const [thread, created] = await Threads.findOrCreate({ 
            where: { threadID }, 
            defaults: data 
        });
        if (!created) {
            await Threads.update(data, { where: { threadID } });
        }
        return thread;
    },

    // গ্রুপ ইনফো
    getThread: async (threadID) => {
        return await Threads.findOne({ where: { threadID } });
    },

    // সব গ্রুপ
    getAllThreads: async () => {
        return await Threads.findAll();
    },

    // এডমিন অনলি মোড
    setOnlyAdmin: async (threadID, status) => {
        return await Threads.update(
            { onlyAdmin: status }, 
            { where: { threadID } }
        );
    },

    // এন্টি স্প্যাম
    setAntiSpam: async (threadID, status) => {
        return await Threads.update(
            { antiSpam: status }, 
            { where: { threadID } }
        );
    },

    // গ্রুপ ব্যান
    banThread: async (threadID) => {
        return await Threads.update({ banned: true }, { where: { threadID } });
    }
};
