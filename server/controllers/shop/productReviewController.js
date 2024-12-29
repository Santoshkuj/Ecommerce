import Order from '../../models/order.js'
import Products from '../../models/productModel.js'
import ProductReview from '../../models/reviewModel.js'

const addProductReview = async (req,res) => {
    try {
        const { productId,userId,userName,reviewMessage,reviewValue} = req.body

        const order = await Order.find({
            userId,
            'cartItems.productId' : productId,
            orderStatus : 'confirmed'
        })
        if (!order) {
            return res.status(403).json({
                success: false,
                message : 'Purchase product to review'
            })
        }
        const checkUserReview = await ProductReview.findOne({
            productId,
            userId
        })
        if (checkUserReview) {
            return res.status(400).json({
                success: false,
                message : 'you already reviewed'
            })
        }
        const review = new ProductReview({
            productId,userId,userName,reviewMessage,reviewValue
        })
        await review.save()
        const reviews = await ProductReview.find({productId})
        const totalReviewLength = reviews.length
        const averageReview = reviews.reduce((sum,reviewItem)=> {return sum + reviewItem.reviewValue},0) / totalReviewLength

        await Products.findByIdAndUpdate(productId,{averageReview})

        res.status(201).json({
            success: true,
            data: review
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : 'Something went wrong'
        })
    }
}

const getProductReview = async (req,res) => {
    try {
        const { productId } = req.body;
        const reviews = await ProductReview.find({productId})

        res.status(200).json({
            success: true,
            data: reviews
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : 'Something went wrong'
        })
    }
}

export{
    addProductReview,
    getProductReview
}