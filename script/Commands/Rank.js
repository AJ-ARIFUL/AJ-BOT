const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = {
    config: {
        name: "rank",
        description: "আপনার র‍্যাঙ্ক কার্ড দেখুন",
        usage: "{p}rank [@mention]"
    },

    run: async ({ api, event, db, args }) => {
        const { threadID, messageID, senderID, mentions } = event;
        const targetID = Object.keys(mentions)[0] || senderID;
        
        const user = await db.getUser(targetID);
        if (!user) return api.sendMessage("ইউজার ডাটা নাই ❌", threadID, messageID);
        
        const allUsers = await db.getRank(100);
        const rank = allUsers.findIndex(u => u.userID == targetID) + 1;
        
        const userInfo = await api.getUserInfo(targetID);
        const name = userInfo[targetID].name;
        
        const level = Math.floor((Math.sqrt(1 + 8 * user.exp / 5) - 1) / 2);
        const expNow = user.exp - 5 * level * (level + 1) / 2;
        const expNeed = 5 * (level + 1);
        
        // সিম্পল টেক্সট কার্ড
        const msg = `╭─ R A N K ─╮\n│ 👤 ${name}\n│ 📊 লেভেল: ${level}\n│ ⭐ EXP: ${expNow}/${expNeed}\n│ 💬 মেসেজ: ${user.msgCount}\n│ 🏆 র‍্যাঙ্ক: #${rank}\n╰───────────╯`;
        
        api.sendMessage(msg, threadID, messageID);
    }
}
