import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backend from '../Backend'
import { updateStatusFilter, makeFiltersRequest } from '../filters/filtersSlice';

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
// CUSTOM MIDDLEWARE (THUNKS)
export const loadCamerasChanges = createAsyncThunk(
    'cameras/load',
    async (_, { getState }) => {
        const state = getState()
        const {mt} = selectCameras(state);

        const filters = makeFiltersRequest(state)

        console.log('cameras: start loading...', mt)
        let data = await backend.apiRequest('POST','/cameras/load_list',
            {
                mt,
                ...filters
            })

        //await new Promise((resolve)=>{setTimeout(() => {resolve()}, 1000)})// FOR DEBUG

        console.log('cameras:',data)
        // The value we return becomes the `fulfilled` action payload
        return data;
    }
);

export const checkCamera = (cam) => (dispatch, getState) => {
    console.log('checkCamera',cam.id)
    const checked = selectCheckedCameras(getState())
    if(checked[cam.id]) return
    dispatch(updateCheckedCameras( {[cam.id]:cam} ))

    //const cam = action.payload
    // if( state.checked[cam.id]===undefined) 
    //     state.checked[cam.id]=cam //append
    // else
    //     delete state.checked[cam.id] //remove

    // const {mt} = selectCameras(getState());
    // dispatch(loadList(mt));
};


//------------------------------------------------------------------------------------
// THE SLICE
const slice = createSlice({
    name: "cameras",
    initialState,
    reducers:{
        updateCheckedCameras: (state, action)=>{
            state.checked = action.payload
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

        // CLEAR ON FILTERS CHANGE
        // filtersSlice reducer
        [updateStatusFilter]: state=>{
            // set 'need to rload' status !!!
            state.mt = 0
        },

    }
});
export const { updateCheckedCameras } = slice.actions;


export default slice.reducer;
