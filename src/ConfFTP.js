import React,{Fragment, useState, useEffect} from "react";

const ConfFTP = ({ftp})=>{

    const [isOpen,setOpen] = useState(false)
    

    console.log(`ConFTP render, isOpen=${isOpen}`)

    const renderDialog = ()=>(<div className="dialog-fog">
        <div className="dialog">
            <div className="title">FTP Settings</div>
            <div>DIALOG</div>
            <div>DIALOG</div>
            <div>DIALOG</div>
            <div>DIALOG</div>
            <div className="bar">
                <span className="btn clk" onClick={()=>{setOpen(false)}}>Cancel</span>
                <span className="btn clk">Save</span>
            </div>
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