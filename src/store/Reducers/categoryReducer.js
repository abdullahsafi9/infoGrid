import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { base_url } from '../../utils/config'
import Category from '../../../../../Desktop/shelai/shelai-dashboard-main/src/views/admin/Category'
import CategoryEdit from '../../../../../Desktop/shelai/shelai-dashboard-main/src/views/admin/CategoryEdit'


export const categoryAdd = createAsyncThunk(
    'category/categoryAdd',
    async (category,{rejectWithValue, fulfillWithValue, getState})=>{
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        
      try{
    
         const {data} = await axios.post(`${base_url}/api/category-add`, category, config)
         console.log(data);
          return fulfillWithValue(data)
      } catch (error){
              return rejectWithValue(error.response.data)
    }
}
)


export const category_get = createAsyncThunk(
    'category/category_get',
    async (categoryId, { rejectWithValue, fulfillWithValue, getState }) => {
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.get(`${base_url}/api/get-category/${categoryId}`, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const update_category = createAsyncThunk(
    'category/updateCategory',
    async (category, { rejectWithValue, fulfillWithValue, getState }) => {
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(`${base_url}/api/category-update`, category, config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



export const category_image_update = createAsyncThunk(
    'category/category_image_update',
    async (image,{rejectWithValue, fulfillWithValue, getState }) => {
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        try {
     



          
            const { data } = await axios.post(`${base_url}/api/category-image-update`, image,  config)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)



export const get_category = createAsyncThunk(
    'category/get_category',
    async ({ perPage, page, searchValue },{rejectWithValue, fulfillWithValue, getState})=>{
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
      try{
         const {data} = await axios.get(`${base_url}/api/category-get?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`, config)
         /*console.log(data)*/
          return fulfillWithValue(data)
      } catch (error){
              return rejectWithValue(error.response.data)
    }
}
)

export const categoryReducer = createSlice ({
    name : 'category',
    initialState : {
           successMessage : '',
           errorMessage : '',
           loader : false,
           categorys : [],
           category: '',
           totalCategory : 0

    },
    
    reducers : {

        messageClear : (state, _)=>{
           state.errorMessage = ""
           state.successMessage = ""
        }

    },

    extraReducers: (builder)=>{
        builder.addCase(categoryAdd.pending,(state,_)=>
        {
            state.loader = true
        }
        )
        builder.addCase(categoryAdd.rejected,(state,{payload})=>
        {   
            state.loader = false
            state.errorMessage = payload.error
        }
        
        )
        
      builder.addCase(categoryAdd.fulfilled,(state,{payload})=>
        {state.loader = false
            state.successMessage = payload.message
           state.categorys = [...state.categorys, payload.category]
           
        }
        
        )

        builder.addCase(get_category.fulfilled,(state,{payload})=>
        {
            state.totalCategory = payload.totalCategory
           state.categorys =  payload.categorys
           
        }
      )

       builder.addCase(category_get.fulfilled,(state,{payload})=>
        {
           state.category = payload.category
           
        }
      )

builder.addCase(update_category.pending,(state, _)=>
    {
        state.loader = true
       
    }
  )

  builder.addCase(update_category.rejected,(state,{payload})=>
  {
    state.loader = false
    state.errorMessage = payload.error
     
  }
)

builder.addCase(update_category.fulfilled,(state,{payload})=>
  {
    state.loader = false
    state.category = payload.category
    state.successMessage = payload.message
     
  }
)

builder.addCase(category_image_update.fulfilled,(state,{payload})=>
  {
    state.category = payload.category
    state.successMessage = payload.message
     
  }
)
  
    }
})

export const {messageClear} = categoryReducer.actions
export default categoryReducer.reducer
