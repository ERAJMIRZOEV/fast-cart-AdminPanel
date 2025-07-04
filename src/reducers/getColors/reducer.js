import { createSlice } from "@reduxjs/toolkit";
import { getColors } from "../../api/ColorsApi/colorsApi";

export const getColorsSlice = createSlice({
    name: 'colors',
    initialState: {
        colorsData: []
    },
    reducers: {},

    extraReducers: builder=> {
        builder.addCase(getColors.fulfilled, (state, action)=> {
            state.colorsData = action.payload
        })
    }
})

export default getColorsSlice.reducer