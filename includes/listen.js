const login = require('@xaviabot/fca-unofficial');
const fs = require('fs');
const config = require('../config.json');

module.exports = function() {
    login({ appState: JSON.parse(fs.readFileSync('./appstate.json', 'utf8')) }, (err, api) => {
        if (err) return console.log(err);
        
        api.setOptions({ listenEvents: true, selfListen: false });
        console.log(`[BOT] Logged in as ${config.botName}`);
        
        // DB তৈরি করো
        require('./handle/handleCreateDatabase')();
        
        // হ্যান্ডেলার লোড
        const handleCommand = require('./handle/handleCommand');
        const handleReply = require('./handle/handleReply');
        const handleReaction = require('./handle/handleReaction');
        const handleEvent = require('./handle/handleEvent');
        const handleCommandEvent = require('./handle/handleCommandEvent');
        
        // অটো রান কমান্ড
        handleCommandEvent({ api, config });

        api.listenMqtt((err, event) => {
            if (err) return console.log(err);
            
            switch (event.type) {
                case "message":
                case "message_reply":
                    handleCommand({ api, event, config });
                    handleReply({ api, event, config });
                    break;
                case "message_reaction":
                    handleReaction({ api, event, config });
                    break;
                case "event":
                    handleEvent({ api, event, config });
                    break;
            }
        });
    });
}
