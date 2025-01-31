import db from '../config/db';
import User from './userModel';
import Product from './productModel';

// Inicializar modelos
User.initialize(db);
Product.initialize(db);

// Configurar associações
User.associate({ Product });
Product.associate({ User });

export { db, User, Product };