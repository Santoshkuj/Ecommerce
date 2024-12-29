import {Router} from 'express'
import { login, register,logout,authMiddlewear } from '../../controllers/auth/authController.js'


const router = Router()

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
router.get('/check-auth',authMiddlewear,(req,res)=>{
    const user = req.user

    res.status(200).json({
        success : true,
        message : 'Authenticated user',
        user
    })
})


export default router