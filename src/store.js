import { configureStore } from '@reduxjs/toolkit';
import camReducer from './cameras/camSlice';
import imgReducer from './images/imgSlice';

export const store = configureStore({
  reducer: {
    cameras: camReducer,
    images:  imgReducer
  },
});
