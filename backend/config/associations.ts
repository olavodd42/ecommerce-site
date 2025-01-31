import User from '../models/userModel';
import Product from '../models/productModel';
import UserWishlist from '../models/UserWishlist';

User.hasMany(Product, { foreignKey: 'user_id', as: 'products' });
Product.belongsTo(User, { foreignKey: 'user_id', as: 'owner' });

User.belongsToMany(Product, { through: UserWishlist, as: 'wishlist', foreignKey: 'userId' });
Product.belongsToMany(User, { through: UserWishlist, as: 'wishlistedBy', foreignKey: 'productId' });

export { User, Product, UserWishlist };
