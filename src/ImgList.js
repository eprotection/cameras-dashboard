import React,{useEffect} from "react"
import { useSelector, useDispatch } from 'react-redux';
import { selectCheckedCameras } from "./camSlice";

export default (props)=>{
    const checkedCameras = useSelector(selectCheckedCameras)
    const dispatch = useDispatch()
    console.log("=> ImgList")

    useEffect(()=>{
        console.log('ImgList.reloadImages on checkedCameras change')
        //dispatch(reloadImages)
    },[checkedCameras])    

    return (<>
        <div>
            IMAGE LIST
        </div>
    </>);
}