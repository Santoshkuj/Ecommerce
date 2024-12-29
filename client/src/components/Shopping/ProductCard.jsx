import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"

const ShoppingProductCard = ({product,getProductDetail,handleAddtoCart}) => {
    String.prototype.toCapitalise = function() {
        return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
      };
      
  return (
    <Card className='w-56 sm:w-full max-w-[300px] mx-auto'>
        <div onClick={()=>getProductDetail(product?._id)}>
            <div className="relative">
                <img src={product?.image}
                alt={product?.title} 
                className="w-full h-56 sm:min-h-60 lg:min-h-[320px] lg:max-h-80 object-center rounded-t-lg"/>
            {
                product?.totalStock === 0 ?
                <Badge className='absolute top-2 left-1 lg:left-2 bg-red-500 hover:bg-red-600'>
                    Out of stock
                </Badge> :
                 product?.totalStock <= 10 ?
                 <Badge className='absolute top-2 left-1 lg:left-2 bg-red-500 hover:bg-red-600'>
                    {`Only ${product?.totalStock} left`}
                </Badge>:
                product?.salePrice > 0 ?
                <Badge className='absolute top-2 left-1 lg:left-2 bg-red-500 hover:bg-red-600'>
                    Sale
                </Badge> : null
            }
            </div>
        </div>
        <CardContent className='p-4'>
            <h2 className="text-xl font-bold mb-1 md:mb-2">
                {product?.title}
            </h2>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">{product?.category.toCapitalise()}</span>
                <span className="text-sm text-muted-foreground">{product?.brand.toCapitalise()}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
                <span className={`${product?.price >0 ? 'line-through':''} text-lg text-primary font-semibold`}>${product?.price}</span>
                {
                    product.salePrice > 0 ? <span className="text-lg text-primary font-semibold">${product?.salePrice}</span> : null
                }
            </div>
        </CardContent>
        <CardFooter>
            {
            product?.totalStock === 0 ?
                <Button className='w-[90%] lg:w-full opacity-60 cursor-not-allowed' >
                Out Of Stock
                </Button> :
                <Button onClick={()=>handleAddtoCart(product?._id,product?.totalStock)} className='w-[90%] lg:w-full' >
                Add to Cart
                </Button>
            }
        </CardFooter>
    </Card>
    
  )
}
export default ShoppingProductCard