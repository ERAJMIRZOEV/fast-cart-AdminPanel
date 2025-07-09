import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API } from '../../utils/config';
import { axiosDefault, axiosRequest } from '../../utils/axios';
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

export const addProduct = createAsyncThunk('products/getProducts',
    async(newProduct)=> {
        try {
            await axiosRequest.post('/Product/add-product', newProduct)
            toast.success("Товар успешно добавлен");

        } catch (error) {
            console.log(error)
            toast.error("Ошибка");

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

export const getProductsById = createAsyncThunk('products/getProductsById',
    async (id)=> {
        try {
           let { data } = await axiosDefault(`/Product/get-product-by-id?id=${id}`)
           return data.data
        } catch (error) {
            console.log(error)
        }
    }
)


export const editProduct = createAsyncThunk(
  'product/editProduct',
  async (product, { dispatch }) => {
    try {
      const query = new URLSearchParams({
        Id: product.id,
        BrandId: product.BrandId,
        ColorId: product.ColorId,
        ProductName: product.ProductName,
        Description: product.Description,
        Quantity: product.Quantity,
        Code: product.Code,
        Price: product.Price,
        HasDiscount: product.HasDiscount,
        DiscountPrice: product.DiscountPrice ,
        SubCategoryId: product.SubCategoryId,
        Weight: 'XL',
        Size: '10',
      }).toString()

      await axiosRequest.put(`/Product/update-product?${query}`)
      dispatch(getProduct())
      toast.success('edit is succssesful')
    } catch (error) {
      toast.error('something went wrong, contact support')
      console.log(error)
    }
  }
)
