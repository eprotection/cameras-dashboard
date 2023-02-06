import React,{useState} from "react";
import ConfFTP from './ConfFTP'
import FormFTP from "./FormFTP"
import { useSelector } from 'react-redux';
import { selectAuth } from '../auth/authSlice'
import { usePrefs, FTP_SERVER_ID,IP_SERVER_ID } from './prefs'
import { useDialog } from "../dialog";
import { createPortal } from 'react-dom';

const Settings = ({hide})=>{
    const {user} = useSelector(selectAuth)

    const {prefs,error,savePref} = usePrefs()

    // DIALOGS
    const {dialog,showDialog,hideDialog} = useDialog()
    const showFtpDialog = ()=>showDialog(
        'Cameras FTP',
        <FormFTP 
            ftp={prefs[FTP_SERVER_ID]}
            useFolder={false}
            onFinished={hideDialog}
            onSaveAsync={async (value)=>{await savePref(FTP_SERVER_ID,value)}}
        />
    )
    const showIpDialog = ()=>showDialog(
        'Image Processor FTP',
        <FormFTP 
            ftp={prefs[IP_SERVER_ID]}
            useFolder={true}
            onFinished={hideDialog}
            onSaveAsync={async (value)=>{await savePref(IP_SERVER_ID,value)}}
        />
    )

    // RENDER
    console.log(`=>Settings prefs:`, prefs)
    const renderPrefs = ()=>
    <div className="input-table">
        <div><i>Cameras FTP:</i><ConfFTP data={prefs[FTP_SERVER_ID]} onClick={user?showFtpDialog:null}/></div>
        <div><i>IP FTP:     </i><ConfFTP data={prefs[IP_SERVER_ID]}  onClick={user?showIpDialog:null}/></div>
    </div>

  
    return createPortal(<>
    <div className="dialog-fog">
        <div className="dialog">
            <div className="title">SETTINGS</div>
            {prefs && renderPrefs()}
            {error && <div>{error}</div>}
            {!prefs&&!error && <div>Loading prefs...</div>}
            <div className="bar">
                <span className="btn clk" 
                    onClick={hide}>Close</span>
            </div>
        </div>
    </div>
    
    {dialog}
    
    </>, document.getElementById('app'))
}
export default Settings