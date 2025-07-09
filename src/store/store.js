import { configureStore } from "@reduxjs/toolkit";
import  getProductSlice  from "../reducers/getProductSlice/reducer";
import subCategorySlice  from "../reducers/subCategorySlice/reducer";
import  getBrandsSlice  from "../reducers/getBrands/reducer";
import  getColorsSlice  from "../reducers/getColors/reducer";
import  getCategoriesSlice  from './../reducers/getCategories/reducer';

export const store = configureStore({
    reducer: {
        products: getProductSlice,
        subcategory: subCategorySlice,
        brands: getBrandsSlice,
        colors: getColorsSlice,
        categories: getCategoriesSlice
    }
})

export default store