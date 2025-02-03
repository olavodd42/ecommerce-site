import express from 'express';
const { createOrderFromCart, createOrderDirect } = require('../controllers/checkoutControllers');

const orderRouter = require('express').Router();

orderRouter.post('/from-cart', createOrderFromCart);
orderRouter.post('/direct', createOrderDirect);

export default orderRouter;