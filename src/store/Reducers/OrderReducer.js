import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { base_url } from '../../utils/config'

export const get_admin_orders = createAsyncThunk(
    'order/get_admin_orders',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue, getState }) => {
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${base_url}/api/admin/orders?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_seller_orders = createAsyncThunk(
    'order/get_seller_orders',
    async ({ parPage, page, searchValue, sellerId }, { rejectWithValue, fulfillWithValue, getState }) => {
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${base_url}/api/seller/orders/${sellerId}?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_admin_order = createAsyncThunk(
    'order/get_admin_order',
    async (orderId, { rejectWithValue, fulfillWithValue,getState }) => {
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${base_url}/api/admin/order/${orderId}`, config )
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_seller_order = createAsyncThunk(
    'order/get_seller_order',
    async (orderId, { rejectWithValue, fulfillWithValue, getState }) => {
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${base_url}/api/seller/order/${orderId}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const admin_order_status_update = createAsyncThunk(
    'order/admin_order_status_update',
    async ({ orderId, info }, { rejectWithValue, fulfillWithValue, getState }) => {
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.put(`${base_url}/api/admin/order-status/update/${orderId}`, info, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const seller_order_status_update = createAsyncThunk(
    'order/seller_order_status_update',
    async ({ orderId, info }, { rejectWithValue, fulfillWithValue, getState }) => {
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.put(`${base_url}/api/seller/order-status/update/${orderId}`, info, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



export const OrderReducer = createSlice({
    name: 'order',
    initialState: {
        successMessage: '',
        errorMessage: '',
        totalOrder: 0,
        order: {},
        myOrders: []
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },

    extraReducers: (builder)=>{
        builder.addCase(get_admin_orders.fulfilled,(state,{payload})=>
        {
            state.myOrders = payload.orders
            state.totalOrder = payload.totalOrder
        }
        
        )

        builder.addCase(get_admin_order.fulfilled,(state,{payload})=>
        {
            state.order = payload.order
        }
        
        )
        builder.addCase(admin_order_status_update.rejected,(state,{payload})=>
        {
            state.errorMessage = payload.message
        }
        
        )

        builder.addCase(admin_order_status_update.fulfilled,(state,{payload})=>
        {
            state.successMessage = payload.message
        }
        
        )

        builder.addCase(get_seller_orders.fulfilled,(state,{payload})=>
        {
            state.myOrders = payload.orders
            state.totalOrder = payload.totalOrder
        }
        
        )

        builder.addCase(get_seller_order.fulfilled,(state,{payload})=>
        {
            state.order = payload.order
        }
        
        )

        builder.addCase(seller_order_status_update.rejected,(state,{payload})=>
        {
            state.errorMessage = payload.message
        }
        
        )

        builder.addCase(seller_order_status_update.fulfilled,(state,{payload})=>
        {
            state.successMessage = payload.message
        }
        
        )

    
    }

})
export const { messageClear } = OrderReducer.actions
export default OrderReducer.reducer
