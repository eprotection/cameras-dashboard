import React,{Fragment, useState} from "react";

const ConfFTP = ({label,data,onClick})=>{
    
    console.log(`ConFTP render`)

    return (<div>
            {label}<span className="ftp clk"
                onClick={onClick}>
                    {data?`${data.user}@${data.host}`:"[user@host]"}
                </span>
        </div>)
}
export default React.memo(ConfFTP);