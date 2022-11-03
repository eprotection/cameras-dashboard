import React,{Fragment, useState} from "react";
import {useObjectInputState} from "./FormUtils"

const FormFTP = ({ftp, onFinished, onSaveAsync})=>{

    // Input data object
    const {data, renderTextInput} = useObjectInputState(ftp,()=>{setError(null)});
    // Saving state
    const [busy,  setBusy]  = useState(false)
    const [error, setError] = useState(null)
    
    console.log(`FormFTP render, ${data.user}@${data.host}`)


    const onSave = ()=>{
        console.log('FormFTP onSave')
        setError(null)
        setBusy(true)
        onSaveAsync(data)
            .then(()=>{
                console.log('FormFTP saving success')
                onFinished()
            })
            .catch(error=>{
                console.log('FormFTP saving error',error)
                setBusy(false)
                setError(error.toString())
            })
    }

    return (
    <form>
        <div>User{renderTextInput('user')}</div>
        <div>Host{renderTextInput('host')}</div>
        <div>Pass{renderTextInput('password')}</div>
        <div className="message">
            {error && <span className="err">{error}</span>}
        </div>
        <div className="bar">
            <span className="btn clk" 
                onClick={onFinished}>Cancel</span>
            <span className="btn clk" 
                onClick={onSave}>Save</span>
        </div>
        {busy && <div className="fog"></div>}
    </form>)

}
export default FormFTP;

