import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosDefault } from "../../utils/axios";

export const getSubCategory = createAsyncThunk('subcategory/getSubCategory', 
    async ()=> {
        try {
            const { data } = await axiosDefault.get('/SubCategory/get-sub-category')
            return data?.data
        } catch (error) {
            console.log(error)
        }
    }
)