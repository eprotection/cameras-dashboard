import React,{useState} from "react";

export const useDialog = ()=>{
    const [dialog,setDialog] = useState(null)
    const showDialog = (title, form)=>{
        setDialog(
            <div className="dialog-fog">
                <div className="dialog">
                    <div className="title">{title}</div>
                        {form}
                </div>
            </div>)
    }
    const hideDialog = ()=>{ setDialog(null) }

    return {dialog,showDialog,hideDialog}
}