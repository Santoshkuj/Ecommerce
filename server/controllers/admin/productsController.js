import { imageUploadUtil } from "../../helpers/cloudinary.js"
import fs from 'fs/promises'
import Products from "../../models/productModel.js";

const handleImageUpload = async (req,res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
              success: false,
              message: 'No file uploaded',
            });
          }
        const result = await imageUploadUtil(req.file.path)
        if (result) {
            fs.rm(`uploads/${req.file.filename}`)
        }

        res.json({
            success : true,
            result
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : 'something went wrong'
        })
    }
}


//add new products
const addProducts = async (req,res) => {
    try {
        const{image,title,description,category,brand,price,salePrice,totalStock} = req.body;

        if (!image || !title || !description || !category || !brand || !salePrice || !totalStock) {
            return res.status(400).json({
                success:false,
                message:'provide all product info.'
            })
        }
        const newProduct = Products({
            image,title,description,category,brand,price,salePrice,totalStock
        })
        await newProduct.save()
        res.status(201).json({
            success:true,
            message:'product added',
            data:newProduct
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'something went wrong'
        })
    }
}

//fetch all products
const fetchAllProducts = async (req,res) => {
    try {
        const productList = await Products.find({})

        res.status(200).json({
            success:true,
            data:productList
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'something went wrong'
        })
    }
}

//edit products
const editProduct = async (req,res) => {
    try {
        const {id} = req.params
        const{image,title,description,category,brand,price,salePrice,totalStock} = req.body;

        const findProduct = await Products.findById(id)
        if (!findProduct) {
            res.status(404).json({
                success:false,
                message: 'Product not found'
            })
        }
        const updatedProduct = await Products.findByIdAndUpdate(
            id, 
            { 
                image: image || findProduct.image, 
                title: title || findProduct.title,
                description: description || findProduct.description, 
                category: category || findProduct.category, 
                brand: brand || findProduct.brand, 
                price: price === '' ? 0 : price || findProduct.price, 
                salePrice: salePrice === '' ? 0 : salePrice || findProduct.salePrice, 
                totalStock: totalStock || findProduct.totalStock 
            }, 
            { new: true }
        );
        res.status(200).json({
            success:true,
            data:updatedProduct
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'something went wrong'
        })
    }
}

//delete products
const deleteProduct = async (req,res) => {
    try {
        const {id} = req.params
        const product = await Products.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({
                success:false,
                message: 'Product not found'
            })
        }
        res.status(200).json({
            success:true,
            message : 'product deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'something went wrong'
        })
    }
}

export  {
    handleImageUpload,
    addProducts,
    fetchAllProducts,
    editProduct,
    deleteProduct
}