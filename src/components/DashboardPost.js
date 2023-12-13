import React from "react";
import "./DashboardPost.css";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import CollectionsIcon from '@mui/icons-material/Collections';
import { postMessage } from "../firebase";

function DashboardPost(){

    const post = () => {
        postMessage("Title1" , "Content Content Content" , "image url" , "email@email.com" , "uname" , "profile url" , "tag1,tag2,tag3")
    }

    return <div className="DashboardPost-Container">
        <p className="DashboardPost-Title">What's on your mind?</p>
        <TextField fullWidth label="Post Title" id="fullWidth" color="warning" variant="outlined" sx={{ color:"#D4145A", border:"0px solid black" }}/>
        <TextField
          id="standard-multiline-static"
          label="Post Content"
          multiline
          rows={6}
          variant="outlined"
          color="warning"
        />
        <div className="DashboardPost-ButtonRow">
        <IconButton type="button" sx={{ p: '10px', scale:"1.39", m: '5px' }} aria-label="search" color="warning">
            <CollectionsIcon />
        </IconButton>
        <IconButton type="button" sx={{ p: '10px', scale:"1.39", m: '5px' }} aria-label="search" color="warning" onClick={post}>
            <SendIcon />
        </IconButton>
        </div>
    </div>
}

export default DashboardPost;