import {useState} from "react";
import { createPortal } from 'react-dom';


const Dialog=({title,children})=>createPortal(
    <div className="dialog-fog">
        <div className="dialog">
            <div className="title">{title}</div>
            {children}
        </div>
    </div>, 
    document.getElementById('app')
)

export default Dialog

export const useDialog = ()=>{
    const [dialog,setDialog] = useState(null)
    const showDialog = (dlg)=>setDialog(dlg)
    const hideDialog =  ()  =>setDialog(null) 

    return {dialog,showDialog,hideDialog}
}
