import ProductImageUpload from "@/components/Admin/ImageUpload"
import AdminProductCard from "@/components/Admin/ProductCard"
import CommonForm from "@/components/Common/Form"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { addProductFormElements } from "@/Config/Config"
import { useToast } from "@/hooks/use-toast"
import { addNewProducts, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/productSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


const AdminProducts = () => {
  const initialFormData ={
    image : '',
    title : '',
    description :'',
    category :'',
    brand :'',
    price : '',
    salePrice : '',
    totalStock :''
  }
  
  const [productDialog,setProductDialog] = useState(false)
  const [imageFile,setImageFile] = useState(null)
  const [uploadedimageUrl,setUploadedimageUrl] = useState('')
  const [imageLoadingState,setImageLoadingState] = useState(false)
  const [currentEditedId,setCurrentEditedId] = useState(null)
  const [formData,setFormData] = useState(initialFormData)
  const {productList} = useSelector(state => state.adminProducts)
  const dispatch  = useDispatch()
  const {toast} = useToast()

  async function onSubmit(e) {
    e.preventDefault()
    if (currentEditedId !== null) {
      const res = await dispatch(editProduct({
        id : currentEditedId,
        formData
      }))
      if (res.payload.success) {
        dispatch(fetchAllProducts())
        setImageFile(null)
        setFormData(initialFormData)
        setProductDialog(false)
        toast({
          title :'Product added'
        })
      }
    } else {
    const res = await dispatch(addNewProducts({...formData,image:uploadedimageUrl}))
    if (res.payload.success) {
      dispatch(fetchAllProducts())
      setImageFile(null)
      setFormData(initialFormData)
      setProductDialog(false)
      toast({
        title :'Product added'
      })
    }}

  }

  async function handleDelete(id) {
    const res = await dispatch(deleteProduct(id))
    if (res?.payload?.success) {
      dispatch(fetchAllProducts())
    }
  }

  function isFormValid() {
    return Object.keys(formData).map((key)=>
      formData[key] !== ''
    ).every(item => item)
  }
  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[dispatch])
  return (
   <>
   <div className="mb-5 flex justify-end w-full">
      <Button onClick={()=>setProductDialog(true)}>
        Add new Product
      </Button>
   </div>
   <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {
        productList && productList.length > 0 ?
        productList.map(productItem => <AdminProductCard key={productItem._id} product={productItem} setCurrentEditedId={setCurrentEditedId} setProductDialog={setProductDialog} setFormData={setFormData}
        handleDelete={handleDelete}/>) : null
      }
   </div>
      <Sheet open={productDialog} onOpenChange={()=>{
        setProductDialog(false)
        setFormData(initialFormData)
        setImageFile(null)
        setCurrentEditedId(null)}}>
      <SheetContent side='right' className='overflow-auto'>
        <SheetHeader>
          <SheetTitle>{currentEditedId === null ? 'Add New Product': 'Edit product'}</SheetTitle>
        </SheetHeader>
        <ProductImageUpload file={imageFile} setFile={setImageFile} uploadedImage={uploadedimageUrl} setUploadedImage={setUploadedimageUrl} setImageLoadingState={setImageLoadingState} imageLoadingState={imageLoadingState} isEditMode={currentEditedId !== null} setFormData={setFormData}/>
        
          <div className="py-6">
            <CommonForm formData={formData} setFormData={setFormData} formControls={addProductFormElements} buttonText={currentEditedId === null ?'Add' : 'Edit'} onSubmit={onSubmit} isBtnDisabled = {!isFormValid()}/>
          </div>
      </SheetContent>
      </Sheet>
   </>
  )
}
export default AdminProducts