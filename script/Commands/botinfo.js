const os = require('os');
const { pid } = require('process');

module.exports = {
    config: {
        name: "botinfo",
        aliases: ["info"],
        description: "বটের তথ্য দেখুন"
    },

    run: async ({ api, event, config }) => {
        const { threadID, messageID } = event;
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        
        const allThreads = await api.getThreadList(100, null, ['INBOX']);
        const groups = allThreads.filter(t => t.isGroup).length;
        
        const msg = `🤖 বট ইনফো 🤖\n━━━━━━━━━━━━━━━\n📌 নাম: ${config.botName}\n👑 এডমিন: ${config.adminName}\n📦 ভার্সন: 3.0\n⏰ আপটাইম: ${hours}h ${minutes}m\n👥 গ্রুপ: ${groups} টি\n💻 প্ল্যাটফর্ম: ${os.platform()}\n📊 RAM: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB\n🔧 PID: ${pid}`;
        
        api.sendMessage(msg, threadID, messageID);
    }
          }
