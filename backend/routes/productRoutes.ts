const productRoutes = require('express').Router();
const { getProduct, getFeaturedProducts, getAllProducts, searchProduct } = require('../controllers/productControllers');

productRoutes.route('/featured').get(getFeaturedProducts)
productRoutes.route('/search').get(searchProduct)
productRoutes.route('/').get(getAllProducts);
productRoutes.route('/:id').get(getProduct);

export default productRoutes;