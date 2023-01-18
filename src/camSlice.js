import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backend from './Backend'

// DATA
const initialState = {
    mt       : 0,
    list     : [],
    status   : 'empty',
    checked  : {} // checked cameras to show images for
}

export const selectCameras         = (state) => state.cameras;
export const selectCheckedCameras  = (state) => state.cameras.checked;

//---------------------------------------------------------------------------------------
// ASYNC ACTIONS ( THUNKS )
const loadList = createAsyncThunk(
    'cameras/load_list',
    async (mt) => {
        console.log('cameras: start loading...')
        let data = await backend.apiRequest('POST','/cameras/load_list',{mt})

        await new Promise((resolve)=>{setTimeout(() => {resolve()}, 1000)})// FOR DEBUG

        console.log('cameras:',data)
        // The value we return becomes the `fulfilled` action payload
        return data;
    }
);

//------------------------------------------------------------------------------------
// THE SLICE
const slice = createSlice({
    name: "cameras",
    initialState,
    reducers:{
        checkCamera: (state, action)=>{
            const cam = action.payload
            if( state.checked[cam.id]===undefined) 
                state.checked[cam.id]=cam //append
            else
                state.checked[cam.id]=undefined //remove
        },
    },
    extraReducers:{
        [loadList.pending]: state=>{
            state.status = 'pending';
        },      
        [loadList.fulfilled]: (state,action)=>{
            state.status  = 'fulfilled';
            state.mt   = action.payload.mt;
            state.list = action.payload.results;
        },      
        [loadList.rejected]: state=>{
            state.status = 'rejected';
        },      
    }
});
export const { checkCamera } = slice.actions;

//---------------------------------------------------------------------------------------
// CUSTOM MIDDLEWARE
//TODO move to slice
export const loadCamerasChanges = () => (dispatch, getState) => {
    const {mt} = selectCameras(getState());
    dispatch(loadList(mt));
};


export default slice.reducer;
