import React,{useEffect,useCallback} from "react"
import CamRow from './CamRow'
import './Camera.css';
import { useSelector, useDispatch } from 'react-redux';
import {selectCameras, loadCamerasChanges} from './camSlice'
import { useDialog } from "../dialog";
import CamEditor from './CamEditor'
import {formatDate} from "../Utils"


const CamList = ({isEditable})=>{
    const {list, error, checked}= useSelector(selectCameras)

    console.log(`=> CamList`)

    const dispatch = useDispatch()

    useEffect(()=>{dispatch(loadCamerasChanges())},[])

    const {dialog,showDialog,hideDialog} = useDialog()
    const showCamEditor = useCallback( cam=>{
        console.log("showCamEditor cam:",cam)
        showDialog(
            'Camera Editor',
            <CamEditor cam={cam} hideDialog={hideDialog}/>
        )
      
    },[])


    //------------------------------------------------------------------------
    // RENDER
    // Calculate total by the way
    let total = {
        img_num     : 0,
        img_lasttime: null
    }
    
    const renderList = ()=>{
        const rows = [...list]
        .sort((a,b)=>a.name.localeCompare(b.name))
        .map(cam=>{            
            total.img_num += cam.img_num
            let lst = cam.img_lasttime
            if(lst){
                if(!total.img_lasttime)
                    total.img_lasttime = lst
                else if(lst>total.img_lasttime)
                    total.img_lasttime = lst
            }
    
            return <CamRow 
                key={cam.id.toString()}
                cam={cam}
                isSelected={checked[cam.id]!==undefined}
                isEditable={isEditable}
                showCamEditor={showCamEditor}
            />
        })

        return <>
            <div className="cam-header">
                <span>name</span><span>last</span><span>total</span>
            </div>
            
            <div className="cam-list">
                {rows}
            </div>

            <div className="cam-footer">
                <span></span><span>{formatDate(total.img_lasttime)}</span><span>{total.img_num}</span>
            </div>
        </>
    }

    return <div className="cam-container">
        {list && renderList()}
        {error&&          <div className="cam-status err">Cameras loading error:<br/>{error}</div>}
        {!list&&!error && <div className="cam-status">Cameras loading...</div>}

        {dialog}

    </div>
}
export default CamList
