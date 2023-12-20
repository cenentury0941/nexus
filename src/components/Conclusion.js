import React from "react";
import "./Conclusion.css"
import "../pages/Style.css"
import { CircularProgress } from "@mui/material";

function Conclusion(props){
    return (<div className="Conclusion-Container" >
        <h2 className={"SubTitle Padding-Left-10px "+props.color}>{props.title}</h2>
        <h2 className={"Text-Content " + props.color}>{props.data === "" ? "Nothing to show here." : props.data}</h2>
    </div>)
}

export default Conclusion