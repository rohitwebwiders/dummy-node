const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('dummy_node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false});
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}
module.exports = {sequelize, initializeDatabase};