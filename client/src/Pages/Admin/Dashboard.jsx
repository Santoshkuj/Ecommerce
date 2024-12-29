import ProductImageUpload from "@/components/Admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { addFeatureImages, getFeatureImages } from "@/store/common/commonSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState('');
  const [uploadedimageUrl, setUploadedimageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const {featureImageList} = useSelector(state=> state.commonFeature)
  const dispatch = useDispatch()

  function handleUploadImage() {
    dispatch(addFeatureImages(uploadedimageUrl)).then((data)=>{
      if (data?.payload?.success) {
        dispatch(getFeatureImages())
        setImageFile(null)
        setUploadedimageUrl('')
      }
    })
  }
  useEffect(()=>{
    dispatch(getFeatureImages())
  },[])
  return (
    <div>
      <ProductImageUpload
        file={imageFile}
        setFile={setImageFile}
        uploadedImage={uploadedimageUrl}
        setUploadedImage={setUploadedimageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        // isEditMode={currentEditedId !== null}
        setFormData={setFormData}
      />
      <Button onClick={handleUploadImage} className='w-full'>Upload</Button>
      <div className="flex flex-wrap gap-5">
        {
          featureImageList && featureImageList.length > 0 ?
          featureImageList.map(img => <div>
            <img className="w-[300px] h-[300px]" src={img.image} alt="" />
          </div>) : <></>
        }
        </div>
    </div>
  );
};
export default AdminDashboard;
