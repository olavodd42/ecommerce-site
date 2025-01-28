const productRoutes = require('express').Router();
const { getProducts, getAllProducts } = require('../controllers/productControllers');

productRoutes.route('/').get(getAllProducts);
productRoutes.route('/:id').get(getProducts);