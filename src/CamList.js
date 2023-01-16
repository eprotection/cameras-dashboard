import React,{useEffect} from "react"
import CamRow from './CamRow'
import './style/Camera.css';
import { useSelector, useDispatch } from 'react-redux';
import {selectCameras, loadCamerasChanges} from './camSlice'
import { selectActiveCameras} from "./imgSlice";


export default (props)=>{
    const {status, list}= useSelector(selectCameras)
    const activeCameras = useSelector(selectActiveCameras)


    console.log(`=> CamList ${status} ${list.length}`)

    const dispatch = useDispatch()

    useEffect(()=>{dispatch(loadCamerasChanges())},[])

    const {cameras, selCamID, isEditable} = props
    console.log(`CamList render  isEditable:${isEditable}`)

    // Calculate total a-la cam
    let total = {
        id          : 'all',
        name        : "ALL CAMERAS",
        img_num     : 0,
        img_lasttime: null
    }

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
            isSelected={activeCameras[cam.id]!==undefined}
            isEditable={isEditable}
        />
    })
        
    return <>
        <div className="row-header">
            <span>name</span><span>last</span><span>total</span>
        </div>
        
        <CamRow 
            key='all'
            cam={total}
            isSelected={total.id==selCamID} />

        {rows}

        {status!=='fulfilled' &&
        <div className="row-status">{status}</div>}

    </>
}
