const { Users } = require('../index');

module.exports = {
    // ইউজার বানাও বা খুঁজে বের করো
    createUser: async (userID, name) => {
        const [user, created] = await Users.findOrCreate({ 
            where: { userID }, 
            defaults: { userID, name, exp: 0, money: 0, msgCount: 0 } 
        });
        return user;
    },

    // ইউজার ইনফো নাও
    getUser: async (userID) => {
        return await Users.findOne({ where: { userID } });
    },

    // সব ইউজার
    getAllUsers: async () => {
        return await Users.findAll();
    },

    // EXP বাড়াও
    increaseExp: async (userID, exp = 1) => {
        return await Users.increment(
            { exp: exp, msgCount: 1 }, 
            { where: { userID } }
        );
    },

    // ব্যান করো
    banUser: async (userID) => {
        return await Users.update({ banned: true }, { where: { userID } });
    },

    // আনব্যান
    unbanUser: async (userID) => {
        return await Users.update({ banned: false }, { where: { userID } });
    },

    // র‍্যাঙ্ক লিস্ট
    getRank: async (limit = 10) => {
        return await Users.findAll({
            order: [['exp', 'DESC']],
            limit: limit
        });
    }
};
