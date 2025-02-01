const cartRouter = require('express').Router();
const { getCart, addItem, updateItem, deleteItem, deleteCart } = require('../controllers/cartControllers');

cartRouter.route('/').get(getCart).delete(deleteCart);
cartRouter.route('/items').post(addItem);
cartRouter.route('/items/:id').patch(updateItem).delete(deleteItem);

export default cartRouter;