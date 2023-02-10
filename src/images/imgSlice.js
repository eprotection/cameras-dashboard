// IMAGES FOR A SET OF CAMERAS

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backend from '../Backend'
import { checkCamera } from '../cameras/camSlice';

const PAGE_SIZE = 14

// DATA
const initialState = {
    // Total images
    list       : [], // images for the selected cameras
    status     : 'empty', //TODO split into loadStatus + actionStatus
    hasMore    : false,
    // Checked images
    checked    : {} // checked images to make action for
}
export const selectImages  = (state) => state.images;
export const getImageKey   = (image) => `${image.id}-${image.time}`

//---------------------------------------------------------------------------------------
// MIDDLEWARE ASYNC THUNKS 
export const loadImagesTail = createAsyncThunk(
    'images/load',
    async (checkedCameras, { getState }) => {
        const state = getState()
        const { list } = selectImages(state);
       // const checkedCameras = selectCheckedCameras(state) - can be received from camSlice

        // Calculate parameters
        const ids = Object.keys(checkedCameras)
        const minTime = list.length>0?list[list.length-1].time : null

        let data = await backend.apiRequest('POST','/cameras/load_images',
            {  
                ids,            
                limit : PAGE_SIZE,
                before: minTime
            })
        //await new Promise((resolve)=>{setTimeout(() => {resolve()}, 1000)})// FOR DEBUG

        // The value we return becomes the `fulfilled` action payload
        return data;
    }
);
export const deleteChecked = createAsyncThunk(
    'images/deleteChecked',
    async (_, { getState }) => {

        const state = getState()
        const { checked } = selectImages(state);

        // Calculate parameters
        let keys = []
        for(const image of Object.values(checked)){
            keys.push({id:image.id, time:image.time})
        }
        console.log('========= images: start deleting...', keys)
        let data = await backend.apiRequest('POST','/cameras/remove_images',
            { keys })

        // The value we return becomes the `fulfilled` action payload
        return;
    }
);

//------------------------------------------------------------------------------------
// THE SLICE
const slice = createSlice({
    name: "images",
    initialState,
    reducers:{
        clear: (state) => initialState,
        check: (state, action)=>{
            const img = action.payload
            const key = getImageKey(img)
            if( state.checked[key]===undefined) 
                state.checked[key]=img //append
            else
                delete state.checked[key] //remove
        },
        clearChecked: (state) => {
            state.checked = {}
        }

    },
    extraReducers:{
        [loadImagesTail.pending]: state=>{
            state.status = 'pending'
            state.hasMore = false
        },      
        [loadImagesTail.fulfilled]: (state,action)=>{
            const tail = action.payload;
            state.status = 'fulfilled';
            state.list.push(...tail)
            state.hasMore = tail.length==PAGE_SIZE

        },      
        [loadImagesTail.rejected]: state=>{
            state.status = 'rejected'
            state.hasMore = true
        },      

        [deleteChecked.pending]: state=>{
            state.status = 'pending'
        },      
        [deleteChecked.fulfilled]: state=>{
            state.status = 'fulfilled';
            state.list = state.list.filter(
                img=>!state.checked[getImageKey(img)])// remove checked from the list
            state.checked = {} // clear checked
        },      
        [deleteChecked.rejected]: state=>{
            state.status = 'rejected'
        },    
        
        // camSlice reducer
        [checkCamera]: state=>{
            Object.assign(state,initialState) //state = initialState - doesn't work!!!
        }
    }
});
export const { clearChecked } = slice.actions;

//---------------------------------------------------------------------------------------
// CUSTOM MIDDLEWARE

export default slice.reducer;



