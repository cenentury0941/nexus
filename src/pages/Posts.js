import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import "./Dashboard.css";
import "./Style.css";
import { logout, getMessages, getMessagesByUsername } from "../firebase";
import { useNavigate } from "react-router-dom";
import DashboardFeedItem from "../components/DashboardFeedItem";
import PostsTitle from "../components/PostsTitle";
import DashboardSidebar from "../components/DashboardSidebar";
import LoadingItems from "../components/LoadingItems";

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
    
    useEffect( () => {setMessages(getMessagesByUsername(username))} , [] )

    return <div className="Dashboard-Main-Container">
      <DashboardSidebar />

      <div className="Dashboard-Feed-Container">
        <PostsTitle title= {username+"'s posts"} />
        {
          messages.length === 0 ? <LoadingItems /> :
          messages.map( (item,index) => {
            return <DashboardFeedItem data={item} index={index} />
          } )
        }
        <div className="Seperator-150px"/>
      </div>

      <ThemeProvider theme={darkTheme}>
        <ResponsiveAppBar />
      </ThemeProvider>
    </div>
}

export default Posts