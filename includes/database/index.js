const { sequelize } = require('./model');
const Teach = require('./models/teach.model');

// ডাটাবেস সিঙ্ক করো - টেবিল অটো বানাবে
sequelize.sync({ force: false });

module.exports = {
    // শিখানো ডাটা অ্যাড
    addTeach: async (trigger, reply, author) => {
        try {
            await Teach.upsert({ trigger, reply, author });
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    },

    // ডাটা খোঁজা
    getTeach: async (trigger) => {
        const data = await Teach.findOne({ where: { trigger } });
        return data;
    },

    // ডিলিট
    delTeach: async (trigger) => {
        const data = await Teach.destroy({ where: { trigger } });
        return data;
    },

    // সব লিস্ট
    getAllTeach: async () => {
        const data = await Teach.findAll();
        return data;
    },

    // মডেল এক্সপোর্ট
    Teach,
    sequelize
};
