import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    approvalUrl : null,
    isLoading : false,
    orderId : null,
    orderList : [],
    orderDetails : null
}

export const createOrder = createAsyncThunk('/order/createorder',async(orderData)=>{
    const res = await axios.post('http://localhost:5005/api/shop/order/create',orderData)

    return res.data
})
export const verifyPayment = createAsyncThunk('/order/verifyPayment',async({paymentId,payerId,orderId})=>{
    const res = await axios.post('http://localhost:5005/api/shop/order/verify',{paymentId,payerId,orderId})

    return res.data
})
export const getAllOrdersByuser = createAsyncThunk('/order/getAllOrdersByuser',async(userId)=>{
    const res = await axios.get(`http://localhost:5005/api/shop/orders/list/${userId}`)

    return res.data
})
export const getOrdersDetails = createAsyncThunk('/order/getOrdersDetails',async(id)=>{
    const res = await axios.get(`http://localhost:5005/api/shop/orders/details/${id}`)

    return res.data
})

const shopOrderSlice = createSlice({
    name: 'shoppingOrderSlice',
    initialState,
    reducers :{
        resetOrderDetails : (state)=>{
            state.orderDetails = null
        }
    },
    extraReducers : (builder) =>{
        builder.addCase(createOrder.pending,(state)=>{
            state.isLoading = true
        }).addCase(createOrder.fulfilled,(state,action)=>{
            state.isLoading = false
            state.approvalUrl = action?.payload?.approvalURL,
            state.orderId = action?.payload?.orderId
            sessionStorage.setItem('orderId',JSON.stringify(action?.payload?.orderId))
        }).addCase(createOrder.rejected,(state)=>{
            state.approvalUrl = null
            state.isLoading = false
            state.orderId = null
        }
        ).addCase(getAllOrdersByuser.pending,(state)=>{
            state.isLoading = true
        }).addCase(getAllOrdersByuser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.orderList = action?.payload?.data
        }).addCase(getAllOrdersByuser.rejected,(state)=>{
            state.isLoading = false
            state.orderList = []
        }
        ).addCase(getOrdersDetails.pending,(state)=>{
            state.isLoading = false
        }).addCase(getOrdersDetails.fulfilled,(state,action)=>{
            state.isLoading = false
            state.orderDetails = action?.payload?.data
        }).addCase(getOrdersDetails.rejected,(state)=>{
            state.isLoading = false
            state.orderDetails = null
        })
    }
})

export default shopOrderSlice.reducer
export const {resetOrderDetails} = shopOrderSlice.actions