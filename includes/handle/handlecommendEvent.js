const fs = require('fs');
const path = require('path');

module.exports = async function ({ api, config, db }) {
    const commands = fs.readdirSync('./Script').filter(f => f.endsWith('.js'));
    
    for (const file of commands) {
        const command = require(`../../Script/${file}`);
        if (command.onLoad) {
            try {
                command.onLoad({ api, config, db });
            } catch (e) {
                console.log(`Load error ${file}:`, e);
            }
        }
    }
}
