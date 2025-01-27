const protectedRouter = require('express').Router()
const { getUser, updateUser, deleteUser } = require('../controllers/authControllers')

protectedRouter.route('/user').get(getUser)
protectedRouter.route('/user').put(updateUser)
protectedRouter.route('/user').delete(deleteUser)

module.exports = protectedRouter