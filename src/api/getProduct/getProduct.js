import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from './../../utils/config';
import { axiosRequest } from '../../utils/axios';
import { toast, Toaster } from "sonner";





export const getProduct = createAsyncThunk('products/getProduct',
    async () => {
        try {
            const { data } = await axios.get(`${API}/Product/get-products`)
            return data?.data?.products
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteProduct = createAsyncThunk('products/deleteProduct', 
    async (id, {dispatch})=> {
        try {
            await axiosRequest.delete(`/Product/delete-product?id=${id}`)
            dispatch(getProduct())
            toast.success("Успешно удалено")
        } catch (error) {
            console.log(error)
        }
    }
)