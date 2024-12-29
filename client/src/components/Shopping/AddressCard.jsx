import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Label } from "../ui/label"


const AddressCard = ({addressInfo,handleDeleteAdress,handleEditAdress,setSelecterAddress,selectrdId}) => {
  return (
    <Card onClick={setSelecterAddress ?()=>setSelecterAddress(addressInfo):null} className={`cursor-pointer  ${selectrdId?._id === addressInfo?._id ? 'border-4 border-green-500' : 'border-black'}`}>
        <CardContent className={'grid gap-4 pt-4'}>
            <Label>Address: {addressInfo?.address}</Label>
            <Label>City: {addressInfo?.city}</Label>
            <Label>Pincode: {addressInfo?.pincode}</Label>
            <Label>Phone: {addressInfo?.phone}</Label>
            <Label>Notes: {addressInfo?.notes}</Label>
        </CardContent>
        <CardFooter className='flex justify-between'>
            <Button onClick={()=>handleEditAdress(addressInfo)}>Edit</Button>
            <Button onClick={()=>handleDeleteAdress(addressInfo)}>Delete</Button>
        </CardFooter>
    </Card>
  )
}
export default AddressCard