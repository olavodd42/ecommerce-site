import { Request, Response } from 'express';
import { Order, OrderItem } from '../models/orderModel';
import { Cart, CartItem } from '../models/cartModel';
import Product from '../models/productModel';


const createOrderFromCart = async (req, res) => {
    try {
        const userId = req.user.id;

    // const cart = await Cart.findOne({ where: { userId }, include: [{ model: CartItem, include: [Product] }] });
    const cart = await Cart.findOne({
        where: { userId },
        include: [{
        model: CartItem,
        as: 'items',
        include: [{
            model: Product,  // 🔥 Incluir o modelo Product na query
            as: 'product'
        }]
        }]
    });
    
        

        if (!cart || cart?.items?.length === 0) {
            return res.status(404).json({ message: 'Cart is empty' });
        }

        const order = await Order.create({
            userId,
            total: cart?.items?.reduce((sum, item) => sum + (item.product?.price ?? 0) * item.quantity, 0),
            status: 'pendente',
        });

        if (!order) {
            return res.status(500).json({ message: 'Error creating order' });
        }

        const orderItems = cart?.items?.map(item => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item?.product?.price,
        }));

        
        if (!orderItems) {
            return res.status(500).json({ message: 'Error creating order items' });
        }

        await OrderItem.bulkCreate(orderItems);

        await CartItem.destroy({ where: { cartId: cart.id } });

        res.status(201).json({ message: 'Pedido criado com sucesso!', order });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

const createOrderDirect = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        const order = await Order.create({
            userId,
            total: product.price * quantity,
            status: 'pendente',
          });

          await OrderItem.create({
            orderId: order.id,
            productId,
            quantity,
            price: product.price,
          });

        res.status(201).json({ message: 'Pedido criado com sucesso!', order });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

module.exports = { createOrderFromCart, createOrderDirect };