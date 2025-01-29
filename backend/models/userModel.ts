import { Sequelize, DataTypes } from 'sequelize';
const {db} = require('../config/db.ts');
import Product from './productModel'; // Importe o modelo Product

const User = db.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  name: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Product, { foreignKey: 'user_id' });
Product.belongsTo(User, { foreignKey: 'user_id' });

export default User; // Use exportação padrão
