import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

const mongo_uri = process.env.MONGO_URI;

const dbConfig = async function(){
    try {
        const {connection} = await mongoose.connect(mongo_uri)
        if (connection) {
            console.log(`connected to db ${connection.host}`);
        }else{
            console.log('failed to connect db');
            process.exit(1)
        }
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default dbConfig;