import User from './userModel';
import Product from './productModel';

const sequelize = require('../config/db');

User.associate({ Product });
Product.associate({ User });

export {
  sequelize,
  User,
  Product
};