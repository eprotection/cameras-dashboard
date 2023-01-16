// IMAGES FOR SELECTED CAMERAS

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backend from './Backend'

// DATA
const initialState = {
    cameras    : {}, // selected cameras to show images for
    images     : [], // images for the selected cameras
    mt         : 0,
    status     : 'empty'
}
export const selectActiveCameras  = (state) => state.images.cameras;
export const selectImages  = (state) => state.images.images;

//------------------------------------------------------------------------------------
// THE SLICE
const slice = createSlice({
    name: "images",
    initialState,
    reducers:{
        toggleCamera: (state, action)=>{
            const cam = action.payload
            if(state.cameras[cam.id]===undefined) 
                state.cameras[cam.id]=cam //append
            else
                state.cameras[cam.id]=undefined //remove
        }
    },
    extraReducers:{
    }
});
export const { toggleCamera } = slice.actions;


export default slice.reducer;



