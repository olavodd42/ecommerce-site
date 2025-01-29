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

export default Product;