import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const IMAGE_STATUSES = new Map([
    [10, 'original'],
    [20, 'processing'],
    [30, 'classified'],
    [40, 'not-classified']
])
const makeInitialStatusFilter = ()=>{
    const f = {}
    IMAGE_STATUSES.forEach((_,key)=>{f[key]=true}) // TODO load from localStorage
    return f
}

// DATA
const initialState = {
    statusFilter : makeInitialStatusFilter()
}

export const selectFilters         = (state) => state.filters;

export const makeFiltersRequest = (state)=>{
    const { statusFilter } = selectFilters(state)
    const statuses = []
    Object.entries(statusFilter).forEach(([key,value])=>{
        if(value) statuses.push(key)
    })
    return {statuses}
}

//------------------------------------------------------------------------------------
// THE SLICE
const slice = createSlice({
    name: "filters",
    initialState,
    reducers:{
        setStatusFilter: (state, action)=>{
            state.statusFilter = action.payload
        },
    },
});
export const { setStatusFilter } = slice.actions;


export default slice.reducer;
