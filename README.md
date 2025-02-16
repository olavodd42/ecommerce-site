# Ecommerce Site

[![Languages](https://img.shields.io/github/languages/top/olavodd42/ecommerce-site?style=flat-square)](https://github.com/olavodd42/ecommerce-site)
[![Repository Size](https://img.shields.io/github/repo-size/olavodd42/ecommerce-site?style=flat-square)](https://github.com/olavodd42/ecommerce-site)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

Este é um projeto de um site de ecommerce desenvolvido com a stack MERN (MongoDB, Express, React, Node.js) e utilizando Sequelize como ORM para interação com o banco de dados PostgreSQL.

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Contato](#contato)
- [Recursos Adicionais](#recursos-adicionais)
- [Licença](#licença)

## Sobre o Projeto

O projeto **Ecommerce Site** é uma aplicação web completa que possibilita:
- Cadastro e autenticação de usuários com JSON Web Tokens (JWT).
- Gerenciamento de produtos com opções de visualização, edição e remoção.
- Sistema de carrinho de compras e finalização de pedidos.
- Lista de desejos para os usuários armazenarem seus produtos favoritos.

O código completo do projeto está disponível no GitHub: [olavodd42/ecommerce-site](https://github.com/olavodd42/ecommerce-site).

## Funcionalidades

- **Autenticação de Usuários:** Registro, login e proteção de rotas com JWT.
- **Gerenciamento de Produtos:** Adição, visualização, edição e remoção de produtos.
- **Carrinho de Compras:** Inclusão e remoção de itens, com cálculo do total da compra.
- **Finalização de Compra:** Processamento dos pedidos realizados.
- **Lista de Desejos:** Permite que os usuários salvem produtos para futura compra.

## Tecnologias Utilizadas

- **Frontend:**  
  - React  
  - Tailwind CSS  
  - Axios  
  - React Router  

- **Backend:**  
  - Node.js  
  - Express  
  - Sequelize  
  - PostgreSQL  

- **Autenticação:**  
  - JSON Web Tokens (JWT)  
  - bcrypt

- **Outras Dependências:**  
  - dotenv  
  - multer (para upload de imagens)

## Estrutura do Projeto

```
ecommerce-site/
├── backend/
│   ├── config/
│   │   ├──uploads/              # Imagens e outros arquivos enviados
│   │   ├──associations.ts       # Associações entre modelos
│   │   ├──db.ts                 # Configuração do banco de dados
│   │   └──multer.ts             # Configuração do multer
│   ├── controllers/
│   │   ├──authControllers.ts    # Lógica de autenticação
│   │   ├──cartControllers.ts    # Lógica do carrinho de compras
│   │   ├──checkoutControllers.ts# Lógica de finalização de compra
│   │   └──productControllers.ts # Lógica de gerenciamento de produtos
│   ├── middleware/
│   │   └──protectRoutes         # Middleware para proteção de rotas
│   ├── models/
│   │   ├──config/
│   │   │   └──config.json       # Configuração do Sequelize
│   │   ├──models/
│   │   │   └──index.js          # Inicialização dos modelos
│   │   ├──cartModel.ts
│   │   ├──index.ts
│   │   ├──orderModel.ts
│   │   ├──productModel.ts
│   │   ├──userModel.ts
│   │   └──UserWishlist.ts
│   ├── routes/
│   │   ├──authRoutes.ts         # Rotas de autenticação
│   │   ├──cartRoutes.ts         # Rotas do carrinho
│   │   ├──orderRoutes.ts        # Rotas de pedidos
│   │   ├──productRoutes.ts      # Rotas de produtos
│   │   ├──protectedProductRoutes.ts
│   │   └──protectedRoutes.ts    # Rotas protegidas
│   ├── .env                    # Variáveis de ambiente
│   ├── index.ts                # Arquivo principal do servidor
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   │   ├── Account.tsx
│   │   │   ├── Cards.tsx
│   │   │   ├── Config.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── img.png
│   │   │   ├── myProducts.tsx
│   │   │   ├── Orders.tsx
│   │   │   ├── ProductCardCarousel.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── ProductEdit.tsx
│   │   │   ├── ProductList.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── Sales.tsx
│   │   │   ├── Settings.tsx
│   │   │   ├── style.css
│   │   │   └── Wishlist.tsx
│   │   ├── context/            # Contextos para estado global
│   │   │   ├── authProvider.tsx
│   │   │   └── cartcontext.tsx
│   │   ├── pages/              # Páginas da aplicação
│   │   │   ├── Cart.tsx
│   │   │   ├── Checkout.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── searchPage.tsx
│   │   │   └── userProfile.tsx
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── index.tsx
│   │   ├── logo.svg
│   │   ├── reportWebVital.js
│   │   └── setupTests.js
│   ├── package-lock.json
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Passos para Configuração

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/olavodd42/ecommerce-site.git
   ```

2. **Backend:**

   - Acesse o diretório do backend:
     ```sh
     cd ecommerce-site/backend
     ```
   - Instale as dependências:
     ```sh
     npm install
     ```
   - Configure o arquivo `.env` com as credenciais do banco de dados e outras variáveis necessárias.
   - Execute as migrações do banco de dados:
     ```sh
     cd models
     npx sequelize db:migrate
     cd ..
     ```
   - Inicie o servidor:
     ```sh
     npm start
     ```

3. **Frontend:**

   - Acesse o diretório do frontend:
     ```sh
     cd ../frontend
     ```
   - Instale as dependências:
     ```sh
     npm install
     ```
   - Inicie o servidor de desenvolvimento:
     ```sh
     npm start
     ```

## Uso

- **Frontend:**  
  Acesse a aplicação pelo navegador em [http://localhost:3000](http://localhost:3000).

- **Backend:**  
  A API estará disponível em [http://localhost:4000](http://localhost:4000).

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto.
2. Crie uma branch para a sua feature:
   ```sh
   git checkout -b feature/nova-feature
   ```
3. Faça seus commits com mensagens claras:
   ```sh
   git commit -m "Adiciona nova feature"
   ```
4. Envie sua branch para o repositório remoto:
   ```sh
   git push origin feature/nova-feature
   ```
5. Abra um Pull Request para revisão.

Consulte também o arquivo [CONTRIBUTING.md](CONTRIBUTING.md) para mais detalhes.

## Contato

- **Email:** [olavodalberto921@gmail.com](mailto:olavodalberto921@gmail.com)
- **LinkedIn:** [Olavo Defendi Dalberto](https://www.linkedin.com/in/olavo-defendi-dalberto-050144235)
- **Portfólio:** [olavodd42.vercel.app](https://olavodd42.vercel.app/)

## Recursos Adicionais

- [Documentação da Stack MERN](https://www.mongodb.com/mern-stack)  
- [Guia do Sequelize](https://sequelize.org/master/manual/)

## Licença

Este projeto não possui uma licença definida. Caso deseje reutilizar o código, entre em contato para definir os termos de uso.

