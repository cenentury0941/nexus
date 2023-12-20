import React from "react";
import "./LoadingIntrospective.css"
import { CircularProgress } from "@mui/material";

function LoadingIntrospective(){
    return (<div className="Loading-Introspective-Container" >
        <h2>Hang tight!</h2>
        <CircularProgress color="warning"/>
        <h2>We're preparing your introspective</h2>
    </div>)
}

export default LoadingIntrospective