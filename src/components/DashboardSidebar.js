import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import "../pages/Dashboard.css";
import "../pages/Style.css";
import { logout, getMessages } from "../firebase";
import { useNavigate } from "react-router-dom";
import DashboardFeedItem from "../components/DashboardFeedItem";
import PostsTitle from "../components/PostsTitle";

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

function DashboardSidebar(){

    const queryParameters = new URLSearchParams(window.location.search)
    const username = queryParameters.get("uname")

    const navigate = useNavigate();
    const [ messages , setMessages ] = useState([])
    
    useEffect( () => {getMessages(setMessages)} , [] )

    const navigateDashboard = () => {navigate("/Dashboard")}
    const navigateYourPosts = () => {navigate("/Posts?uname=username")}

    return  (     
    <div className="Dashboard-SideBar">
    <div className="Dashboard-SideBar-ProfilePic"/>
    <div className="Spacer-Vertical-3vh"/>
    <div className="Dashboard-SideBar-Welcome">Welcome back,</div>
    <div className="Dashboard-SideBar-Username">Username</div>
    <div className="Dashboard-SideBar-Connections">Connections : 69,420</div>
    <div className="Horizontal-Divider-1px"/>
    <div className="Button Button-Dark Width-75Pc Height-5pc Font-Size-100pc Margin-0px Margin-Bottom-25px" onClick={navigateDashboard}>Your Feed</div>
    <div className="Button Button-Dark Width-75Pc Height-5pc Font-Size-100pc Margin-0px Margin-Bottom-25px" onClick={navigateYourPosts}>Your Posts</div>
    <div className="Button Button-Dark Width-75Pc Height-5pc Font-Size-100pc Margin-0px Margin-Bottom-25px">Connections</div>
    <div className="Button Button-Dark Width-75Pc Height-5pc Font-Size-100pc Margin-0px Margin-Bottom-25px">Introspective</div>
    <div className="Seperator" />
    <div className="Button Button-Light Width-75Pc Height-5pc Font-Size-100pc Margin-0px Margin-Bottom-25px" onClick={()=>{logout(navigate)}}>Sign out</div>
    </div>
    )
}

export default DashboardSidebar