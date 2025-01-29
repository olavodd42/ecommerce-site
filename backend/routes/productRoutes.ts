const productRoutes = require('express').Router();
const { getProduct, getAllProducts } = require('../controllers/productControllers');

productRoutes.route('/').get(getAllProducts);
productRoutes.route('/:id').get(getProduct);

export default productRoutes;