import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import "./Dashboard.css";
import "./Style.css";
import { logout, getMessages, getMessagesByUsername, getUsername } from "../firebase";
import { useNavigate } from "react-router-dom";
import DashboardFeedItem from "../components/DashboardFeedItem";
import PostsTitle from "../components/PostsTitle";
import DashboardSidebar from "../components/DashboardSidebar";
import LoadingItems from "../components/LoadingItems";
import AiAssistant from "../components/AiAssistant";
import DashboardTitle from "../components/DashboardTitle";

import OpenAI from "openai";
import { getkey , getMultipleAssistantId, getSingleAssistantId } from "../constants/creds";
import ResultAnalysis from "../components/ResultAnalysis";
import LoadingIntrospective from "../components/LoadingIntrospective";
import RatingRow from "../components/RatingRowIntrospective";
import "./Introspective.css";
import "../components/ResultAnalysis.css";
import Conclusion from "../components/Conclusion";


const openai = new OpenAI({ apiKey: getkey(), dangerouslyAllowBrowser: true } );

var thread = null

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fff',
      alternateTextColor: '#333',
      textColor: '#333'
    },
  },
});

function Introspective(){
    
    const queryParameters = new URLSearchParams(window.location.search)
    const username = queryParameters.get("uname")

    const navigate = useNavigate();
    const [ messages , setMessages ] = useState([])
    const [ position , setPosition ] = useState( "Position-Center" )
    const [ highlighted , setHighlighted ] = useState( false )
    const [ textToProcess , setTextToProcess ] = useState("") 

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
              assistant_id: getMultipleAssistantId(),
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
        if(selectionState === 0 && textToProcess !== "")
        {
        console.log(textToProcess)
        setSelectionState(1)
        pingAi(textToProcess)
        }
    } , [textToProcess] )

    useEffect( () => {
        var messages = getMessagesByUsername(username)
        var textCache = ""
        messages.forEach( (item,index) => { textCache += "\nPost Title "+item[1]["title"]+":\nPost Content : " + item[1]["content"] + "\n" } )
        setTextToProcess(textCache)
    } , [username] )

    return <div className="Dashboard-Main-Container">
      <DashboardSidebar />

      <div className={"Dashboard-Feed-Container " + position}>
        <DashboardTitle title= {"Your Introspective"} />
        { selectionState === 1 && <LoadingIntrospective /> }
        { selectionState === 2 && 
        <div className="Introspective-Container">
        <div className="SubTitle">Overall Rating</div>
        <RatingRow value={aiResponse.overall} />
        <Conclusion title={"Conclusion"} color={"Text-Orange"} data={aiResponse.conclusion} />
        <Conclusion title={"✓ The positives"} color={"Text-Green"} data={aiResponse.positive} />
        <Conclusion title={"✗ The negatives"} color={"Text-Red"} data={aiResponse.negative} />
        <div className="SubTitle">Bias Rating</div>
        <RatingRow value={aiResponse.bias} />
        <div className="SubTitle">Equitable Rating</div>
        <RatingRow value={aiResponse.equitable} />
        <div className="SubTitle">Diverse Perspective Rating</div>
        <RatingRow value={aiResponse.diverse} />
        </div>
        }
        <div className="Seperator-150px"/>
      </div>

      <ThemeProvider theme={darkTheme}>
        <ResponsiveAppBar />
      </ThemeProvider>

    </div>
}

export default Introspective