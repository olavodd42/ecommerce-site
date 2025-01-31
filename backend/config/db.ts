import { Sequelize } from 'sequelize';

const db = new Sequelize('postgres://postgres:123456@localhost:5432/ecommerce', {
  dialect: 'postgres',
  logging: false,
});

export default db;
