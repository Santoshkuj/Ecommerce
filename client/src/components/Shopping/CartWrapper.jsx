import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button"
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"
import UserCartContent from "./CartContent"

const UserCartWrapper = ({cartItems,setOpenCartSheet}) => {

    const totalCartAmount = cartItems && cartItems.items?.length > 0 ? cartItems.items.reduce((sum,currentitem)=> sum + (
        currentitem?.salePrice > 0 ? currentitem?.salePrice : currentitem?.price
    )* currentitem?.quantity,
    0) : 0;
    const navigate = useNavigate()
  return (
    <SheetContent className='sm:max-w-md'>
        <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
            {
                cartItems && cartItems.items && cartItems.items.length > 0 ?
                cartItems.items.map(item => <UserCartContent key={item.productId} cartItem={item}/>) : null
            }
        </div>
        <div className="mt-8 space-y-4">
            <div className="flex justify-between">
                <span className="font-bold">Total</span>
                {totalCartAmount > 0 &&
                <span className="font-bold">${totalCartAmount}</span>
                }
            </div>
        </div>
        <Button className='w-full mt-5' onClick={()=>{
            navigate('/shop/checkout')
            setOpenCartSheet(false)
            }}>
            CheckOut
        </Button>
    </SheetContent>
  )
}
export default UserCartWrapper