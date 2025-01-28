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
    user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'Users', // Nome da tabela referenciada
            key: 'id',      // Coluna referenciada
        },
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    freight: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    description: Sequelize.TEXT,
    specs: Sequelize.JSON,
    image: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Product;