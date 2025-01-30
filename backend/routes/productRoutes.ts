const productRoutes = require('express').Router();
const { getProduct, getFeaturedProducts, getAllProducts } = require('../controllers/productControllers');

productRoutes.route('/featured').get(getFeaturedProducts)
productRoutes.route('/').get(getAllProducts);
productRoutes.route('/:id').get(getProduct);

export default productRoutes;