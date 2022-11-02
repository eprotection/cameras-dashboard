import React from 'react';
import './style/Row.css';

class CamRow extends React.Component{
    render(){

        const { cam } = this.props

        console.log(`render #${cam.id} ${cam.name}`)

        return (
            <div className='row clk'>
                <div className='main'>
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
