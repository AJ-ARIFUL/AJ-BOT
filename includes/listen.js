const fs = require('fs');
const login = require('@xaviabot/fca-unofficial');
const config = require('../config.json');
const log = require('../utils/log');

module.exports = function() {
    login({ appState: JSON.parse(fs.readFileSync('./appstate.json', 'utf8')) }, (err, api) => {
        if (err) return log(err, 'ERROR');
        
        api.setOptions({ listenEvents: true, selfListen: false, logLevel: 'silent' });
        log(`Logged in as ${config.botName}`, 'INFO');
        fs.writeFileSync('./appstate.json', JSON.stringify(api.getAppState(), null, 2));

        // সব হ্যান্ডেলার লোড করো
        const handleCommand = require('./handle/handleCommand');
        const handleEvent = require('./handle/handleEvent');
        const handleReply = require('./handle/handleReply');

        api.listenMqtt((err, event) => {
            if (err) return log(err, 'ERROR');
            
            switch (event.type) {
                case "message":
                case "message_reply":
                    handleCommand({ api, event, config });
                    handleReply({ api, event, config });
                    break;
                case "event":
                    handleEvent({ api, event, config });
                    break;
            }
        });
    });
}
