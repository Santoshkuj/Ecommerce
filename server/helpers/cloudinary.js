import {v2 as cloudinary} from 'cloudinary'
import multer from 'multer'
import path from 'path'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file,{
        resource_type :'auto',
        folder : 'Gangnam'
    })
    return result;
}

const upload = multer({

    dest: 'uploads/',
    limits: 1024*1024*10,
    storage : multer.diskStorage({
        destination : 'uploads/',
        filename : (req,file,cb)=>{
            cb(null,Date.now()+file.originalname)
        }
    }),
    fileFilter:(req,file,cb)=>{
        const fileType = /jpeg|jpg|png|svg/
        const extname = fileType.test(path.extname(file.originalname).toLowerCase())

        if (!extname) {
            return (
                cb(new Error('unsupported file type'),false)
            )
        }
        cb(null,true)
    }
})

export {
    upload,imageUploadUtil
}