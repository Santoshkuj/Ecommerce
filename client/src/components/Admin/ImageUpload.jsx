import { useEffect, useRef } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react"
import { Button } from "../ui/button"
import axios from "axios"
import { Skeleton } from "../ui/skeleton"

const ProductImageUpload = ({file,setFile,setUploadedImage,setImageLoadingState,imageLoadingState,isEditMode,setFormData}) => {

    const inputRef = useRef(null)

    function handleImageFileChange(e) {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile)
        }
    }
    function handleDragOver(e) {
        e.preventDefault();
    }
    function handleDrop(e) {
        e.preventDefault()
        const droppedFiles = e.dataTransfer.files?.[0]
        if (droppedFiles) {
            setFile(droppedFiles)
        }
    }
    function handleRemoveImage() {
        setFile(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    async function uploadedImageToCloudinary() {
        setImageLoadingState(true)
        const formData = new FormData()
        formData.append('my_file',file)
        const res = await axios.post('http://localhost:5005/api/admin/products/upload-image',formData)
        if (res?.data?.success) {
            setFormData(data=>({
                ...data,
                image : res.data.result?.url}
            ))
            setUploadedImage(res.data.result?.url)
            setImageLoadingState(false)
        }
    }
    useEffect(()=>{
        if (file !== null) {
            uploadedImageToCloudinary()
        }
    },[file])
  return (
    <div className="w-full max-w-md mx-auto mt-4">
        <Label className='text-lg font-semibold mb-2 block'>
            Upload Image
        </Label>
        <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-white/60 border-dashed rounded-lg p-4">
            <Input id='image-upload' type='file' className='hidden' ref={inputRef} onChange={handleImageFileChange} disabled={isEditMode}/>
        {
            !file ?(
            <Label htmlFor='image-upload' className={`${isEditMode ? 'cursor-not-allowed': ''} flex flex-col items-center h-32 cursor-pointer`}>
                <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
                <span>Drag & drop or click to upload</span>
            </Label>
            ):( 
            imageLoadingState ?
            <Skeleton className='h-10 bg-gray-400'/> :
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <FileIcon className="w-7 h-7 text-primary mr-2"/>
                </div>
                <p className="text-sm font-medium">{file.name}</p>
                <Button variant='ghost' size='icon' className='text-muted-foreground hover:text-foreground' onClick={handleRemoveImage}>
                    <XIcon className="w-4 h-4"/>
                    <span className="sr-only">Remove File</span>
                </Button>
            </div>)
        }
        </div>
    </div>
  )
}
export default ProductImageUpload