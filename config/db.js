const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('dummy_node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;