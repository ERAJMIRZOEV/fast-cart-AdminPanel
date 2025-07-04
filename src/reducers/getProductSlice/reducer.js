import { createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../../api/getProductApi/getProduct";

export const getProductSlice = createSlice({
    name: "products",
    initialState: {
        data: []
    },
    reducers: {},

    extraReducers: builder=> {
        builder.addCase(getProduct.fulfilled, (state, action)=> {
            state.data = action.payload
        })
    }
})
export default getProductSlice.reducer