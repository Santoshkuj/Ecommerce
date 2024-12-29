import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    productList : [],
    productDetails : null
}


export const getProductDetails = createAsyncThunk('/products/fetchProductDetails',async (id)=>{
    const response = await axios.get(`http://localhost:5005/api/shop/products/get/${id}`)
    return response?.data
})
export const allShopProducts = createAsyncThunk('/products/fetchshopproducts',async ({filterParams,sortParams})=>{

    const query = new URLSearchParams({
        ...filterParams,
        sortBy:sortParams
    })
    const response = await axios.get(`http://localhost:5005/api/shop/products/get?${query}`)
    return response?.data?.products
})
const shopProductSlice = createSlice({
    name : 'shoppingProducts',
    initialState,
    reducers: {
        setProductDetails:(state,action)=>{
            state.productDetails = null
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(allShopProducts.pending,(state,action)=>{
            state.isLoading = true;
        }).addCase(allShopProducts.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.productList = action.payload
        }).addCase(allShopProducts.rejected,(state,action)=>{
            state.isLoading = false;
            state.productList = []
        }
        ).addCase(getProductDetails.pending,(state,action)=>{
            state.isLoading = true;
        }).addCase(getProductDetails.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.productDetails = action?.payload?.data
        }).addCase(getProductDetails.rejected,(state,action)=>{
            state.isLoading = false;
            state.productDetails = null
        })
    }
})
export const {setProductDetails} = shopProductSlice.actions;
export default shopProductSlice.reducer;