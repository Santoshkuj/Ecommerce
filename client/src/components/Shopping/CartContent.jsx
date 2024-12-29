import { Minus, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { deletecartItems, updateCart } from "@/store/shop/cartSlice"
import { useToast } from "@/hooks/use-toast"

const UserCartContent = ({cartItem}) => {
    const {user} = useSelector(state => state.auth)
    const {cartItems} = useSelector(state => state.shopCart)
    const {productList} = useSelector(state => state.shopProducts)
    const dispatch = useDispatch()
    const {toast} = useToast()
    async function handleDeletecartItems(productId) {
        const res = await dispatch(deletecartItems({userId :user.id, productId}))
        if (res?.payload?.success) {
            toast({
                title : 'Cart item deleted'
            })
        }
    }

    async function handleUpdateQuantity(getCartItem,typeOfAction) {
        if (typeOfAction === 'plus') {
            let getCartItems = cartItems.items || [];
        if (getCartItems.length) {
            const cartItemIndex = getCartItems.findIndex(item => item.productId === getCartItem?.productId)

            const productItemIndex = productList.findIndex(item => item._id === getCartItem?.productId)

            const getTotalStock = productList[productItemIndex].totalStock
        if (cartItemIndex > -1) {
            const getQuantity = getCartItems[cartItemIndex].quantity

        if (getQuantity + 1 > getTotalStock) {
          return toast({
            title : `only ${getQuantity} quantity can be added for this item`,
            variant : 'destructive'
          })
        }
      }}
        }
        const res = await dispatch(updateCart({userId : user.id,productId: getCartItem?.productId, quantity : typeOfAction === 'plus' ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1}))
        if (res?.payload?.success) {
            toast({
                title : 'Cart item updated'
            })
        }
    }
  return (
    <div className="flex items-center space-x-4">
        <img src={cartItem?.image} alt={cartItem?.title} className="w-20 h-20 rounded object-cover"/>
        <div className="flex-1">
            <h3 className="font-extrabold">
                {cartItem?.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
                <Button disabled={cartItem?.quantity === 1} onClick={()=>handleUpdateQuantity(cartItem,'minus')} variant='outline' size='icon' className='h-8 w-8 rounded-full border-red-500'>
                    <Minus className="w-4 h-4"/>
                    <span className="sr-only">Decrease</span>
                </Button>
                <span className="font-semibold">{cartItem?.quantity}</span>
                <Button onClick={()=>handleUpdateQuantity(cartItem,'plus')} variant='outline' size='icon' className='h-8 w-8 rounded-full border-green-700'>
                    <Plus className="w-4 h-4"/>
                    <span className="sr-only">Decrease</span>
                </Button>
            </div>
        </div>
        <div className="flex flex-col items-end  pr-2">
            <p className="font-semibold">
                ${(cartItem?.salePrice >0 ? cartItem?.salePrice : cartItem?.price * cartItem?.quantity).toFixed(2)}
            </p>
            <Trash onClick={()=>handleDeletecartItems(cartItem?.productId)} className="cursor-pointer mt-1" size={20}/>
        </div>
    </div>
  )
}
export default UserCartContent