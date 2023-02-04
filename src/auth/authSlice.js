import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backend from '../Backend'

// DATA
const initialState = {
    ws       : null,
    prefs    : {},
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

        // Load prefs (before auth)
        const prefs = await loadPrefs()

        // Load user info
        let user = null
        try{
            const auth = await backend.apiRequest('GET','/auth/info')
            user = {
                name : auth.user.name,
                role : auth.role.name
            }
        }catch(e){
            if(!prefs.allowPublic) throw e
        }

        // The value we return becomes the `fulfilled` action payload
        return {
            ws,
            prefs,
            user
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

//----------------------------------------------------------------------------
// PREFS
var mtPrefs   = 0
const ALLOW_PUBLIC_ID= 2005
const FTP_SERVER_ID  = 2021
const IP_SERVER_ID   = 2025

async function loadPrefs(){
    // Load
    console.log('prefs: start loading...')
    let data = await backend.apiRequest('POST','/prefs/load_prefs',{mt:mtPrefs})
    //mtPrefs = data.till_mt
    console.log('prefs:',data)
    // Update
    const prefs = {}
    for(const pref of data.results){
      switch(pref.id){
          case ALLOW_PUBLIC_ID: prefs.allowPublic = pref.value; break;
          case FTP_SERVER_ID:   prefs.ftp         = pref.value; break;
          case IP_SERVER_ID:    prefs.ip          = pref.value; break;
      }
    }
    return prefs
}

async function savePref(id, value){
    let data = await backend.apiRequest('POST','/prefs/set_common_pref',
        {id    : id, 
         value : value})
    console.log('savePref finished:',data)
    // Reload prefs
    this.loadPrefs()
}


