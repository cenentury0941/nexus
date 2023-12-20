import React, { useEffect, useRef, useState } from "react";
import "./AiAssistant.css";
import "../pages/Style.css";
import SelectItem from "./SelectItem";

import OpenAI from "openai";
import { getkey , getSingleAssistantId } from "../constants/creds";
import ResultAnalysis from "./ResultAnalysis";

const openai = new OpenAI({ apiKey: getkey(), dangerouslyAllowBrowser: true } );

var thread = null

function AiAssistant(props){

    const [ windowVisible , setWindowVisible ] = useState(false)
    const [ selectionState , setSelectionState ] = useState( 0 )
    const [errorMessage , setErrorMessage ] = useState( "" )
    const [ aiResponse , setAiResponse ] = useState(null)
    var run = null

    const pingAi = async (message) => {
        thread = await openai.beta.threads.create();
        console.log("Updating")
        const message_obj = await openai.beta.threads.messages.create(
            thread.id,
            {
            role: "user",
            content: message
            }
        );

        run = await openai.beta.threads.runs.create(
            thread.id,
            { 
              assistant_id: getSingleAssistantId(),
            }
          );
          console.log("loading...")
          setTimeout( checkRunStatus , 1000 )
    }

    const checkRunStatus = async () => {
        var run_local = await openai.beta.threads.runs.retrieve(
            thread.id,
            run.id
          );

        if(run_local.status === "completed")
        {
            const messages = await openai.beta.threads.messages.list(
                thread.id
              );
              var response_data = messages.body.data.map( (element) => { return {"role":element.role,"content":element.content[0].text.value} } )
              console.log( response_data )
              setErrorMessage( response_data[0]["content"] )
              setSelectionState(3)
        }
        else if(run_local.status === "requires_action")
        {
            var args = JSON.parse( run_local.required_action.submit_tool_outputs.tool_calls[0].function.arguments )
            console.log(args)
            setAiResponse(args)
            setSelectionState(2)
        }
        else
        {
            console.log("loading...")
            setTimeout( checkRunStatus , 1000 )
        }
    }

    useEffect( () => {
        if(selectionState === 0 && props.textToProcess !== "")
        {
        console.log(props.textToProcess)
        setSelectionState(1)
        pingAi(props.textToProcess)
        }
    } , [props.textToProcess] )

    const showWindow = () => {
        setWindowVisible(true)
        props.adjustPosition("Position-Left")
        if(selectionState === 0){
            props.setHighlighted(true)
        }
    }
    
    const hideWindow = () => {
        setWindowVisible(false)
        props.adjustPosition("Position-Center")
        props.setHighlighted(false)
        props.setTextToProcess("")
        setSelectionState(0)
    }

    const resetState = () => {
        props.setHighlighted(true)
        props.setTextToProcess("")
        setSelectionState(0)
    }

    return ( <div className="Assistant-Container">
        <div className="Assistant-Show-Button " onClick={showWindow}></div>

        <div className={"Assistant-Window " + ( windowVisible ?  "Assistant-Window-Show" : "Assistant-Window-Hide" ) }>
            <div className="Assistant-Window-Header-Row">
                <div className="Assistant-Icon" />
                <div className="Assistant-Header-Text">Nexus Ai</div>
                <div className="Assitant-Window-Close-Button" onClick={hideWindow}/>
            </div>
            {
                selectionState === 2 ? <ResultAnalysis data={aiResponse}/> : <SelectItem processing={selectionState===1} error={selectionState===3} errorMessage={errorMessage}/>
            }
            { (selectionState === 2 || selectionState === 3) && 
            <div className="Button Button-Dark Width-75Pc Height-5pc Font-Size-100pc Margin-0px Margin-Bottom-25px Position-Absolute Bottom-Center"
            onClick={resetState}>Analyse other post</div>
            }
        </div>  

    </div> )
}

export default AiAssistant;