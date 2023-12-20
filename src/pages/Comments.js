import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import "./Dashboard.css";
import "./Style.css";
import { logout, getMessages, getComments } from "../firebase";
import { useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import DashboardTitle from "../components/DashboardTitle";
import DashboardPost from "../components/DashboardPost";
import DashboardFeedItem from "../components/DashboardFeedItem";
import DashboardSidebar from "../components/DashboardSidebar";
import AiAssistant from "../components/AiAssistant";
import CommentPost from "../components/CommentPost";
import CommentFeedItem from "../components/CommentFeedItem";

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

function Comments(){

    const navigate = useNavigate();
    const [ messages , setMessages ] = useState([])
    const [ comments , setComments ] = useState([])
    const [ position , setPosition ] = useState( "Position-Center" )
    const [ highlighted , setHighlighted ] = useState( false )
    const [ textToProcess , setTextToProcess ] = useState("") 

    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")

    useEffect( () => {
        getMessages(setMessages)
        getComments(setComments)
    } , [] )

    return <div className="Dashboard-Main-Container">
      <DashboardSidebar />

      <div className={"Dashboard-Feed-Container " + position}>
        <DashboardTitle title="Post Discourse" />
        
        {
          messages.filter( (item) => { return item[0]===id } ).map( (item,index) => {
            return <DashboardFeedItem key={""+index} data={item} index={index} highlighted={highlighted} setHighlighted={setHighlighted} setTextToProcess={setTextToProcess}/>
          } )
        }

        <CommentPost />

        {
          comments.filter( (item) => {return item[1]["response_to"]===id} ).map( (item,index) => {
            return <CommentFeedItem key={""+index} data={item} index={index} highlighted={highlighted} setHighlighted={setHighlighted} setTextToProcess={setTextToProcess}/>
          } )
        }
        <div className="Seperator-150px"/>
      </div>

      <ThemeProvider theme={darkTheme}>
        <ResponsiveAppBar />
      </ThemeProvider>

      <AiAssistant adjustPosition={setPosition} setHighlighted={setHighlighted} textToProcess={textToProcess} setTextToProcess={setTextToProcess}/>
    </div>
}

export default Comments