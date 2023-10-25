

import { configureStore } from '@reduxjs/toolkit';
import  loginSlice from '../features/login/loginSlice';
import loaderSlice from '../features/login/loaderSlice';

export const store=configureStore({
    reducer:{
         login:loginSlice,
         loader:loaderSlice
    }
})

