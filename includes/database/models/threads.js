const { sequelize, DataTypes } = require('../model');

const Threads = sequelize.define('threads', {
    threadID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    threadName: {
        type: DataTypes.STRING
    },
    emoji: {
        type: DataTypes.STRING
    },
    adminIDs: {
        type: DataTypes.JSON, // Array সেভ হবে
        defaultValue: []
    },
    members: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    antiSpam: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    onlyAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true
});

module.exports = Threads;
