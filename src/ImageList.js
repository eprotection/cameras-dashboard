import React from "react"
import {backend} from './Backend'

class ImageList extends React.Component{
    constructor(props){
        console.log(`ImageList constructor`)
        super(props)

        this.state = {
            images : [],
            error  : null,
            loading: false
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        // onClick - GENERATES DIFFERENCE!
        
        // props.cameras changed?
        if (this.props.cameras !== nextProps.cameras){
            console.log(`ImageList cameras changed => skip update, start loading`)
            // Load images
            this.loadData(nextProps.cameras) // converts prop change to state change
        }

        // Updating on state change only!!!
        if(this.state!==nextState) return true;

        return false;
    }

    loadData(cameras){
        console.log(`ImageList, loadData`)
        this.setState({
            images : [],
            error  : null,
            loading: true
        })

        window.setTimeout(function(){
            this.setState({
                images : [{id:10,name:'one'},{id:20,name:'two'},{id:30,name:'three'}],
                error  : null,
                loading: false
            })
        }.bind(this),2000)
    }

    render(){
        console.log(`ImageList render`)
        let items = this.state.images.map(item=>
            (<div key={item.id}>{item.name}</div>))
        return (
        <div>
            <h3>IMAGE LIST</h3>
            {this.state.loading && <div>LOADING...</div>}
            
            {this.state.error && 
            <div className="message"><span className="err">{this.state.error}</span></div>}
            
            <div>{items}</div>


        </div>)
    }
}
export default ImageList;