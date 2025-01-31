import { Sequelize, DataTypes } from 'sequelize';
const { db } = require('../config/db.ts');
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

User.associate = (models) => {
  // Relação 1:N com Products (produtos do usuário)
  User.hasMany(models.Product, {
    foreignKey: 'user_id',
    as: 'products'
  });

  // Relação N:N com Products (wishlist)
  User.belongsToMany(models.Product, {
    through: 'UserWishlist',
    as: 'wishlist',
    foreignKey: 'userId',
    otherKey: 'productId'
  });
};

export default User; // Use exportação padrão
