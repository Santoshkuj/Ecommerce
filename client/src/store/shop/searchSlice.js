import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    isLoading : false,
    searchResults : []
}

export const getSearchResults = createAsyncThunk('/products/getSearchResults',async(keyword)=>{
    const res = await axios.get(`http://localhost:5005/api/shop/search/${keyword}`)

    return res.data
})

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        resetSearchResults: (state)=>{
            state.searchResults = []
        }
    },
    extraReducers: (builder)=> {
        builder.addCase(getSearchResults.pending, (state)=>{
            state.isLoading = true
        }).addCase(getSearchResults.fulfilled, (state,action)=>{
            state.isLoading = false
            state.searchResults = action?.payload?.data
        }).addCase(getSearchResults.rejected, (state)=>{
            state.isLoading = false
            state.searchResults = []
        })
    }
})

export default searchSlice.reducer
export const { resetSearchResults } = searchSlice.actions