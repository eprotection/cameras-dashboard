import React from 'react';
import './style/Row.css';
import {setSelectedCamera} from "./App"

class CamRow extends React.PureComponent{
    render(){

        const { cam, isSelected } = this.props

        //console.log(`CamRow render #${cam.id} ${cam.name} ${isSelected}`)



        return (
            <div className={`row clk ${isSelected?'selected':''}`}
                onClick={()=>{setSelectedCamera(cam)}}>
                <div className='main'>
                    {isSelected.toString()}
                    <span className='mac' >{cam.mac}</span>
                    <span className='name'>{cam.name}</span>
                </div>
                <div className='details'>
                    <span>#{cam.id}</span>
                </div>
            </div>
        )
    }


}

export default CamRow;
