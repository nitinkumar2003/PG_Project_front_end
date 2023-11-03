

import { configureStore } from '@reduxjs/toolkit';
import  loginSlice from '../features/login/loginSlice';
import loaderSlice from '../features/login/loaderSlice';
import masterApiSlice from '../features/masterApi/masterApiSlice';

export const store=configureStore({
    reducer:{
         login:loginSlice,
         loader:loaderSlice,
         masterApiSlice:masterApiSlice
    }
})

