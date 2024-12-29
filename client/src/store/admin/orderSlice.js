import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState ={
    orderList: [],
    orderDetails: null,
    isLoading : false
}

export const getAllOrdersForAdmin = createAsyncThunk('/order/getAllOrdersForAdmin',async()=>{
    const res = axios.get(`http://localhost:5000/api/admin/orders/get`)

    return res.data
})
export const getOrdersDetailsForAdmin = createAsyncThunk('/order/getOrdersDetails',async(id)=>{
    const res = axios.get(`http://localhost:5000/api/admin/orders/details/${id}`)

    return res.data
})
export const updateOrderStatus = createAsyncThunk('/order/updateOrderStatus',async({id,orderStatus})=>{
    const res = axios.put(`http://localhost:5000/api/admin/orders/update/${id}`,{orderStatus})

    return res.data
})

const adminOrderSlice = createSlice({
    name : 'adminOrderSlice',
    initialState,
    reducers: {
        resetOrderDetails : (state)=>{
            state.orderDetails = null
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getAllOrdersForAdmin.pending,(state)=>{
            state.isLoading = true
        }).addCase(getAllOrdersForAdmin.fulfilled,(state,action)=>{
            state.isLoading = false
            state.orderList = action?.payload?.data
        }).addCase(getAllOrdersForAdmin.rejected,(state)=>{
            state.isLoading = false
            state.orderList = []
        }
        ).addCase(getOrdersDetailsForAdmin.pending,(state)=>{
            state.isLoading = false
        }).addCase(getOrdersDetailsForAdmin.fulfilled,(state,action)=>{
            state.isLoading = false
            state.orderDetails = action?.payload?.data
        }).addCase(getOrdersDetailsForAdmin.rejected,(state)=>{
            state.isLoading = false
            state.orderDetails = null
        })
    }
})

export default adminOrderSlice.reducer
export const {resetOrderDetails} = adminOrderSlice.actions