// IMAGES FOR SELECTED CAMERAS

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backend from './Backend'

// DATA
const initialState = {
    list       : [], // images for the selected cameras
    mt         : 0,
    status     : 'empty'
}
export const selectImages  = (state) => state.images;

//---------------------------------------------------------------------------------------
// MIDDLEWARE ASYNC THUNKS 
const loadChanges = createAsyncThunk(
    'images/load_list',
    async (mt) => {
        console.log('images: start loading...')
        // let data = await backend.apiRequest('POST','/cameras/load_list',{mt})
        let data = {}
        await new Promise((resolve)=>{setTimeout(() => {resolve()}, 1000)})// FOR DEBUG

        console.log('images:',data)
        // The value we return becomes the `fulfilled` action payload
        return data;
    }
);

//------------------------------------------------------------------------------------
// THE SLICE
const slice = createSlice({
    name: "images",
    initialState,
    reducers:{
        clearImages: (state) => {
            state.list = []
            state.mt = 0
        }
    },
    extraReducers:{
    }
});
export const { clearImages } = slice.actions;

//---------------------------------------------------------------------------------------
// CUSTOM MIDDLEWARE

export default slice.reducer;



