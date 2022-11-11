import React, {useState} from "react"
import { hideDialog, onCamUpdated } from "./App"
import {useInputState} from "./FormUtils"
import backend from './Backend'

const valOrEmpty = (value)=>value?value:''

export default ({cam})=>{
    // Input
    const onChange=()=>{if(error)setError(null)}
    const [name,   onChangeName]   = useInputState(cam.name,               onChange);
    const [folder, onChangeFolder] = useInputState(valOrEmpty(cam.folder), onChange);
    const [prefix, onChangePrefix] = useInputState(valOrEmpty(cam.prefix), onChange);

    // Saving state
    const [busy,  setBusy]  = useState(false)
    const [error, setError] = useState(null)

    const onSave = ()=>{
        console.log('CamEditor onSave')
        setError(null)
        setBusy(true)
        let newCam = {...cam}
        newCam.name = name
        newCam.folder = folder
        newCam.prefix = prefix

        backend.apiRequest('POST','/cameras/update_camera',newCam)
            .then(()=>{
                console.log('CamEditor save success')
                hideDialog()
                onCamUpdated(newCam)
            })
            .catch(error=>{
                console.log('CamEditor save error',error)
                setBusy(false)
                setError(error.toString())
            })
    }

    
    console.log(`CamEditor render, ${cam.name}`)
    
    return (<form>
        <div className="input-table">
            <i>ID</i><b>{cam.id}</b>
            <i>Name</i>  <input type='text' value={name}   onChange={onChangeName}/>
            <i>Folder</i><input type='text' value={folder} onChange={onChangeFolder}/>
            <i>Prefix</i><input type='text' value={prefix} onChange={onChangePrefix}/>
        </div>

        <div className="message">
            {error && <span className="err">{error}</span>}
        </div>

        <div className="bar">
            <span className="btn clk" 
                onClick={hideDialog}>Cancel</span>
            <span className="btn clk" 
                onClick={onSave}>Save</span>
        </div>

        {busy && <div className="fog"></div>}


    </form>)
}