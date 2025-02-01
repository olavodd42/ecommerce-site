import db from '../config/db';
import User from './userModel';
import Product from './productModel';
import { Cart, CartItem } from './cartModel';
import UserWishlist from './UserWishlist';

// 📌 Garante que os modelos são armazenados corretamente antes de chamar associate()
const models = { User, Product, Cart, CartItem, UserWishlist };

// 📌 Agora chamamos associate() apenas para modelos que possuem esse método
Object.values(models).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

// 📌 Agora exportamos os modelos inicializados corretamente
export { db, User, Product, Cart, CartItem, UserWishlist };
