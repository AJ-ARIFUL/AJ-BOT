module.exports = {
    config: {
        name: "board",
        aliases: ["top", "leaderboard"],
        description: "সেরা 10 ইউজার দেখুন"
    },

    run: async ({ api, event, db }) => {
        const { threadID, messageID } = event;
        
        const topMoney = await db.getTop(10, 'money');
        const topLevel = await db.getRank(10);
        
        let msg = "🏆 লিডারবোর্ড 🏆\n━━━━━━━━━━━━━━━\n💰 টপ ধনী:\n";
        for (let i = 0; i < topMoney.length; i++) {
            const info = await api.getUserInfo(topMoney[i].userID);
            msg += `${i+1}. ${info[topMoney[i].userID].name} - ${topMoney[i].money}৳\n`;
        }
        
        msg += "\n⭐ টপ লেভেল:\n";
        for (let i = 0; i < topLevel.length; i++) {
            const info = await api.getUserInfo(topLevel[i].userID);
            const level = Math.floor((Math.sqrt(1 + 8 * topLevel[i].exp / 5) - 1) / 2);
            msg += `${i+1}. ${info[topLevel[i].userID].name} - Lv.${level}\n`;
        }
        
        api.sendMessage(msg, threadID, messageID);
    }
          }
