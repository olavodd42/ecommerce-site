import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.JWT_SECRET);

import express from 'express';
import authRouter from './routes/authRoutes';
import protectRouter from './routes/protectedRoutes';
import protectedProductRouter from './routes/protectedProductRoutes';
import productRoutes from './routes/productRoutes';
import cartRouter from './routes/cartRoutes';
import orderRouter from './routes/orderRoutes';
import path from 'path';
import cors from 'cors';

import { authenticate } from './middleware/protectRoutes';
import db from './config/db';
import './models/index'; 



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'config/uploads')));

app.use('/api/users', authRouter);
app.use('/api/users', authenticate, protectRouter);
app.use('/api/products', productRoutes); // Rota pública para obter produtos
app.use('/api/products', authenticate, protectedProductRouter); // Rotas protegidas para criar, atualizar e deletar produtos
app.use('/api/cart', authenticate, cartRouter);
app.use('/api/checkout', authenticate, orderRouter);

db.sync({ force: false, alter: true }) // Garante que as tabelas existam
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error('Error connecting to database:', err));
app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}/`);
});