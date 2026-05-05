const chalk = require('chalk');

module.exports = (data, type) => {
    const time = new Date().toLocaleTimeString('bn-BD', { timeZone: 'Asia/Dhaka' });
    
    switch (type) {
        case 'INFO':
            console.log(chalk.blue(`[${time}] [INFO]`), data);
            break;
        case 'ERROR':
            console.log(chalk.red(`[${time}] [ERROR]`), data);
            break;
        case 'WARN':
            console.log(chalk.yellow(`[${time}] [WARN]`), data);
            break;
        case 'SUCCESS':
            console.log(chalk.green(`[${time}] [SUCCESS]`), data);
            break;
        default:
            console.log(chalk.gray(`[${time}] [LOG]`), data);
    }
}
