const { sequelize, DataTypes } = require('../../model');

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
        type: DataTypes.JSON,
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
    },
    // নতুন 3টা কলাম
    antiBD: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    antiJoin: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    antiOut: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    antiRobbery: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    autoSetName: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    nickNameFormat: { 
        type: DataTypes.STRING, 
        defaultValue: "[{count}] {name}" 
    }
}, {
    timestamps: true
});

module.exports = Threads;
