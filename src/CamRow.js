import React from 'react';
import './style/Camera.css';
import {setSelCamID,showCamEditor} from "./App"
import {formatDate} from "./Utils"

class CamRow extends React.PureComponent{
    render(){

        const { cam, isSelected, isEditable } = this.props

        console.log(`CamRow render #${cam.id} ${cam.name} isSelected:${isSelected} isEditable:${isEditable}`)

        return (
            <div className={`row clk ${isSelected?'selected':''}`}
                onClick={()=>{setSelCamID(cam.id)}}>
                <div className='main'>
                    <span className='name'>{cam.name}</span>
                    <span className='stat'>{formatDate(cam.img_lasttime)}</span>
                    <span className='stat'>{cam.img_num}</span>
                </div>
                {cam.id!='all' &&
                <div className='details'>
                <div><span>id:<b>{cam.id}</b></span></div>
                <div><span>folder:<b>{cam.folder}</b></span></div>
                <div><span>prefix:<b>{cam.prefix}</b></span></div>
                <div><span>timezone:<b>{cam.timezone}</b></span></div>
                {isEditable && 
                    <span className="clk icon edit" 
                        onClick={(e)=>{e.stopPropagation();showCamEditor(cam)}}></span>}
                </div>}
            </div>
        )
    }


}

export default CamRow;
