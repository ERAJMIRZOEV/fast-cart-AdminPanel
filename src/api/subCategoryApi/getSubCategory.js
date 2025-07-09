import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosDefault, axiosRequest } from "../../utils/axios";
import { toast } from "sonner";

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


export const addSubCategory = createAsyncThunk('subcategory/addSubCategory', 
    async ({subCategoryName, idx}, {dispatch})=> {
        try {
            await axiosRequest.post(`/SubCategory/add-sub-category?CategoryId=${idx}&SubCategoryName=${subCategoryName}`)
            dispatch(getSubCategory())
            toast.success('Субкатегория успешно добавлено')
        } catch (error) {
            console.log(error)
        }
    }
)



export const deleteSubCategory = createAsyncThunk('subcategory/deleteSubCategory', 
    async ( id, {dispatch})=> {
        try {
            await axiosRequest.delete(`/SubCategory/delete-sub-category?id=${id}`)
            dispatch(getSubCategory())
            toast.success('Субкатегория успешно удалено')
        } catch (error) {
            console.log(error)
        }
    }
)