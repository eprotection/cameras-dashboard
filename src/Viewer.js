import React from "react"
import {hideViewer} from './ImageList'
import backend from './Backend'


export default ({openImg, list})=>{
    const [index, setIndex] = React.useState(list.findIndex((img)=>img===openImg))
    const image = list[index]

    console.log(`=> Viewer #${index}/${list.length} ${image.file}`)
    
    return (
    <div className="viewer">
        <div className="container"> 
            <img src={`${backend.getApiUrl()}/cam/${image.id}/${image.file}`} />
        </div>

        <div className="clk icon close" onClick={hideViewer}></div>
        {index>0 &&
            <div className="prev" onClick={()=>{setIndex(index-1)}}></div>}
        {index<list.length-1 &&
            <div className="next" onClick={()=>{setIndex(index+1)}}></div>}
    </div>)
}