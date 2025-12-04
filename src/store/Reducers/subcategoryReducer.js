import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { base_url } from '../../utils/config'

export const subcategoryAdd= createAsyncThunk(
    'subcategory/subcategoryAdd',
    async ({name,image},{rejectWithValue, fulfillWithValue, getState})=>{
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
      try{
         const formData = new FormData()
         formData.append('name', name)
         formData.append('image',image)
         const {data} = await axios.post(`${base_url}/api/category-add`, formData, config)
          return fulfillWithValue(data)
      } catch (error){
              return rejectWithValue(error.response.data)
    }
}
)

export const get_subcategory = createAsyncThunk(
    'subcategory/get_subcategory',
    async ({ perPage, page, searchValue },{rejectWithValue, fulfillWithValue, getState})=>{
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
      try{
         const {data} = await axios.get(`${base_url}/api/subcategory-get?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`, config)
         /*console.log(data)*/
          return fulfillWithValue(data)
      } catch (error){
              return rejectWithValue(error.response.data)
    }
}
)

export const subcategoryReducer = createSlice ({
    name : 'subcategory',
    initialState : {
           successMessage : '',
           errorMessage : '',
           loader : false,
           subcategorys : [],
           totalsubCategory : 0

    },
    
    reducers : {

        messageClear : (state, _)=>{
           state.errorMessage = ""
           state.successMessage = ""
        }

    },

    extraReducers: (builder)=>{
        builder.addCase(subcategoryAdd.pending,(state,_)=>
        {
            state.loader = true
        }
        )
        builder.addCase(subcategoryAdd.rejected,(state,{payload})=>
        {   
            state.loader = false
            state.errorMessage = payload.error
        }
        
        )
        
      builder.addCase(subcategoryAdd.fulfilled,(state,{payload})=>
        {state.loader = false
            state.successMessage = payload.message
           state.subcategorys = [...state.subcategorys, payload.subcategory]
           
        }
        
        )

        builder.addCase(get_subcategory.fulfilled,(state,{payload})=>
        {
            state.totalsubCategory = payload.totalsubCategory
           state.subcategorys =  payload.subcategorys
           
        }
      )
    }
})

export const {messageClear} = subcategoryReducer.actions
export default subcategoryReducer.reducer
