import {useState,useEffect, useDebugValue} from "react";
import backend from '../Backend'

//----------------------------------------------------------------------------
// PREFS
var mtPrefs   = 0
const ALLOW_PUBLIC_ID= 2005
export const FTP_SERVER_ID  = 2021
export const IP_SERVER_ID   = 2025

async function loadPrefs(){
    // Load
    let data = await backend.apiRequest('POST','/prefs/load_prefs',{mt:mtPrefs})
    //mtPrefs = data.till_mt

    // PROCESS [{id,value}, ... ] TO {id:value, ...}
    const prefs = {}
    for(const pref of data.results){
        prefs[pref.id] = pref.value
    }
    return prefs
}

export const usePrefs = ()=>{
    const [prefs, setPrefs] = useState(null)
    const [error, setError] = useState(null)

    useDebugValue(prefs)
    
    useEffect(()=>{
        loadPrefs()
        .then(p=>setPrefs(p))
        .catch(err=>setError(err.message))
    },[])

    async function savePref(id, value){
        try{
            let data = await backend.apiRequest('POST','/prefs/set_common_pref',
                {id    : id, 
                value : value})
            // Upadte state
            let p = {...prefs, [id]:value}
            setPrefs(p)
        }catch(err){
            alert(err.message)
        }
    }
    
    return {prefs, error, savePref}
}
