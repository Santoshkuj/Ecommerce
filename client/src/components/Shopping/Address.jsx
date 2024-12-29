import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import CommonForm from "../Common/Form"
import { addressFormControls } from "@/Config/Config"
import { useDispatch, useSelector } from "react-redux"
import { addNewAddress, deleteAddress, editAddress, fetchAllAddress } from "@/store/shop/addressSlice"
import AddressCard from "./AddressCard"
import { useToast } from "@/hooks/use-toast"

const Address = ({setSelecterAddress,selectrdId}) => {
const initialFormData = {
    address : '',
    city:'',
    phone:'',
    pincode:'',
    notes:''
}
const [formData, setFormData] = useState(initialFormData)
const [currentEdiedId,setCurrentEditedId] = useState(null)
const dispatch = useDispatch()
const {user} = useSelector(state => state.auth)
const {toast} = useToast()
const {addressList} = useSelector(state => state.shopAddress)
async function handleManageAddress(e) {
    e.preventDefault()
    if (currentEdiedId !== null) {
        const res = await dispatch(editAddress({
            userId : user?.id,
            addressId : currentEdiedId,
            formData
        }))
        if (res?.payload?.success) {
            dispatch(fetchAllAddress(user?.id))
            setFormData(initialFormData)
            toast({
                title : 'Address updated'
            })
        }
    }else{
    const res = await dispatch(addNewAddress({
        ...formData,
        userId : user?.id
    }))
    if (res?.payload?.success) {
        dispatch(fetchAllAddress(user?.id))
        setFormData(initialFormData)
        toast({
            title : 'Address updated'
        })
    }}
}

function isFormValid() {
    return Object.keys(formData).map(key => 
        formData[key].trim() !== ''
    ).every(item => item)
}

async function handleDeleteAdress(getAddress) {
    const res = await dispatch(deleteAddress({userId :user?.id, addressId: getAddress?._id}))
    if (res.payload.success) {
        dispatch(fetchAllAddress(user?.id))
        toast({
            title : 'Address deleted'
        })
    }
}

function handleEditAdress(getAddress) {
    setCurrentEditedId(getAddress._id)
    setFormData({
        ...formData,
        address : getAddress.address,
        city : getAddress.city,
        phone: getAddress.phone,
        pincode:getAddress.pincode,
        notes:getAddress.notes
    })
}

useEffect(()=>{
    dispatch(fetchAllAddress(user?.id))
},[dispatch])
  return (
    <Card>
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
           {addressList && addressList.length > 0 ?
           addressList.map(address => <AddressCard key={address._id} addressInfo={address}
            selectrdId={selectrdId}
            handleDeleteAdress={handleDeleteAdress}
            handleEditAdress={handleEditAdress}
            setSelecterAddress={setSelecterAddress}/>) : <></>}
        </div>
        <CardHeader>
            <CardTitle>{currentEdiedId !== null ? 'Edit Address' : 'Add New Address'}</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
            <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEdiedId !== null ? 'Edit' : 'Add'}
            onSubmit={handleManageAddress}
            isBtnDisabled={!isFormValid()}/>
        </CardContent>
    </Card>
  )
}
export default Address