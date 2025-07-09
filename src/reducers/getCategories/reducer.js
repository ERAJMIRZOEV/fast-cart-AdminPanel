import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../../api/categoryApi/categoryApi";

export const getCategoriesSlice = createSlice({
    name: 'categories',
    initialState: {
       categoryData: []
    },
    reducers: {},

    extraReducers: builder=> {
        builder.addCase(getCategories.fulfilled, (state, action)=> {
            state.categoryData = action.payload
        })
    }
})

export default getCategoriesSlice.reducer