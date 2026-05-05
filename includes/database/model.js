const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const log = require('../utils/log');

// SQLite ডাটাবেস কানেক্ট
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'data.sqlite'),
    logging: false, // SQL কুয়েরি দেখতে চাইলে true করো
    define: {
        timestamps: true,
        freezeTableName: true
    }
});

// কানেকশন টেস্ট
sequelize.authenticate()
    .then(() => log('Database connected successfully', 'INFO'))
    .catch(err => log('Database error: ' + err, 'ERROR'));

module.exports = { sequelize, DataTypes };
