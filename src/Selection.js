import React from "react"

export default ({size,onClear})=>{
    console.log(`Selection render, size: ${size}`)

    return <div className="selection">
        {size} selected images
        <button onClick={onClear}>Clear</button>
    </div>
}    
