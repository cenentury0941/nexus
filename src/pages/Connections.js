import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import "./Dashboard.css";
import "./Style.css";
import { logout, getMessages, getConnections } from "../firebase";
import { useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import DashboardTitle from "../components/DashboardTitle";
import DashboardPost from "../components/DashboardPost";
import DashboardFeedItem from "../components/DashboardFeedItem";
import DashboardSidebar from "../components/DashboardSidebar";
import AiAssistant from "../components/AiAssistant";
import ConnectionsItem from "../components/ConnectionsItem";

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

function Connections(){

    const navigate = useNavigate();
    const [ messages , setMessages ] = useState([])
    const [ position , setPosition ] = useState( "Position-Center" )
    const [ highlighted , setHighlighted ] = useState( false )
    const [ textToProcess , setTextToProcess ] = useState("") 

    useEffect( () => { setMessages( getConnections() ) } , [] )

    return <div className="Dashboard-Main-Container">
      <DashboardSidebar />

      <div className={"Dashboard-Feed-Container " + position}>
        <DashboardTitle title="Your Connections" />
        {
          messages.map( (item,index) => {
            return <ConnectionsItem key={""+index} data={item} index={index} highlighted={highlighted} setHighlighted={setHighlighted} setTextToProcess={setTextToProcess}/>
          } )
        }
        <div className="Seperator-150px"/>
      </div>

      <ThemeProvider theme={darkTheme}>
        <ResponsiveAppBar />
      </ThemeProvider>

    </div>
}

export default Connections