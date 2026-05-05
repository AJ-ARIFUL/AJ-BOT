const { sequelize, DataTypes } = require('../model');

const Currencies = sequelize.define('currencies', {
    userID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    money: {
        type: DataTypes.BIGINT,
        defaultValue: 0
    },
    daily: {
        type: DataTypes.DATE, // শেষ কখন!daily নিছে
        defaultValue: null
    }
}, {
    timestamps: true
});

module.exports = Currencies;
