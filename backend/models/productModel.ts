import { DataTypes } from 'sequelize';
const { db } = require('../config/db');
import User from './userModel'; // Importe o modelo User

const Product = db.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users', // Nome da tabela referenciada
      key: 'id',      // Coluna referenciada
    },
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sales: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  freight: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  specs: DataTypes.JSON,
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
});

Product.associate = (models) => {
  // Relação N:1 com User (dono do produto)
  Product.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'owner'
  });

  // Relação N:N com User (wishlist)
  Product.belongsToMany(models.User, {
    through: 'UserWishlist',
    as: 'wishlistedBy',
    foreignKey: 'productId',
    otherKey: 'userId'
  });
  
};

Product.init({}, {
  sequelize: db,
  tableName: 'products' // Nome da tabela explícito
});

export default Product;