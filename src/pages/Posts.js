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

function Posts(){
    
    const queryParameters = new URLSearchParams(window.location.search)
    const username = queryParameters.get("uname")

    const navigate = useNavigate();
    const [ messages , setMessages ] = useState([])
    const [ position , setPosition ] = useState( "Position-Center" )
    const [ highlighted , setHighlighted ] = useState( false )
    const [ textToProcess , setTextToProcess ] = useState("") 

    useEffect( () => {setMessages(getMessagesByUsername(username))} , [username] )

    return <div className="Dashboard-Main-Container">
      <DashboardSidebar />

      <div className={"Dashboard-Feed-Container " + position}>
        <PostsTitle pic={messages[0] ? messages[0][1]["profile_picture"] : ""} title= { ( username === getUsername() ? "Your" : (username+"'s") ) +" posts"} />
        {
          messages.length === 0 ? <LoadingItems /> :
          messages.map( (item,index) => {
            return <DashboardFeedItem key={""+index} data={item} index={index} highlighted={highlighted} setHighlighted={setHighlighted} setTextToProcess={setTextToProcess}/>
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

export default Posts