import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { base_url } from '../../utils/config'


export const megamenuAdd= createAsyncThunk(
    'megamenu/megamenuAdd',
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
         const {data} = await axios.post(`${base_url}/api/megamenu-add`, formData, config)
          return fulfillWithValue(data)
      } catch (error){
              return rejectWithValue(error.response.data)
    }
}
)

export const get_megamenu = createAsyncThunk(
    'megamenu/get_megamenu',
    async ({ perPage, page, searchValue },{rejectWithValue, fulfillWithValue, getState})=>{
        const {token} = getState().auth

        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
      try{
         const {data} = await axios.get(`${base_url}/api/megamenu-get?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`, config)
         /*console.log(data)*/
          return fulfillWithValue(data)
      } catch (error){
              return rejectWithValue(error.response.data)
    }
}
)

export const megamenuReducer = createSlice ({
    name : 'megamenu',
    initialState : {
           successMessage : '',
           errorMessage : '',
           loader : false,
           megamenus : [],
           totalmegaMenu : 0

    },
    
    reducers : {

        messageClear : (state, _)=>{
           state.errorMessage = ""
           state.successMessage = ""
        }

    },

    extraReducers: (builder)=>{
        builder.addCase(megamenuAdd.pending,(state,_)=>
        {
            state.loader = true
        }
        )
        builder.addCase(megamenuAdd.rejected,(state,{payload})=>
        {   
            state.loader = false
            state.errorMessage = payload.error
        }
        
        )
        
      builder.addCase(megamenuAdd.fulfilled,(state,{payload})=>
        {state.loader = false
            state.successMessage = payload.message
           state.megamenus = [...state.megamenus, payload.megamenu]
           
        }
        
        )

        builder.addCase(get_megamenu.fulfilled,(state,{payload})=>
        {
            state.totalmegaMenu = payload.totalmegaMenu
           state.megamenus =  payload.megamenus
           
        }
      )
    }
})

export const {messageClear} = megamenuReducer.actions
export default megamenuReducer.reducer
