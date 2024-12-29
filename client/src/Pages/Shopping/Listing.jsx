import ProductFilter from "@/components/Shopping/Filter";
import ShoppingProductCard from "@/components/Shopping/ProductCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/Config/Config";
import { allShopProducts, getProductDetails } from "@/store/shop/productSlice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductDetailsById from "@/Pages/Shopping/ProductDetails";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import { useToast } from "@/hooks/use-toast";

const ShoppingListing = () => {
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector(
    (state) => state.auth
  );
  const {cartItems} = useSelector(state => state.shopCart)
  const [searchParams, setSearchParams] = useSearchParams("");
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const {toast} = useToast()
  const dispatch = useDispatch();
  const category = searchParams.get('category')

  function handleSort(value) {
    setSort(value);
  }

  function createSrarchParams(filterparams) {
    const queryParams = [];
    for (const [key, value] of Object.entries(filterparams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
      }
    }
    return queryParams.join("&");
  }

  function handleFilter(sectionId, currentOption) {
    let filterCopy = { ...filter };
    const indexOfSection = Object.keys(filterCopy).indexOf(sectionId);
    if (indexOfSection === -1) {
      filterCopy = {
        ...filterCopy,
        [sectionId]: [currentOption],
      };
    } else {
      const indexOfCurrentOption = filterCopy[sectionId].indexOf(currentOption);
      if (indexOfCurrentOption === -1) {
        filterCopy[sectionId].push(currentOption);
      } else {
        filterCopy[sectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilter(filterCopy);
    sessionStorage.setItem("filters", JSON.stringify(filterCopy));
  }

  function getProductDetail(productId) {
    dispatch(getProductDetails(productId));
  }

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
  useEffect(() => {
    if (productDetails !== null) {
      setOpenDialog(true);
    }
  }, [productDetails]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilter(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [category]);

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQueryString = createSrarchParams(filter);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filter]);

  useEffect(() => {
    if (sort !== null && filter !== null) {
      dispatch(allShopProducts({ filterParams: filter, sortParams: sort }));
    }
  }, [dispatch, sort, filter]);
  return (
    <div className="grid grid-cols-[150px_1fr] lg:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filter} handleFilter={handleFilter} />
      <div className="bg-backgroung w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex gap-3 items-center">
            <span className="text-muted-foreground">
              {productList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex items-center gap-1"
                  variant="outline"
                  size="sm"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  SortBy
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem value={item.id} key={item.id}>
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0 ? (
            productList.map((product) => (
              <ShoppingProductCard
                handleAddtoCart={handleAddtoCart}
                product={product}
                key={product._id}
                getProductDetail={getProductDetail}
              />
            ))
          ) : (
            <></>
          )}
        </div>
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
export default ShoppingListing;
