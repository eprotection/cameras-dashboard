import { configureStore } from '@reduxjs/toolkit';
import camReducer from './camSlice';
import imgReducer from './imgSlice';

export const store = configureStore({
  reducer: {
    cameras: camReducer,
    images:  imgReducer
  },
});
