import React from "react"
import backend from './Backend'
import {getCameraById}  from './App'
import {formatDateTime} from './Utils'
import {showViewer} from './ImageList'
import './style/Image.css';

const STATUS = new Map([
    [ 0, ''],
    [10, 'original'],
    [20, 'processing'],
    [30, 'classified']
])

class Cell extends React.PureComponent{
    render(){
        const {data,showCamera} = this.props
        console.log(`Cell render ${data.file}`)
        return <div className="cell clk"
        onClick={()=>showViewer(data)}>
        <img src={`${backend.getApiUrl()}/cam/${data.id}/${data.file}`} />
        {showCamera && <div>{getCameraById(data.id)?.name}</div>}
        <div>{formatDateTime(data.time)}</div>
        <div>{data.width}x{data.height}</div>
        <div>{STATUS.get(data.status)}</div>
        </div>
    }
}
export default Cell;