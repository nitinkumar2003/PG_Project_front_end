import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $Api_Url } from "../../network/Url";
import { $InvokeApi } from "../../network/Services";

const initialState = {
  isLoginSignUpForm: false,
  isLoginForm: true,
  isSignUpForm: false,
  status: 'idle' ,
  loading:false
};

console.log('initialStateinitialState',initialState)







export const signUpASync = createAsyncThunk('api/fetchData', async (json) => {
    const response = await $InvokeApi($Api_Url.userRegistration_Url, 'POST', json, null);
    return response;
});


export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    openLoginSignUpForm: (state, action) => {
        console.log('login',action)
        if(action.payload=='openForm'){
            state.isLoginSignUpForm = !state.isLoginSignUpForm;
            state.isLoginForm = true;
            state.isSignUpForm = false;
        }else if(action.payload==='openLoginForm'){
            state.isLoginForm = true;
            state.isSignUpForm = false;
        }else if(action.payload==='openSignUpForm'){
            state.isLoginForm = false;
            state.isSignUpForm = true;
        }
   
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpASync.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpASync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(signUpASync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { openLoginSignUpForm} = loginSlice.actions;
export default loginSlice.reducer;
