import ShoppingProductCard from "@/components/Shopping/ProductCard";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import { getSearchResults, resetSearchResults } from "@/store/shop/searchSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductDetailsById from "./ProductDetails";
import { getProductDetails } from "@/store/shop/productSlice";

const SearchProducts = () => {
    const [keyword,setKeyword] = useState('')
    const [searchParams,setSearchparams] = useSearchParams()
    const [openDialog,setOpenDialog] = useState(false)
    const {searchResults} = useSelector(state => state.shopSearch)
    const {productDetails} = useSelector(state => state.shopProducts)
    const {cartItems} = useSelector(state => state.shopCart)
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const {toast} = useToast()

async function handleAddtoCart(getProductId,getTotalStock) {
    let getCartItem = cartItems.items || [];
    if (getCartItem.length) {
      const itemIndex = getCartItem.findIndex(item => item.productId === getProductId)
      if (itemIndex > -1) {
        const getQuantity = getCartItem[itemIndex].quantity

        if (getQuantity + 1 > getTotalStock) {
          return toast({
            title : `only ${getQuantity} quantity can be added for this item`,
            variant : 'destructive'
          })
        }
      }
    }
    const res = await dispatch(addToCart({userId : user.id,productId: getProductId, quantity : 1}))
    if (res?.payload?.success) {
      dispatch(fetchCartItems(user?.id))
      toast({
        title : 'Product added to cart'
      })
    }
  }

  function getProductDetail(productId) {
    dispatch(getProductDetails(productId));
  }
    useEffect(()=>{
        if (keyword && keyword.trim().length > 2) {
            setTimeout(() => {
                setSearchparams(new URLSearchParams(`?keyword=${keyword}`))
                dispatch(getSearchResults(keyword))
            }, 1000);
        } else {
            setSearchparams(new URLSearchParams(`?keyword=${keyword}`))
            dispatch(resetSearchResults())
        }
    },[keyword])
    useEffect(() => {
        if (productDetails !== null) {
          setOpenDialog(true);
        }
      }, [productDetails]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input 
          className='py-4'
          placeholder = 'searchProducts...'
          value={keyword}
          name='keyword'
          type='text'
          onChange={(event)=> setKeyword(event.target.value)}/>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {keyword === '' ? <h1 className="text-5xl font-extrabold w-[900px]">Search to get Products</h1> : searchResults && searchResults.length?
        searchResults.map(item => <ShoppingProductCard handleAddtoCart={handleAddtoCart} getProductDetail={getProductDetail} product={item}/>) :
        <h1 className="text-5xl font-extrabold w-[900px]">No results found</h1>}
      </div>
      <ProductDetailsById
        open={openDialog}
        setOpen={setOpenDialog}
        product={productDetails}
        handleAddtoCart={handleAddtoCart}
      />
    </div>
  );
};
export default SearchProducts;
