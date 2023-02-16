import React,{useState,useEffect,useCallback} from "react"
import { useSelector, useDispatch } from 'react-redux';
import { selectCheckedCameras } from "../cameras/camSlice";
import { selectImages, getImageKey, loadImagesTail } from "./imgSlice";
import Cell from "./ImageCell"
import Viewer from "../viewer/Viewer"
import '../viewer/Viewer.css';


const ImgList = ()=>{
    const {list,status,rest,checked} = useSelector(selectImages)
    const checkedCameras = useSelector(selectCheckedCameras)
    const dispatch = useDispatch()

    console.log("=> ImgList")

    useEffect(()=>{
        if(status==='empty'){
            console.log('***** ImgList: load images if empty, status:', status)
            dispatch(loadImagesTail())
        }
    },[status])    

    // Image viewer
    const [openImg, setOpenImage] = useState(null) 
    const showViewer = useCallback( (img)=>{setOpenImage(img) }, [])
    const hideViewer = useCallback(    ()=>{setOpenImage(null)}, [])


    return (<>
        <div className="img-container">
            <div className="img-grid">
                {list.map(image=>{
                    const key = getImageKey(image)
                    return <Cell 
                        key={key} 
                        data={image}
                        camera={checkedCameras[image.id]}
                        isChecked={Boolean(checked?.[key])}
                        showViewer={showViewer}/>
                })}

                {status==="pending" && 
                <div className="last-cell">
                    <span>LOADING...</span>
                </div>}

                {rest>0 &&
                <div className="last-cell">
                    <span className="btn clk" 
                    onClick={()=>{dispatch(loadImagesTail())}}>remains {rest}</span>
                </div>}

            </div>
        </div>
                    
        {openImg && 
            <Viewer openImg={openImg} list={list} hideViewer={hideViewer}/>}


    </>);
}
export default ImgList
