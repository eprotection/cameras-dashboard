import { useState } from "react"
import FiltersDialog from "./FiltersDialog"

const Filters=()=>{
    const [open, setOpen] = useState(false)

    return <>
        <span className="clk icon filter" onClick={()=>setOpen(true)} ></span>
        {open&& <FiltersDialog handleHide={()=>setOpen(false)}/> }
    </>
}
export default Filters