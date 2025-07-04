import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosDefault } from "../../utils/axios";

export const getColors = createAsyncThunk('colors/getColors',
    async()=> {
        try {
            const { data } = await axiosDefault.get('/Color/get-colors')
            return data?.data
        } catch (error) {
            console.log(error)
        }
    }
)