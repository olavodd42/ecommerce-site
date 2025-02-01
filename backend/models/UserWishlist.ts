import { DataTypes, Model } from 'sequelize';
import db from '../config/db';
import User from './userModel';
import Product from './productModel';

class UserWishlist extends Model {
  public userId!: string;
  public productId!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    UserWishlist.belongsTo(models.User, { foreignKey: 'userId' });
    UserWishlist.belongsTo(models.Product, { foreignKey: 'productId' });
  }
}

UserWishlist.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: 'id',
      },
      onDelete: 'CASCADE',
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    tableName: 'user_wishlist',
    timestamps: true,
  }
);

export default UserWishlist;