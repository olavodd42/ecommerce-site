import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('postgres://postgres:123456@localhost:5432/ecommerce', {dialect: 'postgres'});
 
sequelize.sync({ force: false }) // Altere para "true" para recriar tabelas (apaga os dados existentes)
  .then(() => {
    console.log('Banco de dados sincronizado com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });
  
module.exports = sequelize;