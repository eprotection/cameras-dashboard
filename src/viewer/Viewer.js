import React from "react"
import { createPortal } from "react-dom"
import backend from '../Backend'


const Viewer = ({openImg, list, hideViewer })=>{
    const [index, setIndex] = React.useState(list.findIndex((img)=>img===openImg))
    const image = list[index]

    console.log(`=> Viewer #${index}/${list.length} ${image.file}`)
    
    return createPortal(
    <div className="viewer">
        <div className="container"> 
            <img src={`${backend.getApiUrl()}/cam/${image.id}/${image.file}`} />
        </div>

        <div className="clk icon close" onClick={hideViewer}></div>
        {index>0 &&
            <div className="prev" onClick={()=>{setIndex(index-1)}}></div>}
        {index<list.length-1 &&
            <div className="next" onClick={()=>{setIndex(index+1)}}></div>}
    </div>, document.getElementById('app'))
}
export default Viewer