import {Schema, model} from 'mongoose'


const userSchema = new Schema({
    userName :{
        type : String,
        required : true,
        unique : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true,
    },
    role :{
        type : String,
        default : 'user'
    }
})

const User = model('user',userSchema)
export default User;