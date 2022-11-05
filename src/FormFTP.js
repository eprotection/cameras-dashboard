import React,{Fragment, useState} from "react";
import {useObjectInputState} from "./FormUtils"
import {apiRequest} from './Backend'

const FormFTP = ({ftp, useFolder, onFinished, onSaveAsync})=>{

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

    const testConnection = ()=>{
        console.log('FormFTP testConnection')
        setError(null)
        setBusy(true)

        apiRequest('POST','/cameras/verify_ftp',data)
            .then(()=>{
                setBusy(false)
                setError('PASSED')
            })
            .catch(error=>{
                setBusy(false)
                setError(error.toString())
            })
    }

    return (
    <form>

        <div className="input-table">
            <i>User</i>{renderTextInput('user')}
            <i>Host</i>{renderTextInput('host')}
            <i>Pass</i>{renderTextInput('password')}
        {useFolder&&
            <><i>Folder</i>{renderTextInput('folder')}</>}
        </div>

        <div>
            <span className="btn clk" 
                onClick={testConnection}>Test Connection</span>
        </div>

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

