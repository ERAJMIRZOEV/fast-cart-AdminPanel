import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { API } from './../../utils/config';
import { saveToken } from "../../utils/token";
import { axiosRequest } from "../../utils/axios";

export const  login = createAsyncThunk('auth/login',
    async (user)=> {
        try {
            const { data } = await axiosRequest.post(`/Account/login`, user)
            saveToken(data.data)
            console.log(data.data)
            
            return data.data
        } catch (error) {
            console.log(error)
        }
    }
)