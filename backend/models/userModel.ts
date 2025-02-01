import { DataTypes, Model } from 'sequelize';
import db from '../config/db';

class User extends Model {
  public id!: string;
  public email!: string;
  public name!: string;
  public password!: string;
  public phone!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    User.hasOne(models.Cart, { 
      foreignKey: 'userId',
      as: 'cart' // Adicione um alias para a associação
    });
    User.belongsToMany(models.Product, {
      through: models.UserWishlist,
      as: 'wishlist',
      foreignKey: 'userId',
      otherKey: 'productId'
    });
  }
}

User.init(
  {
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'User',
    tableName: 'users',
    timestamps: true, // Habilita `createdAt` e `updatedAt`
  }
);

export default User;
