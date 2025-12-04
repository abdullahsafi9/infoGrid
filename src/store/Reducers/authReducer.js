import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import jwt from 'jwt-decode'
import axios from 'axios'
import { base_url } from '../../utils/config'

export const login = createAsyncThunk(
    'auth/login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.post(`${base_url}/api/login`, info, )
            localStorage.setItem('accessToken', data.token)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const seller_login = createAsyncThunk(
    'auth/seller_login',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.post(`${base_url}/api/seller-login`, info, )
            localStorage.setItem('accessToken', data.token)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const logout = createAsyncThunk(
    'auth/logout',
    async ({ navigate, role }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.get('/logout', )
            localStorage.removeItem('accessToken')
            if (role === 'admin') {
                navigate('/admin/login')
            } else {
                navigate('/login')
            }

            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const seller_register = createAsyncThunk(
    'auth/seller_register',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            console.log(info)
            const { data } = await axios.post(`${base_url}/api/seller-register`, info, )
            localStorage.setItem('accessToken', data.token)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const profile_image_upload = createAsyncThunk(
    'auth/profile_image_upload',
    async (image, { rejectWithValue, fulfillWithValue, getState }) => {
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        try {

            const { data } = await axios.post(`${base_url}/api/profile-image-upload`, image, config )
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const profile_info_add = createAsyncThunk(
    'auth/profile_info_add',
    async (info, { rejectWithValue, fulfillWithValue,getState }) => {

        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post(`${base_url}/api/profile-info-add`, info, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)




export const get_user_info = createAsyncThunk(
    'auth/get_user_info',
    async (_, { rejectWithValue, fulfillWithValue, getState }) => {
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${base_url}/api//get-user`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const returnRole = (token) => {
    if (token) {
        const decodeToken = jwt(token)
        const expireTime = new Date(decodeToken.exp * 1000)
        if (new Date() > expireTime) {
            localStorage.removeItem('accessToken')
            return ''
        } else {
            return decodeToken.role
        }
    } else {
        return ''
    }
}


export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        userInfo: '',
        role: returnRole(localStorage.getItem('accessToken')),
        token: localStorage.getItem('accessToken')
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
  
     
  


    extraReducers: (builder)=>{
        builder.addCase(admin_login.pending,(state,_)=>
        {state.loader = true}
        )
        builder.addCase(admin_login.rejected,(state,{payload})=>
        {state.loader = false
            state.errorMessage = payload.error
        }
        
        )
        builder.addCase(admin_login.fulfilled,(state,{payload})=>
        {   
            state.loader = false
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        }
        
        )

        builder.addCase(seller_register.pending,(state,_)=>
        {state.loader = true}
        )
        builder.addCase(seller_register.rejected,(state,{payload})=>
        {state.loader = false
            state.errorMessage = payload.error
        }
        
        )
        builder.addCase(seller_register.fulfilled,(state,{payload})=>
        {state.loader = false
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        }
        
        )

        builder.addCase(seller_login.pending,(state,_)=>
        {state.loader = true}
        )
        builder.addCase(seller_login.rejected,(state,{payload})=>
        {state.loader = false
            state.errorMessage = payload.error
        }
        
        )
        builder.addCase(seller_login.fulfilled,(state,{payload})=>
        {state.loader = false
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
        }
        
        )

        builder.addCase(get_user_info.fulfilled,(state,{payload})=>
        {   state.loader = false
            state.userInfo = payload.userInfo
            state.role = payload.userInfo.role
        }
        
        )

        builder.addCase(profile_image_upload.pending,(state,_)=>
        {  state.loader = true
        }
        
        )

        builder.addCase(profile_image_upload.fulfilled,(state,{payload})=>
        {   state.loader = false
            state.userInfo = payload.userInfo
            state.successMessage = payload.message
        }
        
        )

        builder.addCase(profile_info_add.pending,(state,_)=>
        {   state.loader = true
            
        }
        
        )

        builder.addCase(profile_info_add.fulfilled,(state,{payload})=>
        {   state.loader = false
            state.userInfo = payload.userInfo
            state.successMessage = payload.message
        }
        
        )

    }


})

export const {messageClear} = authReducer.actions
export default authReducer.reducer
