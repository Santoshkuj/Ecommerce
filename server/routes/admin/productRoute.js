import { Router } from "express";
import { upload } from "../../helpers/cloudinary.js";
import  { handleImageUpload,addProducts, deleteProduct, editProduct, fetchAllProducts } from "../../controllers/admin/productsController.js";

const router = Router()

router.post('/upload-image',upload.single('my_file'),handleImageUpload)
router.post('/add',addProducts)
router.put('/edit/:id',editProduct)
router.delete('/delete/:id',deleteProduct)
router.get('/get',fetchAllProducts)

export default router;