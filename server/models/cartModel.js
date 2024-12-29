import {Schema,model} from 'mongoose'

const cartSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    items : [
        {
            productId : {
                type : Schema.Types.ObjectId,
                ref : 'products',
                required : true
            },
            quantity : {
                type : Number,
                required: true,
                min : 1
            }
        }
    ]
},{
    timestamps:true
})

const Cart = model('cart',cartSchema)
export default Cart