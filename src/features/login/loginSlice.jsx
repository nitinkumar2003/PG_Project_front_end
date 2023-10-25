import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { $InvokeApi } from "../../network/Services";
import $Services from "../../network/Services";

const initialState = {
  isLoginSignUpForm: false,
  isLoginForm: true,
  isSignUpForm: false,
  status: 'idle' ,
  loading:false,
  data:''
};
console.log('initialState',initialState)

export const signUpAsync = createAsyncThunk('user/SignUp', async (userInfo) => {
  try {
      let response = await $Services.userSignUp(userInfo);
      console.log('response',response)
      return response;
  } catch (err) {
      console.log('Error',err.response.data)
      return err.response.data
  }
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
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
  },
});

export const { openLoginSignUpForm} = loginSlice.actions;
export default loginSlice.reducer;
