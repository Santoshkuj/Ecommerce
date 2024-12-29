import {Router} from 'express'
import { getAllOrdersOfusers, getOrdersDetailsForAdmin, updateOrderStatus } from '../../controllers/admin/orderController.js'

const router = Router()

router.get('/get',getAllOrdersOfusers)
router.get('/details/:id',getOrdersDetailsForAdmin)
router.put('/update/:id',updateOrderStatus)

export default router;