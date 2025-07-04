import { createSlice } from "@reduxjs/toolkit";
import { getSubCategory } from "../../api/subCategoryApi/getSubCategory";

export const subCategorySlice = createSlice({
    name: 'subcategory',
    initialState: {
        subCategoryData: []
    },
    reducers: {},
    
    extraReducers: builder=> {
        builder.addCase(getSubCategory.fulfilled, (state, action)=> {
            state.subCategoryData = action.payload
        })
    }
})

export default subCategorySlice.reducer