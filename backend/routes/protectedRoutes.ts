const protectedRouter = require('express').Router()
const { getUser, getAllUsers, updateUser, deleteUser } = require('../controllers/authControllers')

protectedRouter.route('/users').get(getAllUsers)
// protectedRouter.route('/users/:id').get(getUser).put(updateUser).delete(deleteUser)
protectedRouter.route('/me').get(getUser).put(updateUser).delete(deleteUser);

export default protectedRouter