import React, { useState } from "react";
import "./AiAssistant.css";

function AiAssistant(){

    const [ windowVisible , setWindowVisible ] = useState(false)

    const showWindow = () => {setWindowVisible(true)}
    
    const hideWindow = () => {setWindowVisible(false)}

    return ( <div className="Assistant-Container">
        <div className="Assistant-Show-Button " onClick={showWindow}></div>

        { true && <div className={"Assistant-Window " + ( windowVisible ?  "Assistant-Window-Show" : "Assistant-Window-Hide" ) }>
            <div className="Assitant-Window-Close-Button" onClick={hideWindow}/>
        </div>
        }   

    </div> )
}

export default AiAssistant;