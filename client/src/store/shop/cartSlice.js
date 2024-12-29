import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    cartItems : [],
    isloading : false,
}

export const addToCart = createAsyncThunk('cart/addToCart',async({userId,productId,quantity})=>{
    const res = await axios.post('http://localhost:5005/api/shop/cart/add',{userId,productId,quantity})

    return res.data
})
export const fetchCartItems = createAsyncThunk('cart/cartItems',async(userId)=>{
    const res = await axios.get(`http://localhost:5005/api/shop/cart/get/${userId}`)

    return res.data
})
export const deletecartItems = createAsyncThunk('cart/delete',async({userId,productId})=>{
    const res = await axios.delete(`http://localhost:5005/api/shop/cart/delete/${userId}/${productId}`,)
    return res.data
})
export const updateCart = createAsyncThunk('cart/updateCart',async({userId,productId,quantity})=>{
    const res = await axios.put(`http://localhost:5005/api/shop/cart/update-cart`,{userId,productId,quantity})

    return res.data
})

const shoppingCartSlice = createSlice({
    name :'shoppingCart',
    initialState,
    reducers: {},
    extraReducers : (builder)=>{
        builder.addCase(addToCart.pending,(state,action)=>{
            state.isloading = true
        }).addCase(addToCart.fulfilled,(state,action)=>{
            state.isloading = false,
            state.cartItems = action.payload.data
        }).addCase(addToCart.rejected,(state,action)=>{
            state.isloading = false,
            state.cartItems = []
        }
    ).addCase(fetchCartItems.pending,(state,action)=>{
            state.isloading = true
        }).addCase(fetchCartItems.fulfilled,(state,action)=>{
            state.isloading = false,
            state.cartItems = action.payload?.data
        }).addCase(fetchCartItems.rejected,(state,action)=>{
            state.isloading = false,
            state.cartItems = []
        }
    ).addCase(updateCart.pending,(state,action)=>{
            state.isloading = true
        }).addCase(updateCart.fulfilled,(state,action)=>{
            state.isloading = false,
            state.cartItems = action.payload.data
        }).addCase(updateCart.rejected,(state,action)=>{
            state.isloading = false,
            state.cartItems = []
        }
    ).addCase(deletecartItems.pending,(state,action)=>{
        state.isloading = true
        }).addCase(deletecartItems.fulfilled,(state,action)=>{
        state.isloading = false,
        state.cartItems = action.payload.data
        }).addCase(deletecartItems.rejected,(state,action)=>{
        state.isloading = false,
        state.cartItems = []
        })
    }
})

export default shoppingCartSlice.reducer;