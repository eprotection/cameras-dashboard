import React from "react"
import backend from '../Backend'
import {formatDateTime} from '../Utils'
import './Image.css';
import { store } from '../store';
import {IMAGE_STATUSES} from '../filters/filtersSlice'



class Cell extends React.PureComponent{
    render(){        
        const {data,camera,isChecked,showViewer} = this.props
        console.log(`Cell render ${data.file} isChecked:${isChecked}`)
        return <div className="cell clk"
        onClick={()=>showViewer(data)}>
            <img src={`${backend.getApiUrl()}/cam_prv/${data.id}/${data.file}`} />
            <div>{camera?.name}</div>
            <div>{formatDateTime(data.time, camera?.timezone)}</div>
            <div>{data.width}x{data.height}, {Math.round(data.size/1000)} Kb</div>
            <div>{IMAGE_STATUSES.get(data.status)}</div>
            <div className={"select"+(isChecked?" checked":"")} 
                onClick={(e)=>{e.stopPropagation();
                    store.dispatch({type:"images/check",payload:data})}}></div>
        </div>
    }
}
export default Cell;