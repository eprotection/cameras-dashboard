import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backend from '../Backend'

// DATA
const initialState = {
    ws       : null,
    user     : null,
    error    : null
}

export const selectAuth         = (state) => state.auth;

//---------------------------------------------------------------------------------------
// ASYNC ACTIONS ( THUNKS )
export const loadAuth = createAsyncThunk(
    'auth/load',
    async () => {
        // Load ws info
        const ws = await backend.apiRequest('GET','/')

        // Load user info
        let user = null
        try{
            const auth = await backend.apiRequest('GET','/auth/info')
            user = {
                name : auth.user.name,
                role : auth.role.name
            }
        }catch(e){
            if(!ws.prefs?.allowPublic) throw e
        }

        // The value we return becomes the `fulfilled` action payload
        return {
            ws,
            user,
            error:null
        }
    }
);


//------------------------------------------------------------------------------------
// THE SLICE
const slice = createSlice({
    name: "auth",
    initialState,
    reducers:{
    },
    extraReducers:{
    //     [loadAuth.pending]: state=>{
    //         state.status = 'pending';
    //     },      
        [loadAuth.fulfilled]: (state,action)=>{
            Object.assign(state,action.payload)
        },      
        [loadAuth.rejected]: (state,action)=>{
            console.log(action)
            state.error = action.error.message
        },      
    }
});
//export const { checkCamera } = slice.actions;


export default slice.reducer;



