import mongoose from 'mongoose'

const feature = new mongoose.Schema({
    image : String
},{timestamps: true})

export default mongoose.model('features',feature)