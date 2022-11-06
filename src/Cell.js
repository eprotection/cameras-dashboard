import React from "react"
import backend from './Backend'
import {formatDateTime} from './Utils'
import './style/Cell.css';


class Cell extends React.PureComponent{
    render(){
        const {data} = this.props
        console.log(`Cell render ${data.file}`)
        return <div className="cell clk">
        <img src={`${backend.getApiUrl()}/file/${data.file}`} />
        <div>{formatDateTime(data.time)}</div>

        </div>
    }
}
export default Cell;