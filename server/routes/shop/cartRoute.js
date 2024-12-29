import {Router} from 'express'
import { addToCart,deleteCartItems,fetchCartItems,updataCartItems } from '../../controllers/shop/cartController.js'

const router = Router()

router.post('/add',addToCart)
router.get('/get/:userId',fetchCartItems)
router.put('/update-cart',updataCartItems)
router.delete('/delete/:userId/:productId',deleteCartItems)

export default router