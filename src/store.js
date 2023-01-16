import { configureStore } from '@reduxjs/toolkit';
import camReducer from './camSlice';

export const store = configureStore({
  reducer: {
    cameras: camReducer,
  },
});
