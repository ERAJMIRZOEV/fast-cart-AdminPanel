import { createSlice } from "@reduxjs/toolkit";
import { getProduct, getProductsById } from "../../api/getProductApi/getProduct";

export const getProductSlice = createSlice({
    name: "products",
    initialState: {
        data: [],
        byIdData: []
    },
    reducers: {},

    extraReducers: builder=> {
        builder.addCase(getProduct.fulfilled, (state, action)=> {
            state.data = action.payload
        })
        builder.addCase(getProductsById.fulfilled, (state, action)=> {
            state.byIdData = action.payload
        })
    }
})
export default getProductSlice.reducer