import React from "react"
import backend from './Backend'
import {getCameraById}  from './App'
import {formatDateTime} from './Utils'
import {showViewer,selectImage} from './ImageList'
import './style/Image.css';

const STATUS = new Map([
    [ 0, ''],
    [10, 'original'],
    [20, 'processing'],
    [30, 'classified'],
    [40, 'not-classified']
])

class Cell extends React.PureComponent{
    render(){
        const {data,showCamera,isSelected} = this.props
        const camera = getCameraById(data.id)
        console.log(`Cell render ${data.file} isSelected:${isSelected}`)
        return <div className="cell clk"
        onClick={()=>showViewer(data)}>
            <img src={`${backend.getApiUrl()}/cam_prv/${data.id}/${data.file}`} />
            {showCamera && <div>{camera?.name}</div>}
            <div>{formatDateTime(data.time, camera?.timezone)}</div>
            <div>{data.width}x{data.height}, {Math.round(data.size/1000)} Kb</div>
            <div>{STATUS.get(data.status)}</div>
            <div className={"select"+(isSelected?" checked":"")} 
                onClick={(e)=>{e.stopPropagation();selectImage(data)}}></div>
        </div>
    }
}
export default Cell;