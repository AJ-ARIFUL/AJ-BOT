const { sequelize } = require('../model');

module.exports = async function () {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('[DATABASE] All tables synced successfully');
    } catch (error) {
        console.log('[DATABASE] Sync failed:', error);
    }
}
