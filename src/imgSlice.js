// IMAGES FOR SELECTED CAMERAS

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backend from './Backend'
import { selectCheckedCameras } from "./camSlice";

const PAGE_SIZE = 14

// DATA
const initialState = {
    list       : [], // images for the selected cameras
    mt         : 0,
    status     : 'empty'
}
export const selectImages  = (state) => state.images;

//---------------------------------------------------------------------------------------
// MIDDLEWARE ASYNC THUNKS 
export const loadImageChanges = createAsyncThunk(
    'images/load',
    async (_, { getState }) => {
        const state = getState()
        const {mt,list} = selectImages(state);
        const checkedCameras = selectCheckedCameras(state)

        // Calculate parameters
        const ids = Object.keys(checkedCameras)
        const minTime = list.length>0?list[list.length-1].time : null

        console.log('========= ===== ===== images: start loading...', mt, checkedCameras)
        let data = await backend.apiRequest('POST','/cameras/load_images',
            {   mt,
                ids,            
                limit : PAGE_SIZE,
                minTime
            })

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
        clear: (state) => {
            console.log('##### clearImages')
            state.list = []
            state.mt = 0
        }
    },
    extraReducers:{
        [loadImageChanges.pending]: state=>{
            state.status = 'pending';
        },      
        [loadImageChanges.fulfilled]: (state,action)=>{
            state.status = 'fulfilled';
            //console.log("!!!!!!!!!!!",action)
            // state.mt   = action.payload.mt;
            // state.list = action.payload.results;
            state.list = action.payload;
        },      
        [loadImageChanges.rejected]: state=>{
            state.status = 'rejected';
        },      
    }
});
export const { clear } = slice.actions;

//---------------------------------------------------------------------------------------
// CUSTOM MIDDLEWARE

export default slice.reducer;



