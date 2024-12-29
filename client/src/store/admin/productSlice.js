import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isloading :false,
    productList : []
}

export const addNewProducts = createAsyncThunk('/products/addnewproduct',async (formData)=>{
    const response = await axios.post('http://localhost:5005/api/admin/products/add',formData)
    return response?.data
})
export const fetchAllProducts = createAsyncThunk('/products/fetchallproducts',async ()=>{
    const response = await axios.get('http://localhost:5005/api/admin/products/get')
    return response?.data
})
export const editProduct = createAsyncThunk('/products/editproduct',async ({id,formData})=>{
    const response = await axios.put(`http://localhost:5005/api/admin/products/edit/${id}`,formData)
    return response?.data
})
export const deleteProduct = createAsyncThunk('/products/deleteproduct',async (id)=>{
    const response = await axios.delete(`http://localhost:5005/api/admin/products/delete/${id}`)
    return response?.data
})

const adminProductSlice = createSlice({
    name : 'adminProducts',
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder.addCase(fetchAllProducts.pending,(state)=>{
            state.isloading = true
        }).addCase(fetchAllProducts.fulfilled,(state,action)=>{
            state.isloading = false
            state.productList = action?.payload?.data
        }).addCase(fetchAllProducts.rejected,(state)=>{
            state.isloading = false
            state.productList = []
        })
    }
})

export default adminProductSlice.reducer