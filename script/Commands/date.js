module.exports = {
    config: {
        name: "date",
        description: "আজকের তারিখ ও সময় দেখুন"
    },

    run: async ({ api, event }) => {
        const { threadID, messageID } = event;
        
        const now = new Date();
        const options = { 
            timeZone: 'Asia/Dhaka', 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        
        const dateStr = now.toLocaleString('bn-BD', options);
        api.sendMessage(`📅 আজকের তারিখ ও সময় 📅\n━━━━━━━━━━━━━━━\n${dateStr}`, threadID, messageID);
    }
          }
