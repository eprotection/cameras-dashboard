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

    shouldComponentUpdate(nextProps, nextState) {
        //console.log(`ConfFTP shouldComponentUpdate ${this.props.onClick === nextProps.onClick}`,this.props, this.nextProps)
        // onClick - GENERATES DIFFERENCE!
        if (this.props.data !== nextProps.data) return true;
        return false;
    }

    render(){
        const {label,data,onClick} = this.props
    
        console.log(`ConfFTP render, ${data?`${data.user}@${data.host}`:"null"}`)
    
        return (<div>
                {label}<span className="ftp clk"
                    onClick={onClick}>
                        {data?`${data.user}@${data.host}`:"[user@host]"}
                    </span>
            </div>)
    }
}
export default ConfFTP;
    