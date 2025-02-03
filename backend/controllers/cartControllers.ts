import express from 'express';
import { Cart, CartItem } from '../models/cartModel';
import Product from '../models/productModel';
import User from '../models/userModel';

// Obter carrinho do usuário
const getCart = async (req, res) => {
    try {
      const userID = req.headers.user;
      const user = await User.findByPk(userID);
  
      if (!user) {
        return res.status(404).send('Usuário não encontrado');
      }

      // Example: Correct usage with alias

      console.log('Associações carregadas:', Cart.associations, CartItem.associations);

      const cart = await Cart.findOne({
        where: { userId: user.id },
        include: [{
          model: CartItem,
          as: 'items', // ⚠️ Alias deve ser exatamente 'items'
          include: [{ 
            model: Product,
            as: 'product' // ⚠️ Alias deve ser exatamente 'product'
          }]
        }]
      });
      
      

      if (!cart) {
        return res.status(404).json({ CartItems: [] });
      }
  
      res.status(200).json(cart);
    } catch (error) {
      console.error("Erro ao obter carrinho:", error);
      res.status(500).send((error as Error).message);
    }
  };  

// Adicionar item ao carrinho
const addItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = req.user;
    
    let cart = await Cart.findOne({ where: { userId: user.id } });
    
    if (!cart) {
      cart = await Cart.create({ userId: user.id });
    }
    
    const item = await CartItem.create({
      cartId: cart.id,
      productId,
      quantity
    });
    
    res.status(201).json(item);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

// Atualizar quantidade
const updateItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await CartItem.findByPk(req.params.id);
    
    if (!item) {
      return res.status(404).send('Item não encontrado');
    }
    
    item.quantity = quantity;
    await item.save();
    
    res.json(item);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

// Remover item do carrinho
const deleteItem = async (req, res) => {
  try {
    const item = await CartItem.findByPk(req.params.id);
    
    if (!item) {
      return res.status(404).send('Item não encontrado');
    }
    
    await item.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

// Limpar carrinho
const deleteCart = async (req, res) => {
  try {
    const user = req.user;
    const cart = await Cart.findOne({ where: { userId: user.id } });
    
    if (cart) {
      await CartItem.destroy({ where: { cartId: cart.id } });
    }
    
    res.sendStatus(204);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
};

module.exports = { getCart, addItem, updateItem, deleteItem, deleteCart };