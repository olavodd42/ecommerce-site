const productRouter = require('express').Router();
const { createProduct, updateProduct, deleteProduct } = require('../controllers/productControllers');

productRouter.route('/').post(createProduct);
productRouter.route('/:id').put(updateProduct).delete(deleteProduct);

module.exports = productRouter;