const router = require('express').Router()
const { register, login } = require('../controllers/authControllers')


router.route('/register').post(register)
router.route('/login').post(login)
//router.route('/logout').get(logout)


export default router