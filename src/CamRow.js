import React from 'react';
import './Row.css';

class CamRow extends React.Component{
    render(){

        const { cam } = this.props

        console.log(`render #${cam.id} ${cam.name}`,cam)

        return (
            <div className='row'>
                <div className='main'>
                    <span>{cam.mac}</span>
                    <span>{cam.name}</span>
                </div>
                <div className='details'>
                    <span>#{cam.id}</span>
                </div>
            </div>
        )
    }


}

export default CamRow;
