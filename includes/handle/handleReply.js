global.client = global.client || {};
global.client.handleReply = global.client.handleReply || [];

module.exports = async function ({ api, event, config, db }) {
    const { messageReply, threadID, messageID, senderID, body } = event;
    if (!messageReply) return;

    const handleReply = global.client.handleReply.find(item => 
        item.messageID == messageReply.messageID
    );

    if (handleReply) {
        const command = require(`../../Script/${handleReply.name}.js`);
        command.handleReply({ api, event, config, db, handleReply });
    }
}
