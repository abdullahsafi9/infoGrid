import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { base_url } from '../../utils/config'

export const add_product = createAsyncThunk(
    'product/add_product',
    async (product, { rejectWithValue, fulfillWithValue, getState }) => {
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(`${base_url}/api/product-add`, product, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const update_product = createAsyncThunk(
    'product/updateProduct',
    async (product, { rejectWithValue, fulfillWithValue, getState }) => {
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(`${base_url}/api/product-update`, product, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const product_image_update = createAsyncThunk(
    'product/product_image_update',
    async ({ oldImage, newImage, productId }, { rejectWithValue, fulfillWithValue, getState }) => {
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        try {
            
            const formData = new FormData()
            formData.append('oldImage', oldImage)
            formData.append('newImage', newImage)
            formData.append('productId', productId)

            const { data } = await axios.post(`${base_url}/api/product-image-update`, formData, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_products = createAsyncThunk(
    'product/get_products',
    async ({ perPage, page, searchValue }, { rejectWithValue, fulfillWithValue,getState }) => {
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${base_url}/api/products-get?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const get_product = createAsyncThunk(
    'product/get_product',
    async (productId, { rejectWithValue, fulfillWithValue, getState }) => {
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${base_url}/api/product-get/${productId}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const productReducer = createSlice({
    name: 'product',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        products: [],
        product: '',
        totalProduct: 0
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },

    extraReducers: (builder)=>{
        builder.addCase(add_product.pending,(state,_)=>
        {
            state.loader = true
        }
        )
        builder.addCase(add_product.rejected,(state,{payload})=>
        {   
            state.loader = false
            state.errorMessage = payload.error
        }
        
        )
        
      builder.addCase(add_product.fulfilled,(state,{payload})=>
        {state.loader = false
            state.loader = false
            state.successMessage = payload.message
           
        }
        
        )

      builder.addCase(get_products.fulfilled,(state,{payload})=>
      {
        state.totalProduct = payload.totalProduct
        state.products = payload.products
         
      }
    )

    builder.addCase(get_product.fulfilled,(state,{payload})=>
    {
        state.product = payload.product
       
    }
  )

  builder.addCase(update_product.pending,(state, _)=>
    {
        state.loader = true
       
    }
  )

  builder.addCase(update_product.rejected,(state,{payload})=>
  {
    state.loader = false
    state.errorMessage = payload.error
     
  }
)

builder.addCase(update_product.fulfilled,(state,{payload})=>
  {
    state.loader = false
    state.product = payload.product
    state.successMessage = payload.message
     
  }
)

builder.addCase(product_image_update.fulfilled,(state,{payload})=>
  {
    state.product = payload.product
    state.successMessage = payload.message
     
  }
)
    }
       
    

})
export const { messageClear } = productReducer.actions
export default productReducer.reducer
