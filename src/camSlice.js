import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backend from './Backend'

// DATA
const initialState = {
    mt       : 0,
    list     : [],
    selCamID : null,
    status   : 'empty'
}

export const selectCameras  = (state) => state.cameras;

// Async action
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

// Dependent on state action
export const loadCamerasChanges = () => (dispatch, getState) => {
    const {mt} = selectCameras(getState());
    dispatch(loadList(mt));
};

//------------------------------------------------------------------------------------
// THE SLICE
const slice = createSlice({
    name: "cameras",
    initialState,
    reducers:{

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

export default slice.reducer;
