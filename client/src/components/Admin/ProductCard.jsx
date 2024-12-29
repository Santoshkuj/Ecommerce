import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"

const AdminProductCard = ({product,setCurrentEditedId,setProductDialog,setFormData,handleDelete}) => {
  return (
    <Card className='md:w-full max-w-sm mx-auto'>
        <div>
            <div className="relative">
                <img src={product?.image} alt={product?.title} className="w-full h-[300px] object-center rounded-t-lg"/>
            </div>
            <CardContent>
                <h2 className="text-xl font-bold mt-2 mb-2">
                    {product?.title}
                </h2>
                <div className="flex justify-between items-center mb-2">
                    {product?.price > 0 ?
                    <span className="line-through text-lg font-bold text-primary">${product?.price}</span> : <></>
                    }
                    <span className="text-lg font-bold">${product?.salePrice}</span>
                </div>
            </CardContent>
            <CardFooter className='flex justify-between items-center'>
                <Button onClick={()=>{
                    setProductDialog(true)
                    setCurrentEditedId(product?._id)
                    setFormData(product)
                    }}>Edit</Button>
                <Button onClick={()=>handleDelete(product?._id)}>Delete</Button>
            </CardFooter>
        </div>
    </Card>
  )
}
export default AdminProductCard