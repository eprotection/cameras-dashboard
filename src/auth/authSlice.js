import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backend from '../Backend'

// DATA

const initialState = {
    ws       : (new URL(window.location)).searchParams.get('ws'),// ws id
    workspace: null, //ws info received from server, null means reload required
    user     : null,
    error    : null,
}

export const selectAuth         = (state) => state.auth;

//---------------------------------------------------------------------------------------
// ASYNC ACTIONS ( THUNKS )
export const loadAuth = createAsyncThunk(
    'auth/load',
    async (_,{ getState }) => {
        const state = getState()
        const {ws} = selectAuth(state);
        if(!ws) throw 'parameter "ws" is not present in the URL query'

        // Init API
        backend.apiInit(ws)
        // Load ws info
        const workspace = await backend.apiRequest('GET','/')

        // Load user info
        let user = null
        try{
            const auth = await backend.apiRequest('GET','/auth/info')
            user = {
                name : auth.user.name,
                role : auth.role.name
            }
        }catch(e){
            if(!workspace.prefs?.allowPublic) throw e
        }

        // The value we return becomes the `fulfilled` action payload
        return {
            workspace,
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



