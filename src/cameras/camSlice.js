import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backend from '../Backend'

// DATA
const initialState = {
    mt       : 0,
    list     : null,
    error    : null,
    checked  : {} // checked cameras to show images for
}

export const selectCameras         = (state) => state.cameras;
export const selectCheckedCameras  = (state) => state.cameras.checked;

//---------------------------------------------------------------------------------------
// ASYNC ACTIONS ( THUNKS )
export const loadCamerasChanges = createAsyncThunk(
    'cameras/load',
    async (_, { getState }) => {
        const {mt} = selectCameras(getState());
        console.log('cameras: start loading...', mt)
        let data = await backend.apiRequest('POST','/cameras/load_list',{mt})

        await new Promise((resolve)=>{setTimeout(() => {resolve()}, 1000)})// FOR DEBUG

        console.log('cameras:',data)
        // The value we return becomes the `fulfilled` action payload
        return data;
    }
);

//---------------------------------------------------------------------------------------
// CUSTOM MIDDLEWARE
// export const loadCamerasChanges = () => (dispatch, getState) => {
//     const {mt} = selectCameras(getState());
//     dispatch(loadList(mt));
// };


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
                delete state.checked[cam.id] //remove
        },
    },
    extraReducers:{
        [loadCamerasChanges.pending]: state=>{
            state.list  = null
            state.error = null
        },      
        [loadCamerasChanges.fulfilled]: (state,action)=>{
            state.mt   = action.payload.mt
            state.list = action.payload.results
            state.error = null
        },      
        [loadCamerasChanges.rejected]: (state,action)=>{
            state.list = null
            state.error = action.error?.message
        },      
    }
});
export const { checkCamera } = slice.actions;


export default slice.reducer;
