import React, { useRef, useState } from "react";
import "./DashboardPost.css";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import CollectionsIcon from '@mui/icons-material/Collections';
import { getProfilePic, getUsername, postMessage, uploadImage } from "../firebase";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function DashboardPost(){

    const [ title , setTitle ] = useState("")
    const [ content , setContent ] = useState("")
    const [open, setOpen] = React.useState(false);
    const [ imgUrl , setImgUrl ] = useState("")
    
    const inputFile = useRef(null) 


    const handleImageUpload = (event) =>
    {
        console.log( "Opening File" );
        inputFile.current.click();
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    const handleError = () => {
        setOpen(true);
      };

    const post = () => {

        if( title === "" || content === "" )
        {
            handleError()
            return
        }

        postMessage(title , content , (imgUrl !== "" ? imgUrl : "image url") , "email@email.com" , getUsername() , getProfilePic() , "tag1,tag2,tag3")
        setTitle("")
        setContent("")
        setImgUrl("")
    }

    return <div className="DashboardPost-Container">
        <input type='file' id='file' onChange={ (event) => {uploadImage(event,setImgUrl)} } ref={inputFile} style={{display: 'none'}}/>
        <p className="DashboardPost-Title">What's on your mind?</p>
        <TextField fullWidth label="Post Title" id="fullWidth" color="warning" variant="outlined" sx={{ color:"#D4145A", border:"0px solid black" }}
        value={title}
        onChange={ (target) => {setTitle(target.currentTarget.value)} }
        />
        <TextField
          id="standard-multiline-static"
          label="Post Content"
          multiline
          rows={6}
          variant="outlined"
          color="warning"
          value={content}
          onChange={ (target) => {setContent(target.currentTarget.value)} }
        />
        { imgUrl !== "" && <img src={imgUrl} />}
        <div className="DashboardPost-ButtonRow">
        <IconButton onClick={handleImageUpload} type="button" sx={{ p: '10px', scale:"1.39", m: '5px' }} aria-label="search" color="warning">
            <CollectionsIcon />
        </IconButton>
        <IconButton type="button" sx={{ p: '10px', scale:"1.39", m: '5px' }} aria-label="search" color="warning" onClick={post}>
            <SendIcon />
        </IconButton>
        </div>
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Title and Content can't be empty!
        </Alert>
      </Snackbar>
    </div>
}

export default DashboardPost;