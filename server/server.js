import express from 'express';
import dotenv from 'dotenv'
import dbConfig from './dbConfig/dbConfig.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRouter from './routes/auth/authRoute.js'
import adminProductRouter from './routes/admin/productRoute.js'
import adminOrderRouter from './routes/admin/orderRoute.js'
import shopProductRouter from './routes/shop/productRoute.js'
import shopCartRouter from './routes/shop/cartRoute.js'
import shopAdressRouter from './routes/shop/addressRoute.js'
import shopOrderRouter from './routes/shop/orderRoute.js'
import shopSearchRouter from './routes/shop/searchRoute.js'
import shopReviewRouter from './routes/shop/reviewRoute.js'
import commonFeatureRouter from './routes/common/featureRoute.js'

dotenv.config()


const app = express()
const PORT = process.env.PORT || 5005;
dbConfig()
app.use(cors({
    origin : process.env.CLIENT_URL,
    allowedHeaders : [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth',authRouter)
app.use('/api/admin/products',adminProductRouter)
app.use('/api/admin/orders',adminOrderRouter)
app.use('/api/shop/products',shopProductRouter)
app.use('/api/shop/cart',shopCartRouter)
app.use('/api/shop/address',shopAdressRouter)
app.use('/api/shop/orders',shopOrderRouter)
app.use('/api/shop/search',shopSearchRouter)
app.use('/api/shop/review',shopReviewRouter)
app.use('/api/common/feature',commonFeatureRouter)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})