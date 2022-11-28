import React from "react"
import CamRow from './CamRow'
import './style/Camera.css';

export default class CamList extends React.PureComponent{

    render(){
        const {cameras, selCamID, isEditable} = this.props
        console.log(`CamList render  isEditable:${isEditable}`)

        // Calculate total a-la cam
        let total = {
            id          : 'all',
            name        : "ALL CAMERAS",
            img_num     : 0,
            img_lasttime: null
        }

        let rows = cameras
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
                isSelected={cam.id==selCamID}
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

        </>
    }
}