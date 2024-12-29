import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

export const PaymentSuccess = () => {
  const navigate = useNavigate()
  return (
    <Card className='p-10'>
      <CardHeader>
        <CardTitle className='text-4xl'>Payment is Successfyll</CardTitle>
      </CardHeader>
      <Button onClick={()=>navigate('/shop/account')} className='mt-5'>View Orders</Button>
    </Card>
  )
}

export default PaymentSuccess