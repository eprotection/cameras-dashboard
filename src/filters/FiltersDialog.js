import { useState } from "react";
import Dialog from "../Dialog"
import { useSelector, useDispatch } from 'react-redux';
import { selectFilters, setStatusFilter, IMAGE_STATUSES } from "./filtersSlice"

const FiltersDialog=({handleHide})=>{
    // Store
    const {statusFilter}= useSelector(selectFilters)
    const dispatch = useDispatch()
    
    // Internal state
    const [filter,setFilter]= useState(statusFilter)

    const handleCheckboxChange = (key)=>{
        console.log('handleCheckboxChange',key)
        setFilter({...filter, 
            [key]:!filter[key]})
    }

    const handleSave =()=>{
        handleHide()
        dispatch(setStatusFilter(filter))
    }

    const rows = []
    IMAGE_STATUSES.forEach((value, key)=>{
        rows.push(<div key={key}><i>{value}</i>
            <input type="checkbox" 
            checked={filter[key]} 
            onChange={()=>handleCheckboxChange(key)}/>
        </div>)
    })

    console.log('=>FiltersDialog filter:',filter)
    return <Dialog title="Image filters">
        <div className="input-table">
            {rows}
        </div>


        <div className="bar">
            <span className="btn clk" onClick={handleHide}>Cancel</span>
            <span className="btn clk" onClick={handleSave}>Save</span>

        </div>

    </Dialog>
}
export default FiltersDialog