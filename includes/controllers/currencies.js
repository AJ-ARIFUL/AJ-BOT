const { Currencies } = require('../index');

module.exports = {
    // টাকা অ্যাড করো
    addMoney: async (userID, amount) => {
        const [user, created] = await Currencies.findOrCreate({ 
            where: { userID }, 
            defaults: { userID, money: amount } 
        });
        if (!created) {
            await user.increment('money', { by: amount });
        }
        return await Currencies.findOne({ where: { userID } });
    },

    // টাকা কাটো
    removeMoney: async (userID, amount) => {
        const user = await Currencies.findOne({ where: { userID } });
        if (!user || user.money < amount) return false;
        await user.decrement('money', { by: amount });
        return true;
    },

    // ব্যালেন্স চেক
    getBalance: async (userID) => {
        const user = await Currencies.findOne({ where: { userID } });
        return user? user.money : 0;
    },

    // ডেইলি রিওয়ার্ড
    checkDaily: async (userID) => {
        const user = await Currencies.findOne({ where: { userID } });
        if (!user) return { canClaim: true, money: 0 };
        
        const now = new Date();
        const lastDaily = user.daily? new Date(user.daily) : null;
        
        if (!lastDaily || now - lastDaily >= 86400000) { // 24 ঘন্টা
            return { canClaim: true, money: user.money };
        }
        
        const remaining = 86400000 - (now - lastDaily);
        return { canClaim: false, remaining };
    },

    // ডেইলি ক্লেইম করো
    claimDaily: async (userID, reward = 1000) => {
        const [user] = await Currencies.findOrCreate({ 
            where: { userID }, 
            defaults: { userID, money: reward, daily: new Date() } 
        });
        if (!user.isNewRecord) {
            await user.update({ 
                money: user.money + reward, 
                daily: new Date() 
            });
        }
        return user.money;
    },

    // টপ ব্যালেন্স
    getTopBalance: async (limit = 10) => {
        return await Currencies.findAll({
            order: [['money', 'DESC']],
            limit: limit
        });
    },

    // ট্রান্সফার
    transferMoney: async (senderID, receiverID, amount) => {
        const sender = await Currencies.findOne({ where: { userID: senderID } });
        if (!sender || sender.money < amount) return false;

        await sender.decrement('money', { by: amount });
        await this.addMoney(receiverID, amount);
        return true;
    }
};
