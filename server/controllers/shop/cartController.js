import Cart from '../../models/cartModel.js';
import Products from '../../models/productModel.js'
import User from '../../models/userModel.js'

const addToCart = async (req,res) => {
    try {
        const {userId,productId,quantity} = req.body;
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success : false,
                message : 'Provide all required data'
            })
        }
        const product = await Products.findById(productId)
        if (!product) {
            return res.status(404).json({
                success : false,
                message : 'product not found try-again'
            })
        } 
        let cart = await Cart.findOne({userId})

        if (!cart) {
            cart = new Cart({userId, items:[]})
        }
        const findProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)
        if (findProductIndex === -1) {
            cart.items.push({productId,quantity})
        } else {
            cart.items[findProductIndex].quantity += quantity
        }

        await cart.save()
        res.status(200).json({
            success : true,
            data : cart
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Something went wrong'
        })
    }
}
const fetchCartItems = async (req,res) => {
    try {
        const {userId} = req.params
        if (!userId) {
            return res.status(400).json({
                success : false,
                message : 'UserId is required!'
            })
        }
        const cart = await Cart.findOne({userId}).populate({
            path : 'items.productId',
            select : 'image title price salePrice'
        })
        if (!cart) {
            return res.status(404).json({
                success : false,
                message : 'Cart not found'
            })
        }
        const validItems = cart.items.filter(productItem => productItem.productId)
        if (validItems.length < cart.items.length) {
            cart.items = validItems
            await cart.save()
        }

        const populateCartItems = cart.items.map(item =>({
            productId : item.productId ? item.productId._id : null,
            image : item.productId ? item.productId.image : null,
            title : item.productId ? item.productId.title :'Product not found',
            price : item.productId ? item.productId.price :null,
            salePrice : item.productId ? item.productId.salePrice : null,
            quantity : item.quantity ? item.quantity : null,
        }))
       
        res.status(200).json({
            success : true,
            data : {
                ...cart._doc,
                items : populateCartItems
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : 'Something went wrong'
        })
    }
}
const updataCartItems = async (req,res) => {
    try {
        const {userId,productId,quantity} = req.body;

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success : false,
                message : 'Provide all required data'
            })
        }
        let cart = await Cart.findOne({userId})
        if (!cart) {
            return res.status(400).json({
                success : false,
                message : 'Cart not found'
            })
        }
        const findProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)

        if (findProductIndex === -1) {
            return res.status(400).json({
                success : false,
                message : 'Cart item not present'
            })
        }
        cart.items[findProductIndex].quantity = quantity
        await cart.save()

        await cart.populate({
            path : 'items.productId',
            select : 'image title price salePrice'
        })
        const populateCartItems = cart.items.map(item =>({
            productId : item.productId ? item.productId._id : null,
            image : item.productId ? item.productId.image : null,
            title : item.productId ? item.productId.title :'Product not found',
            price : item.productId ? item.productId.price :null,
            salePrice : item.productId ? item.productId.salePrice : null,
            quantity : item.quantity ? item.quantity : null,
        }))

        res.status(200).json({
            success : true,
            data : {
                ...cart._doc,
                items : populateCartItems
            }
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Something went wrong'
        })
    }
}
const deleteCartItems = async (req,res) => {
    try {
        const {userId, productId} = req.params

        if (!userId || !productId) {
            return res.status(400).json({
                success : false,
                message : 'Provide all required data'
            })
        }
        const cart = await Cart.findOne({userId}).populate({
            path : 'items.productId',
            select : 'image title price salePrice'
        })

        if (!cart) {
            return res.status(400).json({
                success : false,
                message : 'Cart not found'
            })
        }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId)
        await cart.save()

        const populateCartItems = cart.items.map(item =>({
            productId : item.productId ? item.productId._id : null,
            image : item.productId ? item.productId.image : null,
            title : item.productId ? item.productId.title :'Product not found',
            price : item.productId ? item.productId.price :null,
            salePrice : item.productId ? item.productId.salePrice : null,
            quantity : item.quantity ? item.quantity : null,
        }))
        res.status(200).json({
            success : true,
            data : {
                ...cart._doc,
                items : populateCartItems
            }
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'Something went wrong'
        })
    }
}

export {
    fetchCartItems,
    addToCart,
    updataCartItems,
    deleteCartItems
}