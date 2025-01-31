const protectedRouter = require('express').Router()
const { getUser, getAllUsers, updateUser, deleteUser, addFav, wishlist } = require('../controllers/authControllers')

protectedRouter.route('/users').get(getAllUsers)
// protectedRouter.route('/users/:id').get(getUser).put(updateUser).delete(deleteUser)
protectedRouter.route('/me').get(getUser).put(updateUser).delete(deleteUser);
// Nas rotas de usuário
protectedRouter.route('/:userId/wishlist/:productId').patch(addFav);
protectedRouter.route('/:userId/wishlist/').get(wishlist);

export default protectedRouter