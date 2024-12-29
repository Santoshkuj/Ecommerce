import StarRating from "@/components/Common/StarRating";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setProductDetails } from "@/store/shop/productSlice";
import { addReview, getReview } from "@/store/shop/reviewSlice";
import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductDetailsById = ({ open, setOpen, product, handleAddtoCart }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.shopReview);
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }
  function handleRatingChange(star) {
    setRating(star);
  }
  function handleAddReview() {
    dispatch(
      addReview({
        productId: product?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0)
        setReviewMsg('')
        dispatch(getReview(product?._id));
      }
    });
  }

  const averageReview = reviews && reviews.length > 0 ? reviews.reduce((sum,reviewItem)=> {return sum + reviewItem.reviewValue},0) / reviews.length : 0;

  useEffect(() => {
    if (product !== null) {
      dispatch(getReview(product?._id));
    }
  });

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] bg-slate-200 grid grid-cols-2 gap-8 sm:p-6 lg:p-10 ">
        <div className="relative overflow-hidden rounded-lg">
          <DialogTitle className=""></DialogTitle>
          <img
            src={product?.image}
            alt={product?.title}
            width={600}
            height={600}
            className="aspect-square w-[90%] lg:w-full object-center"
          />
        </div>
        <div>
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold">{product?.title}</h1>
            <p className="text-foreground">{product?.description}</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            {product?.price && (
              <p className="text-3xl font-bold text-slate-600 line-through">
                ${product?.price}
              </p>
            )}
            {product?.salePrice && (
              <p className="text-3xl font-bold ">${product?.salePrice}</p>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
             <StarRating rating={averageReview}/>
            </div>
            <span className="text-muted-foreground">{averageReview.toFixed(1)}</span>
          </div>
          <div className="mt-6">
            {product?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                onClick={() =>
                  handleAddtoCart(product?._id, product?.totalStock)
                }
                className="w-full"
              >
                Add to Cart
              </Button>
            )}
          </div>
          <hr className="h-2  bg-white mt-2" />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-2 lg:mb-4">Reviews</h2>
            <div className="grid gap-2">
              {reviews && reviews.length > 1 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border bg-white">
                      <AvatarFallback>{reviewItem?.userName[0].toUppeerCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRating rating={reviews?.reviewValue}/>
                      </div>
                      <p className="text-foreground">
                        {reviewItem?.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No reviews</h1>
              )}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <StarRating
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                placeholder="write a review"
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
              />
              <Button
                disabled={reviewMsg.trim() === ""}
                onClick={handleAddReview}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ProductDetailsById;
