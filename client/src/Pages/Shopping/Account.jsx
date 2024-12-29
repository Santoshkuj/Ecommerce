import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import accImg from '../../assets/240_F.jpg'
import Address from '@/components/Shopping/address'
import ShoppingOrders from '@/components/Shopping/Orders'
const ShoppingAccount = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[340px] w-full overflow-hidden">
        <img src={accImg} alt="" 
        className="h-full w-full object-center"/>
      </div>
      <div className='container mx-auto grid grid-cols-1 gap-8'>
        <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
          <Tabs defaultValue='orders'>
            <TabsList>
              <TabsTrigger value='orders'>Orders</TabsTrigger>
              <TabsTrigger value='address'>Address</TabsTrigger>
            </TabsList>
            <TabsContent value='orders'>
              <ShoppingOrders/>
            </TabsContent>
            <TabsContent value='address'>
              <Address/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
export default ShoppingAccount