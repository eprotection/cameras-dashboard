import React from "react"
import {hideViewer} from './ImageList'
import backend from './Backend'


export default ({image})=>{
    console.log(`=> Viewer ${image.file}`)
    return (
    <div className="viewer">
        <div className="container"> 
            <img src={`${backend.getApiUrl()}/cam/${image.id}/${image.file}`} />
        </div>

        <div className="clk icon close" onClick={hideViewer}></div>
    </div>)
}