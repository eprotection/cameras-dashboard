import React from "react";

// const ConfFTP = ({label,data,onClick})=>{
    
//     console.log(`ConfFTP render, ${data?`${data.user}@${data.host}`:"null"}`)

//     return (<div>
//             {label}<span className="ftp clk"
//                 onClick={onClick}>
//                     {data?`${data.user}@${data.host}`:"[user@host]"}
//                 </span>
//         </div>)
// }
// export default React.memo(ConfFTP);

class ConfFTP extends React.Component{
    constructor(props){
        super(props)
        //this.onClick = this.onClick.bind(this)
    }

    // Arrow callback example (Just for demo!)
    onClick = ()=>{ 
        console.log('ConfFTP onClick, this:',this.props.onClick)
    }

    // Just for illustration
    shouldComponentUpdate(nextProps, nextState) {
        //console.log(`ConfFTP shouldComponentUpdate ${this.props.onClick === nextProps.onClick}`,this.props, this.nextProps)
        // onClick - GENERATES DIFFERENCE!
        if (this.props.data !== nextProps.data) return true;
        if (this.props.onClick !== nextProps.onClick) return true;
        return false;
    }

    render(){
        const {data,onClick} = this.props
    
        //console.log(`ConfFTP render, ${data?`${data.user}@${data.host}`:"null"}  onClick:${onClick}`)
    
        return (
            <b className={onClick?"ftp clk":"ftp"}
                onClick={this.onClick}>
                {data?`${data.user}@${data.host}`:"[user@host]"}
            </b>)
    }
}
export default ConfFTP;
    