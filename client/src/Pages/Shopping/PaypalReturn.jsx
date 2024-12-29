import { Card, CardContent } from "@/components/ui/card"
import { verifyPayment } from "@/store/shop/orderSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"

const PaypalReturn = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const paymentId = params.get('paymentId')
    const payerId = params.get('payerId')

    useEffect(()=>{
        if (payerId && paymentId) {
            const orderId = JSON.parse(sessionStorage.getItem('orderId'))
            dispatch(verifyPayment({paymentId,payerId,orderId})).then((data) => {
                if (data?.payload?.success) {
                    sessionStorage.removeItem('orderId')
                    window.location.href = '/shop/payment-success'
                }
            });
        }
    },[payerId,paymentId,dispatch])
  return (
    <Card>
        <CardContent>
            Please wait... payment is processing
        </CardContent>
    </Card>
  )
}
export default PaypalReturn