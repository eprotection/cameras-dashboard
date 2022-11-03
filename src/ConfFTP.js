import React,{Fragment, useState} from "react";

const ConfFTP = ({ftp,onClick})=>{
    
    console.log(`ConFTP render`)

    return (<div>
            FTP:<span className="ftp clk"
                onClick={onClick}>
                    {ftp?`${ftp.user}@${ftp.host}`:"[user@host]"}
                </span>
        </div>)
}
export default React.memo(ConfFTP);