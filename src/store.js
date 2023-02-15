import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import camReducer from './cameras/camSlice';
import imgReducer from './images/imgSlice';
import filtersReducer from './filters/filtersSlice';

export const store = configureStore({
  reducer: {
    auth:    authReducer,
    cameras: camReducer,
    images:  imgReducer,
    filters: filtersReducer
  },
});
