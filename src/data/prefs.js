import {useState} from "react"
import {backend} from '../Backend'

var mt = 0
const FTP_SERVER_ID  = 2021
const IP_SERVER_ID   = 2025

export default () => {
    
    // Not just an object but register in the state machine
    const [ftp, setFTP] = useState(null);
    const [ip,  setIP]  = useState(null);
    
    // The object
    return {
        ftp : ftp,
        ip  : ip,

        load : async () => {
            let data = await backend.request('POST','/prefs/load_prefs',{mt:mt})
            mt = data.till_mt
            console.log('prefs:',data)
            for(const pref of data.results){
                switch(pref.id){
                    case FTP_SERVER_ID: setFTP(pref.value); break;
                    case IP_SERVER_ID:  setIP (pref.value); break;
                }
            }
        },

        saveFTP : async (value) => {
            let data = await backend.request('POST','/prefs/set_common_pref',
                {id    : FTP_SERVER_ID, 
                 value : value})
            console.log('saveFTP finished:',data)
            // Update by local value
            setFTP(value)
        },

        saveIP : async (value) => {
            let data = await backend.request('POST','/prefs/set_common_pref',
                {id    : IP_SERVER_ID, 
                 value : value})
            console.log('saveIP finished:',data)
            // Update by local value
            setIP(value)
        }
    }
}