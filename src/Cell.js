import React from "react"
import backend from './Backend'
import {formatDateTime} from './Utils'
import {showViewer} from './ImageList'
import './style/Cell.css';

const STATUS = new Map([
    [ 0, ''],
    [10, 'original received'],
    [20, 'under processing'],
    [30, 'classified']
])

class Cell extends React.PureComponent{
    render(){
        const {data} = this.props
        console.log(`Cell render ${data.file}`)
        return <div className="cell clk"
        onClick={()=>showViewer(data)}>
        <img src={`${backend.getApiUrl()}/cam/${data.id}/${data.file}`} />
        <div>{formatDateTime(data.time)}</div>
        <div>{data.width}x{data.height}</div>
        <div>{STATUS.get(data.status)}</div>
        </div>
    }
}
export default Cell;