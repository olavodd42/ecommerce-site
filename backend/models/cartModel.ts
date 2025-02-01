import { DataTypes, Model } from 'sequelize';
import db from '../config/db';

class Cart extends Model {
  public id!: string;
  public userId!: string;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    console.log("🔹 Registrando associações de Cart");
    Cart.hasMany(models.CartItem, { 
      foreignKey: 'cartId',
      as: 'items'
    });
    Cart.belongsTo(models.User, { 
      foreignKey: 'userId',
      as: 'user'
    });
  }
}

Cart.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    sequelize: db,
    modelName: 'Cart',
    tableName: 'carts',
    timestamps: true,
  }
);

class CartItem extends Model {
  public id!: string;
  public cartId!: string;
  public productId!: number;
  public quantity!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    console.log("🔹 Registrando associações de CartItem");
    CartItem.belongsTo(models.Cart, { 
      foreignKey: 'cartId',
      as: 'cart'  
    });
    CartItem.belongsTo(models.Product, { 
      foreignKey: 'productId',
      as: 'product'  
    });
  }
}

CartItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    cartId: {
      type: DataTypes.UUID,
      references: {
        model: 'carts',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'id'
      }
    }
  },
  {
    sequelize: db,
    modelName: 'CartItem',
    tableName: 'cart_items',
    timestamps: true,
  }
);

export { Cart, CartItem };
