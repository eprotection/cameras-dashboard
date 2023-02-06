import React,{useState,useEffect,useCallback} from "react"
import { useSelector, useDispatch } from 'react-redux';
import { selectCheckedCameras } from "../cameras/camSlice";
import { selectImages, getImageKey, clear, clearChecked, deleteChecked, loadImagesTail } from "./imgSlice";

const ImgActions = ()=>{
    const {list,status,hasMore,checked} = useSelector(selectImages)
    const checkedCount = Object.keys(checked).length

    const dispatch = useDispatch()

    console.log(`=>ImgActions  checkedCount: ${checkedCount}`)
    const s = checkedCount>1?'s':''

    if(checkedCount==0) return null
    return <div className="selection">
        <span><b>{checkedCount}</b> selected image{s}</span>
        <button 
            onClick={(e)=>{
                e.stopPropagation();
                if(!window.confirm('Delete selected images?')) return;
                    dispatch(deleteChecked())
            }}>
            Delete image{s}
        </button>

        <span className="clk icon close" 
            onClick={(e)=>{ 
                e.stopPropagation(); 
                dispatch(clearChecked()); 
            }}>
        </span>
    </div>
}    
export default ImgActions
