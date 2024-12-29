import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState ={
    isLoading : false,
    reviews : []
}

export const addReview = createAsyncThunk('/order/addReview',async(formData)=>{
    const res = await axios.post('http://localhost:5005/api/shop/review/add',formData)

    return res.data
})

export const getReview = createAsyncThunk('/order/getReview',async(productId)=>{
    const res = await axios.get('http://localhost:5005/api/shop/review/get',{productId})

    return res.data
})

const reviewSlice = createSlice({
    name : 'reviewSlice',
    initialState,
    reducers : {},
    extraReducers: (builder)=>{
        builder.addCase(getReview.pending,(state)=>{
            state.isLoading = true
        }).addCase(getReview.fulfilled,(state,action)=>{
            state.isLoading = false
            state.reviews = action?.payload?.data
        }).addCase(getReview.rejected,(state)=>{
            state.isLoading = false
            state.reviews = []
        })
    }
})

export default reviewSlice.reducer