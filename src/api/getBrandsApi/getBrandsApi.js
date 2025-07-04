import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosDefault } from "../../utils/axios";

export const getBrands = createAsyncThunk('brands/getBrands',
    async()=> {
        try {
            const { data } = await axiosDefault.get('/Brand/get-brands')
            return data?.data
        } catch (error) {
            console.log(error)
        }
    }
)