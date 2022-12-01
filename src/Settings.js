import React from "react";
import {hideSettings} from "./App";

export default ({children})=>{

    return (
    <div className="dialog-fog">
        <div className="dialog">
            <div className="title">SETTINGS</div>
            <div className="input-table">
                {children}
            </div>
            <div className="bar">
                <span className="btn clk" 
                    onClick={hideSettings}>Close</span>
            </div>

        </div>
    </div>
    )
}