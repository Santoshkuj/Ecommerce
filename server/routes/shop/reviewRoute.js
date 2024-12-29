import {Router} from 'express'
import { addProductReview, getProductReview } from '../../controllers/shop/productReviewController.js'

const router = Router()

router.post('/add',addProductReview)
router.get('/get',getProductReview)

export default router