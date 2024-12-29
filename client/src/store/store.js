import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice/authSlice"
import adminProductReducer from './admin/productSlice'
import adminOrderReducer from './admin/orderSlice'
import  shopProductReducre  from "./shop/productSlice";
import  shopCartReducre  from "./shop/cartSlice";
import  shopAddressReducer  from "./shop/addressSlice";
import  shopOrderReducer  from "./shop/orderSlice";
import  shopSearchReducer  from "./shop/searchSlice";
import  shopReviewReducer  from "./shop/reviewSlice";
import  commonFeatureReducer  from "./common/commonSlice";


const store = configureStore({
    reducer : {
        auth: authReducer,
        adminProducts : adminProductReducer,
        adminOrder : adminOrderReducer,
        shopProducts : shopProductReducre,
        shopCart : shopCartReducre,
        shopAddress : shopAddressReducer,
        shopOrder : shopOrderReducer,
        shopSearch : shopSearchReducer,
        shopReview : shopReviewReducer,
        commonFeature : commonFeatureReducer
    }
})

export default store;