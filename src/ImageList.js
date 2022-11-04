import React from "react"
import {backend} from './Backend'
import {formatDateTime} from './Utils'

const MIN_LOADING_TIME = 800
const PAGE_SIZE = 3

class ImageList extends React.Component{
    constructor(props){
        console.log(`ImageList constructor`)
        super(props)

        this.state = {
            images  : [],
            error   : null,
            loading : false,
            hasMore : false
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        // onClick - GENERATES DIFFERENCE!
        
        // props.cameras changed?
        if (this.props.cameras !== nextProps.cameras){
            console.log(`ImageList cameras changed => skip update, start loading`)
            // Reload images
            this.setState({images:[]})
            this.loadData(nextProps.cameras) // converts prop change to state change
        }

        // Updating on state change only!!!
        if(this.state!==nextState) return true;

        return false;
    }

    loadData(newCameras){
        let cameras = newCameras?newCameras:this.props.cameras
        const {images} = this.state
        const minTime = images.length>0?images[images.length-1].time : null
        console.log(`ImageList loadData, minTime:${minTime}`)
        this.setState({
            error  : null,
            loading: true
        })

        const ids = cameras.map(item=>item.id)
        const timeStart = new Date().getTime()
        backend.request('POST','/cameras/load_images',{
            ids   : ids,
            limit : PAGE_SIZE,
            before: minTime
        })
        .then(data=>{
            const timeout = MIN_LOADING_TIME-(new Date().getTime()-timeStart)
            console.log('ImageList load success',timeout,data)
            window.setTimeout(function(){
                this.setState({
                    images : [...images].concat(data),
                    error  : null,
                    loading: false,
                    hasMore: data.length==PAGE_SIZE
                })
            }.bind(this),timeout>0?timeout:0)

        })
        .catch(error=>{
            console.log('ImageList load error',error)
            this.setState({
                error  : error.toString(),
                loading: false
            })

        })
    }

    //-----------------------------------------------------------------------------
    // RENDER
    render(){
        console.log(`ImageList render`)
        let items = this.state.images.map(item=>
            (<div key={`${item.id}-${item.time}`}>
                {formatDateTime(item.time)} {item.file}
            </div>))

        return (
        <div>
            {this.state.error && 
            <div className="message"><span className="err">{this.state.error}</span></div>}
            
            <div>{items}</div>

            {this.state.loading && <div>LOADING...</div>}

            {this.state.images.length>0 && this.state.hasMore && !this.state.loading &&
            <div><span className="btn clk" onClick={()=>{this.loadData()}}>show more</span></div>}


        </div>)
    }
}
export default ImageList;