import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    isLoading: false,
    featureImageList: []
}


export const addFeatureImages = createAsyncThunk('/common/addFeatureImages',async(image)=>{
    const response = await axios.post(`http://localhost:5005/api/common/feature/add`,{image})
    return response.data;
})
export const getFeatureImages = createAsyncThunk('/common/getFeatureImages',async()=>{
    const response = await axios.get(`http://localhost:5005/api/common/feature/get`)
    return response.data;
})

const commonSlice = createSlice({
    name: 'commonSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getFeatureImages.pending,(state)=>{
            state.isLoading = true
        }).addCase(getFeatureImages.fulfilled,(state,action)=>{
            state.isLoading = true
            state.featureImageList = action?.payload?.data
        }).addCase(getFeatureImages.rejected,(state)=>{
            state.isLoading = true
            state.featureImageList =[]
        })
    }
})

export default commonSlice.reducer