import React,{useState} from "react";
import ConfFTP from './ConfFTP'
import FormFTP from "./FormFTP"
import { useSelector } from 'react-redux';
import { selectAuth } from '../auth/authSlice'
import { usePrefs, FTP_SERVER_ID,IP_SERVER_ID } from './prefs'
import Dialog, {useDialog} from "../Dialog";

const Settings = ({hide,children})=>{
    const {user} = useSelector(selectAuth)

    const {prefs,error,savePref} = usePrefs()

    // DIALOGS
    const {dialog,showDialog,hideDialog} = useDialog()
    const showFtpDialog = ()=>showDialog(
        <Dialog title='Cameras FTP'>
            <FormFTP 
                ftp={prefs[FTP_SERVER_ID]}
                useFolder={false}
                onFinished={hideDialog}
                onSaveAsync={async (value)=>{await savePref(FTP_SERVER_ID,value)}}
            />
        </Dialog>
    )
    const showIpDialog = ()=>showDialog(
        <Dialog title='Image Processor FTP'>
            <FormFTP 
                ftp={prefs[IP_SERVER_ID]}
                useFolder={true}
                onFinished={hideDialog}
                onSaveAsync={async (value)=>{await savePref(IP_SERVER_ID,value)}}
            />
        </Dialog>
    )

    // RENDER
    console.log(`=>Settings prefs:`, prefs)
    const renderPrefs = ()=>
    <div className="input-table">
        <div><i>Cameras FTP:</i><ConfFTP data={prefs[FTP_SERVER_ID]} onClick={user?showFtpDialog:null}/></div>
        <div><i>IP FTP:     </i><ConfFTP data={prefs[IP_SERVER_ID]}  onClick={user?showIpDialog:null}/></div>
    </div>

  
    return <Dialog title="SETTINGS">
        {children}
        {prefs && renderPrefs()}
        {error && <div>{error}</div>}
        {!prefs&&!error && <div>Loading prefs...</div>}
        <div className="bar">
            <span className="btn clk" 
                onClick={hide}>Close</span>
        </div>
    
        {dialog}
    
    </Dialog>
}
export default Settings