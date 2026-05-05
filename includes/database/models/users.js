const { sequelize, DataTypes } = require('../model');

const Users = sequelize.define('users', {
    userID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    exp: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    money: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    msgCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: true
});

module.exports = Users;
