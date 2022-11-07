import React from 'react';
import './style/Row.css';
import {setSelCamID,showCamEditor} from "./App"
import {formatDate} from "./Utils"

class CamRow extends React.PureComponent{
    render(){

        const { cam, isSelected } = this.props

        console.log(`CamRow render #${cam.id} ${cam.name} ${isSelected}`)

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
                <div><span>mac:<b>{cam.mac}</b></span></div>
                <div><span>folder:<b>{cam.folder}</b></span><span>prefix:<b>{cam.prefix}</b></span></div>
                <button onClick={(e)=>{e.stopPropagation();showCamEditor(cam)}}>Edit</button>
                </div>}
            </div>
        )
    }


}

export default CamRow;
