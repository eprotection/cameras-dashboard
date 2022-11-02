import React,{Fragment, useState} from "react";

import useInputState from './useInputState';

const FormFTP = ({ftp, onCancel, onOK})=>{

    const user = useInputState(ftp?ftp.user:'');
    const host = useInputState(ftp?ftp.host:'');
    const pass = useInputState(ftp?ftp.password:'');
    
    console.log(`FormFTP render, ${user.value}@${host.value}`)

    return (
    <form>
        <div>User<input 
            type='text' 
            onChange={user.onChange}
            value={user.value}/></div>
        <div>Host<input 
            type='text' 
            onChange={host.onChange}
            value={host.value}/></div>
        <div>Pass<input 
            type='text' 
            onChange={pass.onChange}
            value={pass.value}/></div>
        <div className="bar">
            <span className="btn clk" 
                onClick={onCancel}>Cancel</span>
            <span className="btn clk" 
                onClick={()=>{onOK({user:user.value, host:host.value, pass:pass.value})}}>Save</span>
        </div>
    </form>)

}
export default FormFTP;

