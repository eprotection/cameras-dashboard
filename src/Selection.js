import React from "react"

export default ({size,onClear,onDelete})=>{
    console.log(`Selection render, size: ${size}`)
    const s = size>1?'s':''

    return <div className="selection">
        <span><b>{size}</b> selected image{s}</span>
        <button 
            onClick={onDelete}>Delete image{s}</button>
        <span className="clk icon close" 
            onClick={onClear}></span>
    </div>
}    
