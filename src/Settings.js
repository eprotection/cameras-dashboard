import React,{useState} from "react";
import ConfFTP from './ConfFTP'
import FormFTP from "./FormFTP"
import { useSelector } from 'react-redux';
import { selectAuth,FTP_SERVER_ID,IP_SERVER_ID } from './auth/authSlice'
import { useDialog } from "./dialog";

export default ({hide})=>{
    const {user,prefs} = useSelector(selectAuth)

    const savePref = async ()=>{}


    // DIALOGS
    const {dialog,showDialog,hideDialog} = useDialog()
    const showFtpDialog = ()=>showDialog(
        'Cameras FTP',
        <FormFTP 
            ftp={prefs.ftp}
            useFolder={false}
            onFinished={hideDialog}
            onSaveAsync={async (value)=>{await savePref(FTP_SERVER_ID,value)}}
        />
    )
    const showIpDialog = ()=>showDialog(
        'Image Processor FTP',
        <FormFTP 
            ftp={prefs.ip}
            useFolder={true}
            onFinished={hideDialog}
            onSaveAsync={async (value)=>{await savePref(IP_SERVER_ID,value)}}
        />
    )
  
    return (<>
    <div className="dialog-fog">
        <div className="dialog">
            <div className="title">SETTINGS</div>
            <div className="input-table">
                <div><i>Cameras FTP:</i><ConfFTP data={prefs.ftp} onClick={user?showFtpDialog:null}/></div>
                <div><i>IP FTP:     </i><ConfFTP data={prefs.ip}  onClick={user?showIpDialog:null}/></div>
            </div>
            <div className="bar">
                <span className="btn clk" 
                    onClick={hide}>Close</span>
            </div>
        </div>
    </div>
    
    {dialog}
    
    </>)
}