const Sequelize = require('sequelize');
const db = require('../config/db.ts');

const Product = db.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    description: Sequelize.TEXT,
    specs: Sequelize.JSON,
})

module.exports = Product;