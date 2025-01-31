const router = require('express').Router()
const { register, login, addFav } = require('../controllers/authControllers')


router.route('/register').post(register)
router.route('/login').post(login)
//router.route('/logout').get(logout)
router.route('/:id/wishlist').patch(addFav);

export default router