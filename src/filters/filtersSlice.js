import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const IMAGE_STATUSES = new Map([
    [10, 'original'],
    [20, 'processing'],
    [30, 'classified'],
    [40, 'not-classified']
])
const makeInitialStatusFilter = ()=>{
    const statusFilter = {}
    let json = window.localStorage?.getItem('statusFilter')
    const stored = json ? JSON.parse(json) : null
    IMAGE_STATUSES.forEach((_,key)=>{
        statusFilter[key]=stored?Boolean(stored[key]):true //default true
    }) 
    return statusFilter
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
// MIDDLEWARE
export const setStatusFilter = (newStatusFilter) => (dispatch, getState) => {
    const {statusFilter} = selectFilters(getState())
    // TODO check if equal
    //...

    // Save in the local storage
    window.localStorage?.setItem('statusFilter',JSON.stringify(newStatusFilter))

    // Do action
    dispatch(slice.actions.updateStatusFilter(newStatusFilter))
}

//------------------------------------------------------------------------------------
// THE SLICE
const slice = createSlice({
    name: "filters",
    initialState,
    reducers:{
        updateStatusFilter: (state, action)=>{
            state.statusFilter = action.payload
        },
    },
});
export const { updateStatusFilter } = slice.actions;


export default slice.reducer;
