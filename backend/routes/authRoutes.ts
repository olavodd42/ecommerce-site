const router = require('express').Router()
const { register, login, getUser, updateUser, deleteUser } = require('../controllers/authControllers')


router.route('/register').post(register)
router.route('/login').post(login)
//router.route('/logout').get(logout)
router.route('/user').get(getUser)
router.route('/user').put(updateUser)
router.route('/user').delete(deleteUser)

module.exports = router