import { createSlice } from "@reduxjs/toolkit";
import { getBrands } from "../../api/getBrandsApi/getBrandsApi";

export const getBrandsSlice = createSlice({
    name: 'brands',
    initialState: {
        brandsData: []
    },
    reducers: {},

    extraReducers: builder=> {
        builder.addCase(getBrands.fulfilled, (state, action)=> {
            state.brandsData = action.payload
        })
    }
})

export default getBrandsSlice.reducer