import { Button } from "@/components/ui/button";
import {
  Atom,
  BabyIcon,
  BringToFront,
  Candy,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Flower2,
  Hexagon,
  ShirtIcon,
  Target,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import bannerOne from "../../assets/fashion-big-sale-horizontal-banner_2.avif";
import bannerTwo from "../../assets/new-collection-banner-1.avif";
import bannerThree from "../../assets/poster-fashion-sale-is-displayed-store_3.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allShopProducts, getProductDetails } from "@/store/shop/productSlice";
import ShoppingProductCard from "@/components/Shopping/ProductCard";
import { useNavigate } from "react-router-dom";
import ProductDetailsById from "./ProductDetails";
import { addToCart, fetchCartItems } from "@/store/shop/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { getFeatureImages } from "@/store/common/commonSlice";

const ShoppingHome = () => {
  const categories = [
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
  ];

  const brands = [
    { id: "nike", label: "Nike", icon: Hexagon },
    { id: "adidas", label: "Adidas", icon: Target },
    { id: "puma", label: "Puma", icon: Atom },
    { id: "levi", label: "Levi's", icon: Candy },
    { id: "zara", label: "Zara", icon: BringToFront },
    { id: "h&m", label: "H&M", icon: Flower2 },
  ];

  const slides = [bannerOne, bannerTwo, bannerThree];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const { productList,productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const {featureImageList} = useSelector(state=> state.commonFeature)
  const {toast} = useToast()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function navigateTolistingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  }
  function getProductDetail(productId) {
    dispatch(getProductDetails(productId));
  }

  async function handleAddtoCart(getProductId) {
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
    dispatch(
      allShopProducts({ filterParams: {}, sortParams: "price-lowtohigh" })
    )
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featureImageList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(()=>{
    dispatch(getFeatureImages())
  },[])
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0 ? featureImageList.map((slide, index) => (
          <img
            src={slide?.image}
            key={index}
            className={`${
              currentSlide === index ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 h-full w-full object-center transition-opacity duration-1000`}
          />
        )): null}
        <Button
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + featureImageList.length) % featureImageList.length
            )
          }
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev + 1 + featureImageList.length) % featureImageList.length
            )
          }
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Shop by category
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((item) => (
            <Card
              onClick={() => navigateTolistingPage(item, "category")}
              key={item.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <item.icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{item.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Shop by brand</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((item) => (
            <Card
              onClick={() => navigateTolistingPage(item, "brand")}
              key={item.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <item.icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{item.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((item) => (
                  <ShoppingProductCard 
                  key={item._id} 
                  product={item}
                  handleAddtoCart={handleAddtoCart}
                  getProductDetail={getProductDetail} />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsById
        open={openDialog}
        setOpen={setOpenDialog}
        product={productDetails}
        handleAddtoCart={handleAddtoCart}
      />
    </div>
  );
};
export default ShoppingHome;
