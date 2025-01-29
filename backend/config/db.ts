import { Sequelize } from 'sequelize';

exports.db = new Sequelize('postgres://postgres:123456@localhost:5432/ecommerce', { dialect: 'postgres' });
