import Address from "@/components/Shopping/Address";
import img from "../../assets/240_F.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartContent from "@/components/Shopping/CartContent";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createOrder } from "@/store/shop/orderSlice";
import { useToast } from "@/hooks/use-toast";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { approvalURL } = useSelector(state => state.shopOrder)
  const { user } = useSelector((state) => state.auth);
  const [selectedAddress,setSelecterAddress] = useState(null)
  const [ispaymentInit,setIspaymentInit] = useState(false)
  const {toast} = useToast()
  const dispatch = useDispatch()

  const totalCartAmount =
    cartItems && cartItems.items?.length > 0
      ? cartItems.items.reduce(
          (sum, currentitem) =>
            sum +
            (currentitem?.salePrice > 0
              ? currentitem?.salePrice
              : currentitem?.price) *
              currentitem?.quantity,
          0
        )
      : 0;

  async function handleInitiatePayment() {
    if (cartItems.length === 0) {
      return toast({
        title : 'Your cart is empty. Add item to proceed',
        variant : 'destructive'
      })
    }
    if (selectedAddress === null) {
      return toast({
        title : 'Select one address to proceed',
        variant : 'destructive'
      })
    }
    const orderData = {
      userId : user?.id,
      cartId : cartItems?._id,
      cartItems : cartItems.items.map(item =>({
        productId : item?.productId,
        title : item?.title,
        image : item?.image,
        price : item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity : item?.quantity
      })),
      addressInfo:{
        addressId : selectedAddress?._id,
        address : selectedAddress?.address,
        city : selectedAddress?.city,
        pincode : selectedAddress?.pincode,
        phone : selectedAddress?.phone,
        notes : selectedAddress?.notes
      },
      orderStatus: 'pending',
      paymentMethod : 'paypal',
      paymentStatus : 'pending',
      totalAmount : totalCartAmount,
      orderDate : new Date(),
      orderUpdateDate : new Date(),
      paymentId :'',
      payerId : '',
    };
    // const res = await dispatch(createOrder(orderData))
    // if (res.payload.success) {
    //   setIspaymentInit(true)
    // }
  }
  if (approvalURL) {
    window.location.href = approvalURL
  }
  return (
    <div className="flex flex-col">
      <div className="relative h-[250px] w-full overflow-hidden">
        <img src={img} alt="" className="h-full w-full object-center" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5 p-5">
        <Address setSelecterAddress={setSelecterAddress} selectrdId={selectedAddress}/>
        <div className="flex flex-col gap-4">
          {cartItems && cartItems?.items?.length > 0 ? (
            cartItems.items.map((item) => (
              <UserCartContent key={item.productId} cartItem={item} />
            ))
          ) : (
            <></>
          )}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              {totalCartAmount > 0 && (
                <span className="font-bold pr-2">${totalCartAmount}</span>
              )}
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePayment} className="mt-4 w-full">
              {ispaymentInit ? 'Processing payment...' : 'Check-out'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCheckout;
