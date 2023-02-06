import React, {useState} from "react"
import {useFormInput} from "../FormUtils"
import backend from '../Backend'

const valOrEmpty = (value)=>value?value:''

const onCamUpdated=()=>{}//STUB!

const CamEditor = ({cam, hideDialog})=>{
    // Input
    const onChange=()=>{if(error)setError(null)}
    const name     = useFormInput(cam.name,               onChange);
    const folder   = useFormInput(valOrEmpty(cam.folder), onChange);
    const prefix   = useFormInput(valOrEmpty(cam.prefix), onChange);

    // Saving state
    const [busy,  setBusy]  = useState(false)
    const [error, setError] = useState(null)

    const onSave = ()=>{
        console.log('CamEditor onSave')
        setError(null)
        setBusy(true)
        let newCam = {...cam}
        newCam.name   = name.value
        newCam.folder = folder.value
        newCam.prefix = prefix.value

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
            <div><i>ID</i><b>{cam.id}</b></div>
            <div><i>Name</i>  <input type='text' {...name} /></div>
            <div><i>Folder</i><input type='text' {...folder}/></div>
            <div><i>Prefix</i><input type='text' {...prefix}/></div>
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

export default CamEditor