import React, { useState } from "react";
import "./DashboardFeedItem.css";
import "../pages/Style.css";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SignalWifiStatusbarNullIcon from '@mui/icons-material/SignalWifiStatusbarNull';
import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';

import { useNavigate } from "react-router-dom";

function CommentFeedItem(props){

    const navigate = useNavigate()

    const queryParameters = new URLSearchParams(window.location.search)
    const username = queryParameters.get("uname")

    const index = props.index
    const data = props.data[1]
    const date = new Date(parseInt(data["id"]))

    const [ like , setLike ] = useState(false)
    const [ amplify , setAmplify ] = useState(false)

    const selectItem = () => {
        props.setTextToProcess(data["content"])
        props.setHighlighted(false)
    }
    const viewComments = () => {
        navigate("/comments?id="+data["id"])
    }

    return <div className={"Dashboard-Feed-Item " + (props.highlighted ? "Animate-Border-Glow" : "")}>
        <div className="Dashboard-Feed-Row Padding-All-25px">
            <div className="Dashboard-Feed-Profile" style={{ backgroundImage : ( data["profile_picture"] !== "profile url" ? "url('"+data["profile_picture"]+"')" : "url('https://firebasestorage.googleapis.com/v0/b/combined-hackathon-services.appspot.com/o/profile_none.png?alt=media&token=af9cfc1c-d027-4061-8c1b-53353e4709ce')") }}/>
            <div className="Dashboard-Feed-UserName" onClick={ () => { username !== data["username"] && navigate("/posts?uname="+data["username"])} }>{data["username"]}</div>
            <div className="Dashboard-Feed-Date">{date.toDateString()}</div>
        </div>
        
        { data["img"] !== "image url" && <img className="DashboardFeed-Image"  src={data["img"]}/> }
        <div className="Dashboard-Feed-Row Padding-Horizontal-25px">
            <div className="Dashboard-Feed-Content">
                { data["content"].split("\n").map( (item) => { return <p className="Dashboard-Feed-Block">{item}</p> } ) }
            </div>
        </div>
        <div className="DashboardFeed-ButtonRow">
        <IconButton type="button" sx={{ p: '10px', scale:"1.39", m: '5px' }} aria-label="search" color="warning" onClick={ () => {setLike(!like)} }>
            { like ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
        </IconButton>
        <IconButton type="button" sx={{ p: '10px', scale:"1.39", m: '5px' }} aria-label="search" color="warning" onClick={ () => {setAmplify(!amplify)} }>
            { amplify ? <SignalWifiStatusbar4BarIcon /> : <SignalWifiStatusbarNullIcon /> }
        </IconButton>
        </div>
        <div className="Seperator-25px"/>
        { props.highlighted &&
        <div className="Click-Blocker" onClick={selectItem}/>
        }
    </div>
}

export default CommentFeedItem