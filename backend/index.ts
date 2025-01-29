import express from 'express';
import authRouter from './routes/authRoutes';
import protectRouter from './routes/protectedRoutes';
import protectedProductRouter from './routes/protectedProductRoutes';
import productRoutes from './routes/productRoutes';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { authenticate } from './middleware/protectRoutes';
const { db } = require('./config/db'); // Importe a instância do Sequelize

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'config/uploads')));

app.use('/api/users', authRouter);
app.use('/api/users', authenticate, protectRouter);
app.use('/api/products', productRoutes); // Rota pública para obter produtos
app.use('/api/products', authenticate, protectedProductRouter); // Rotas protegidas para criar, atualizar e deletar produtos

// Sincronize os modelos com o banco de dados
db.sync({ alter: true }).then(() => {
  console.log('Tabelas sincronizadas com sucesso!');
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
  });
}).catch((error) => {
  console.error('Erro ao sincronizar com o banco de dados:', error);
});