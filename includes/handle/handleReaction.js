global.client = global.client || {};
global.client.handleReaction = global.client.handleReaction || [];

module.exports = async function ({ api, event, config, db }) {
    const { messageID, userID, reaction } = event;
    
    const handleReaction = global.client.handleReaction.find(item => 
        item.messageID == messageID
    );

    if (handleReaction) {
        const command = require(`../../Script/${handleReaction.name}.js`);
        command.handleReaction({ api, event, config, db, handleReaction });
    }
}
