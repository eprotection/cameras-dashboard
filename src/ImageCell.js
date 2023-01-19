import React from "react"
import backend from './Backend'
import {getCameraById}  from './App'
import {formatDateTime} from './Utils'
import {showViewer} from './ImageList'
import './style/Image.css';
import { store } from './store';


const STATUS = new Map([
    [ 0, ''],
    [10, 'original'],
    [20, 'processing'],
    [30, 'classified']
])

class Cell extends React.PureComponent{
    render(){
        const {data,showCamera,isChecked} = this.props
        const camera = getCameraById(data.id)
        console.log(`Cell render ${data.file} isChecked:${isChecked}`)
        return <div className="cell clk"
        onClick={()=>showViewer(data)}>
            <img src={`${backend.getApiUrl()}/cam_prv/${data.id}/${data.file}`} />
            {showCamera && <div>{camera?.name}</div>}
            <div>{formatDateTime(data.time, camera?.timezone)}</div>
            <div>{data.width}x{data.height}, {Math.round(data.size/1000)} Kb</div>
            <div>{STATUS.get(data.status)}</div>
            <div className={"select"+(isChecked?" checked":"")} 
                onClick={(e)=>{e.stopPropagation();
                    store.dispatch({type:"images/check",payload:data})}}></div>
        </div>
    }
}
export default Cell;