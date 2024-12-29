import { Schema,model } from 'mongoose'

const orderSchema = new Schema({
    userId:String,
    cartId : String,
    cartItems : [
        {
            productId : String,
            title : String,
            image : String,
            price : String,
            quantity : Number
        }
    ],
    addressInfo : {
        addressId : String,
        address : String,
        city : String,
        pincode : Number,
        phone : Number,
        notes :String
    },
    orderStatus : String,
    paymentMethod : String,
    paymentStatus : String,
    totalAmount : Number,
    orderDate : Date,
    orderUpdateDate : Date,
    paymentId : String,
    payerId : String
})

export default model('orders',orderSchema)