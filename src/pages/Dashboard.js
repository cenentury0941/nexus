import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import "./Dashboard.css";
import "./Style.css";
import { logout } from "../firebase";
import { useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import DashboardTitle from "../components/DashboardTitle";
import DashboardPost from "../components/DashboardPost";
import DashboardFeedItem from "../components/DashboardFeedItem";

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

function Dashboard(){

    const navigate = useNavigate();

    return <div className="Dashboard-Main-Container">
      <div className="Dashboard-SideBar">
        <div className="Dashboard-SideBar-ProfilePic"/>
        <div className="Spacer-Vertical-3vh"/>
        <div className="Dashboard-SideBar-Welcome">Welcome back,</div>
        <div className="Dashboard-SideBar-Username">Username</div>
        <div className="Dashboard-SideBar-Connections">Connections : 69,420</div>
        <div className="Horizontal-Divider-1px"/>
        <div className="Button Button-Dark Width-75Pc Height-5pc Font-Size-100pc Margin-0px Margin-Bottom-25px">Your Feed</div>
        <div className="Button Button-Dark Width-75Pc Height-5pc Font-Size-100pc Margin-0px Margin-Bottom-25px">Your Posts</div>
        <div className="Button Button-Dark Width-75Pc Height-5pc Font-Size-100pc Margin-0px Margin-Bottom-25px">Connections</div>
        <div className="Button Button-Dark Width-75Pc Height-5pc Font-Size-100pc Margin-0px Margin-Bottom-25px">Introspective</div>
        <div className="Seperator" />
        <div className="Button Button-Light Width-75Pc Height-5pc Font-Size-100pc Margin-0px Margin-Bottom-25px" onClick={()=>{logout(navigate)}}>Sign out</div>
      </div>

      <div className="Dashboard-Feed-Container">
        <DashboardTitle title="Your Feed" />
        <SearchBox />
        <DashboardPost />
        <DashboardFeedItem />
        <DashboardFeedItem />
        <DashboardFeedItem />
        <DashboardFeedItem />
        <DashboardFeedItem />
        <DashboardFeedItem />
        <DashboardFeedItem />
        <DashboardFeedItem />
        <DashboardFeedItem />
        <div className="Seperator-150px"/>
      </div>

      <ThemeProvider theme={darkTheme}>
        <ResponsiveAppBar />
      </ThemeProvider>
    </div>
}

export default Dashboard