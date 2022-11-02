import React,{Fragment, useState} from "react";
import FormFTP from "./FormFTP"

const ConfFTP = ({ftp})=>{

    const [isOpen,setOpen] = useState(false)
    
    console.log(`ConFTP render, isOpen=${isOpen}`)

    const onSave = (ftpNew)=>{
        console.log('ConfFTP onSave',ftpNew)
    }

    const renderDialog = ()=>(<div className="dialog-fog">
        <div className="dialog">
            <div className="title">FTP Settings</div>
                <FormFTP 
                ftp={ftp}
                onCancel={()=>{setOpen(false)}}
                onOK={onSave}
                />
        </div>
    </div>)

    return (<Fragment>
        <div>
            FTP:<span className="ftp clk"
                onClick={()=>{setOpen(true)}}
                >{ftp?`${ftp.user}@${ftp.host}`:"[user@host]"}</span>
        </div>
        {isOpen && renderDialog()}
    </Fragment>)
}
export default React.memo(ConfFTP);