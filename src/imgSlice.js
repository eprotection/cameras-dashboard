// IMAGES FOR SELECTED CAMERAS

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backend from './Backend'
import { selectCheckedCameras } from "./camSlice";

const PAGE_SIZE = 14

// DATA
const initialState = {
    list       : [], // images for the selected cameras
    status     : 'empty',
    showMore    : false
}
export const selectImages  = (state) => state.images;

//---------------------------------------------------------------------------------------
// MIDDLEWARE ASYNC THUNKS 
export const loadImagesTail = createAsyncThunk(
    'images/load',
    async (_, { getState }) => {
        const state = getState()
        const { list } = selectImages(state);
        const checkedCameras = selectCheckedCameras(state)

        // Calculate parameters
        const ids = Object.keys(checkedCameras)
        const minTime = list.length>0?list[list.length-1].time : null

        console.log('========= images: start loading...', minTime)
        let data = await backend.apiRequest('POST','/cameras/load_images',
            {  
                ids,            
                limit : PAGE_SIZE,
                before: minTime
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
        clear: (state) => initialState
    },
    extraReducers:{
        [loadImagesTail.pending]: state=>{
            state.status = 'pending'
            state.showMore = false
        },      
        [loadImagesTail.fulfilled]: (state,action)=>{
            const tail = action.payload;
            state.status = 'fulfilled';
            state.list.push(...tail)
            state.showMore = tail.length==PAGE_SIZE

        },      
        [loadImagesTail.rejected]: state=>{
            state.status = 'rejected'
            state.showMore = true
        },      
    }
});
export const { clear } = slice.actions;

//---------------------------------------------------------------------------------------
// CUSTOM MIDDLEWARE

export default slice.reducer;



