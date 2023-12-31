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

function ConnectionsItem(props){

    const navigate = useNavigate()

    const queryParameters = new URLSearchParams(window.location.search)
    const username = queryParameters.get("uname")

    const index = props.index
    const data = props.data

    const [ like , setLike ] = useState(false)
    const [ amplify , setAmplify ] = useState(false)

    const selectItem = () => {
        props.setTextToProcess(data["content"])
        props.setHighlighted(false)
    }

    return <div className={"Dashboard-Feed-Item " + (props.highlighted ? "Animate-Border-Glow" : "")}>
        <div className="Dashboard-Feed-Row Padding-All-25px">
            <div className="Dashboard-Feed-Profile" style={{ backgroundImage : ( data["profile_picture"] !== "profile url" ? "url('"+data["profile_picture"]+"')" : "url('https://firebasestorage.googleapis.com/v0/b/combined-hackathon-services.appspot.com/o/profile_none.png?alt=media&token=af9cfc1c-d027-4061-8c1b-53353e4709ce')") }}/>
            <div className="Dashboard-Feed-UserName" onClick={ () => { username !== data["username"] && navigate("/posts?uname="+data["username"])} }>{data["username"]}</div>
        </div>
    </div>
}

export default ConnectionsItem