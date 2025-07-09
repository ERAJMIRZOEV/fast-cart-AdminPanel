
export const updateCategory = createAsyncThunk('categories/updateCategory',
    async ({ id, formData }, { dispatch }) => {
        try {
            await axiosRequest.put(`/Category/update-category?id=${id}`, formData);
            dispatch(getCategories());
            toast.success('Категория успешно обновлена');
        } catch (error) {
            console.log(error);
            toast.error('Ошибка при обновлении категории');
        }
    }
);
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axios";
import { toast } from "sonner";

export const getCategories = createAsyncThunk('categories/getCategories',
    async ()=> {
        try {
            const { data } = await axiosRequest.get('/Category/get-categories')
            return data?.data
        } catch (error) {
            console.log(error)
        }
    }
)


export const addCategory = createAsyncThunk('categories/addCategory',
    async (newCategory, {dispatch})=> {
        try {
            await axiosRequest.post('/Category/add-category', newCategory)
            dispatch(getCategories())
            toast.success('Новая категория добавлена')
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteCategory = createAsyncThunk('categories/deleteCategory',
    async (id, {dispatch})=> {
        try {
            await axiosRequest.delete(`/Category/delete-category?id=${id}`)
            dispatch(getCategories())
            toast.success('Категория успешно удалено')
        } catch (error) {
            console.log(error)
        }
    }
)


export const editCategory = createAsyncThunk('categories/editCategory',
    async (editedCategory, {dispatch})=> {
        try {
            await axiosRequest.put(`Category/update-category`, editedCategory)
            dispatch(getCategories())
            toast.success('Категория успешно изменено')
        } catch (error) {
            console.log(error)
        }
    }
)
