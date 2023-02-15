// IMAGES FOR A SET OF CAMERAS

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backend from '../Backend'
import { selectCheckedCameras,updateCheckedCameras } from '../cameras/camSlice';
import { setStatusFilter } from '../filters/filtersSlice';

const PAGE_SIZE = 14

// DATA
const initialState = {
    // Total images
    list       : [], // images for the selected cameras
    status     : 'empty', //TODO split into loadStatus + actionStatus ?
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
    async (_, { getState }) => {
        // Load filters
        const state = getState()
        const { list } = selectImages(state);
        const checkedCameras = selectCheckedCameras(state)
        const ids = Object.keys(checkedCameras)

        // Verify filters
        if(ids.length==0) return [] //empty but fulfilled!!!

        // Calculate min time
        const minTime = list.length>0?list[list.length-1].time : null

        // DO REQUEST
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
        
        // CLEAR ON FILTERS CHANGE
        // camSlice reducer
        [updateCheckedCameras]: state=>{
            // set 'empty' status !!!
            Object.assign(state,initialState) //state = initialState - doesn't work!!!
        },
        // filtersSlice reducer
        [setStatusFilter]: state=>{
            // set 'empty' status !!!
            Object.assign(state,initialState) //state = initialState - doesn't work!!!
        },
    }
});
export const { clearChecked } = slice.actions;

//---------------------------------------------------------------------------------------
// CUSTOM MIDDLEWARE

export default slice.reducer;



