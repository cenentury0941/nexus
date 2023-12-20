import React from "react";
import "./PostsTitle.css";

function PostsTitle(props){
    return <div className="Posts-Title-Row">
        <div className="Posts-Title-ProfilePic" style={{backgroundImage:"url("+props.pic+")"}}/>
        <div className="Title">{props.title}</div>
        </div>
}

export default PostsTitle;