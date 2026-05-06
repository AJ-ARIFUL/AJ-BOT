module.exports = {
    config: {
        name: "date2",
        description: "English date & time"
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
            second: '2-digit',
            hour12: true
        };
        
        const dateStr = now.toLocaleString('en-US', options);
        api.sendMessage(`📅 Current Date & Time 📅\n━━━━━━━━━━━━━━━\n${dateStr}`, threadID, messageID);
    }
          }
