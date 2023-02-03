import React,{useState,useEffect,useCallback} from "react"
import { useSelector, useDispatch } from 'react-redux';
import { selectCheckedCameras } from "../cameras/camSlice";
import { selectImages, getImageKey, clear, clearChecked, deleteChecked, loadImagesTail } from "./imgSlice";
import Cell from "./ImageCell"
import Selection from "./Selection"
import Viewer from "../viewer/Viewer"
import '../viewer/Viewer.css';


export default (props)=>{
    const {list,status,showMore,checked} = useSelector(selectImages)
    const checkedCount = Object.keys(checked).length
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

    // Image viewer
    const [openImg, setOpenImage] = useState(null) 
    const showViewer = useCallback( (img)=>{setOpenImage(img) }, [])
    const hideViewer = useCallback(    ()=>{setOpenImage(null)}, [])


    return (<>
        <div>
            <div className="cell-container">
                {list.map(image=>{
                    const key = getImageKey(image)
                    return <Cell 
                        key={key} 
                        data={image}
                        camera={checkedCameras[image.id]}
                        isChecked={Boolean(checked[key])}
                        showViewer={showViewer}/>
                })}

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
        {checkedCount>0 && 
            <Selection 
                size={checkedCount}
                onClear ={()=>{
                    dispatch(clearChecked())
                }}
                onDelete={()=>{
                    if(!window.confirm('Delete selected images?')) return;
                    dispatch(deleteChecked())
                }}/>
        }
        {openImg && 
            <Viewer openImg={openImg} list={list} hideViewer={hideViewer}/>}


    </>);
}
