import { configureStore } from "@reduxjs/toolkit";
import  getProductSlice  from "../reducers/getProductSlice/reducer";

export const store = configureStore({
    reducer: {
        products: getProductSlice
    }
})

export default store