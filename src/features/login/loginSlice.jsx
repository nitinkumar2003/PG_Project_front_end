import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $Services from "../../network/Services";

const initialState = {
  isLoginSignUpForm: false,
  isLoginForm: true,
  isSignUpForm: false,
  isForgotPassword: false,
  isOtpPage: false,
  refrencePageloginSlice: '',
  status: 'idle',
  data: '',
  userEmail: '',
  isUserLogin:false
};
console.log('initialState', initialState)

export const signUpAsync = createAsyncThunk('user/SignUp', async (userInfo) => {
  try {
    let response = await $Services.userSignUp(userInfo);
    console.log('response', response)
    return response;
  } catch (err) {
    console.log('Error', err.response.data)
    return err.response.data
  }
});
export const loginAsync = createAsyncThunk('user/login', async (userInfo) => {
  try {
    let response = await $Services.userLogin(userInfo);
    console.log('response', response)
    return response;
  } catch (err) {
    console.log('Error', err.response.data)
    return err.response.data
  }
});


export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    openLoginSignUpForm: (state, action) => {
      console.log('loginSlice', action)
      const { payload } = action
      if (payload == 'openForm') {
        state.isLoginSignUpForm = !state.isLoginSignUpForm;
        state.isLoginForm = true;
        state.isSignUpForm = false;
        state.isForgotPassword = false;
        state.isOtpPage = false;
        state.refrencePageloginSlice = ''
      } else if (payload === 'openLoginForm') {
        state.isLoginForm = true;
        state.isSignUpForm = false;
        state.isForgotPassword = false;
        state.isOtpPage = false
        state.refrencePageloginSlice = ''
      } else if (payload === 'openSignUpForm') {
        state.isLoginForm = false;
        state.isSignUpForm = true;
        state.isForgotPassword = false;
        state.isOtpPage = false
        state.refrencePageloginSlice = ''
      } else if (payload === 'openForgotPassword') {
        state.isLoginForm = false;
        state.isSignUpForm = false;
        state.isForgotPassword = true;
        state.isOtpPage = false
        state.refrencePageloginSlice = ''
      } else if (payload?.action == 'openIsOtp') {
        state.userEmail = payload?.userEmail
        state.isLoginForm = false;
        state.isSignUpForm = false;
        state.isForgotPassword = false;
        state.isOtpPage = true
        state.refrencePageloginSlice = payload.refrencePage
      }

    },
  },
  extraReducers: (builder) => {
    // builder .addCase(signUpAsync.fulfilled, (state, action) => {
    //     state.data = action.payload;
    //   })
  },
});

export const { openLoginSignUpForm } = loginSlice.actions;
export default loginSlice.reducer;
