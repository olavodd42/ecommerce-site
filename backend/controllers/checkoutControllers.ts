import { Request, Response } from 'express';
import { Order, OrderItem } from '../models/orderModel';
import { Cart, CartItem } from '../models/cartModel';
import Product from '../models/productModel';

const { sellProduct } = require('./productControllers');

// Criar pedido a partir do carrinho
const createOrderFromCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({
            where: { userId },
            include: [{
                model: CartItem,
                as: 'items',
                include: [{
                    model: Product,
                    as: 'product'
                }]
            }]
        });

        console.log('cart items:', cart?.items);

        if (!cart || !cart.items || cart.items.length === 0) {
            return res.status(404).json({ message: 'Carrinho está vazio' });
        }

        const total = cart.items.reduce((sum, item) => sum + (item.product?.price ?? 0) * item.quantity, 0);
        const order = await Order.create({ userId, total, status: 'pendente' });

        const orderItems = cart.items.map(item => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.product?.price,
        }));

        await OrderItem.bulkCreate(orderItems);
        await CartItem.destroy({ where: { cartId: cart.id } });


        // Atualiza o estoque
        for (const item of cart.items) {
            await sellProduct(item.productId, item.quantity);
        }

        res.status(201).json({ message: 'Pedido criado com sucesso!', order });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Criar pedido direto sem passar pelo carrinho
const createOrderDirect = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        if (product.quantity < quantity) {
            return res.status(400).json({ message: 'Quantidade insuficiente em estoque' });
        }

        const order = await Order.create({ userId, total: product.price * quantity, status: 'pendente' });
        await OrderItem.create({ orderId: order.id, productId, quantity, price: product.price });

        await sellProduct(productId, quantity);

        res.status(201).json({ message: 'Pedido criado com sucesso!', order });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

module.exports = { createOrderFromCart, createOrderDirect };
