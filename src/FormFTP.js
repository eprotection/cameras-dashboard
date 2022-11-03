import React,{Fragment, useState} from "react";

const FormFTP = ({ftp, onFinished, onSaveAsync})=>{

    // Input data
    const [user, setUser] = useState(ftp?ftp.user:'');
    const [host, setHost] = useState(ftp?ftp.host:'');
    const [pass, setPass] = useState(ftp?ftp.password:'');
    // Saving state
    const [busy,  setBusy]  = useState(false)
    const [error, setError] = useState(null)
    
    console.log(`FormFTP render, ${user}@${host}`)

    const onInput = ()=>{
        setError(null)
    }

    const onSave = ()=>{
        console.log('FormFTP onSave')
        setError(null)
        setBusy(true)
        onSaveAsync({user:user,host:host,password:pass})
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
        <div>User<input 
            type='text' 
            onChange={e=>{setUser(e.target.value); onInput();}}
            value={user}/></div>
        <div>Host<input 
            type='text' 
            onChange={e=>{setHost(e.target.value); onInput();}}
            value={host}/></div>
        <div>Pass<input 
            type='text' 
            onChange={e=>{setPass(e.target.value); onInput();}}
            value={pass}/></div>
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

