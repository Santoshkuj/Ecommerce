import {Router} from 'express'
import { createOrder, getAllOrdersByuser, getOrdersDetails, verifyPayment } from '../../controllers/shop/orderController.js'


const router = Router()

router.post('/create',createOrder)
router.post('/verify',verifyPayment)
router.get('/list/:userId',getOrdersDetails)
router.get('/verify/:Id',getAllOrdersByuser)

export default router;