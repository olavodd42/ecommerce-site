import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:123456@localhost:5432/ecommerce', { dialect: 'postgres' });

module.exports = sequelize;