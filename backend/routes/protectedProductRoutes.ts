const productRouter = require('express').Router();
const { createProduct, updateProduct, deleteProduct } = require('../controllers/productControllers');
const upload = require('../config/multer');

productRouter.post('/', upload.single('image'), createProduct);
productRouter.route('/:id').put(updateProduct).delete(deleteProduct);

export default productRouter;