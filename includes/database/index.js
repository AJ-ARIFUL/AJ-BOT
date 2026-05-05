const { sequelize } = require('./model');

// সব মডেল ইম্পোর্ট
const Teach = require('./database/models/teach.model');
const Users = require('./database/models/users.model');
const Threads = require('./database/models/threads.model');
const Currencies = require('./database/models/currencies.model');

// সব টেবিল অটো বানায় ফেলবে
sequelize.sync({ force: false })
    .then(() => console.log('All tables synced'))
    .catch(err => console.log('Sync error:', err));

// এক্সপোর্ট যাতে অন্য ফাইলে ইউজ করতে পারো
module.exports = {
    sequelize,
    Teach,
    Users,
    Threads,
    Currencies
};
