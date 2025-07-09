import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosDefault, axiosRequest } from "../../utils/axios";
import { toast } from "sonner";

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


export const deleteBrands = createAsyncThunk('brands/deleteBrands',
    async(id, {dispatch})=> {
        try {
            await axiosRequest.delete(`/Brand/delete-brand?id=${id}`)
            dispatch(getBrands())
            toast.success('Бренд успешно удален')
        } catch (error) {
            console.log(error)
        }
    }
)



export const addBrands = createAsyncThunk('brands/addBrands',
    async(brandName, {dispatch})=> {
        try {
            await axiosRequest.post(`/Brand/add-brand?BrandName=${brandName}`)
            dispatch(getBrands())
            
            toast.success('Бренд успешно добавлен')
        } catch (error) {
            console.log(error)
        }
    }
)


export const editBrands = createAsyncThunk('brands/editBrands',
    async({editBrandId, editBrandName}, {dispatch})=> {
        try {
            await axiosRequest.put(`/Brand/update-brand?Id=${editBrandId}&BrandName=${editBrandName}`)
            dispatch(getBrands())
            toast.success('Бренд успешно изменен')
        } catch (error) {
            console.log(error)
        }
    }
)