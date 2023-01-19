import React,{useEffect} from "react"
import { useSelector, useDispatch } from 'react-redux';
import { selectCheckedCameras } from "./camSlice";
import { selectImages, clear, loadImagesTail } from "./imgSlice";
import Cell from "./ImageCell"

export default (props)=>{
    const {list,status,showMore} = useSelector(selectImages)
    const checkedCameras = useSelector(selectCheckedCameras)
    const dispatch = useDispatch()
    console.log("=> ImgList")

    useEffect(()=>{
        console.log('***** ImgList.reloadImages on checkedCameras change', checkedCameras)
        dispatch(clear())
        if(Object.keys(checkedCameras).length){
            dispatch(loadImagesTail())
        }
    },[checkedCameras])    

    return (<>
        <div>
            <div className="cell-container">
                {list.map(item=>
                    <Cell 
                        key={`${item.id}-${item.time}`} 
                        data={item}
                        showCamera={true}
                        isSelected={false}/>
                )}

                {status==="pending" && 
                <div className="last-cell">
                    <span>LOADING...</span>
                </div>}

                {showMore &&
                <div className="last-cell">
                    <span className="btn clk" onClick={()=>{dispatch(loadImagesTail())}}>show more</span>
                </div>}

            </div>
        </div>
    </>);
}