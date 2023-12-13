import React, { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import "./Style.css";
import "./LoginLoading.css";
import { useNavigate } from "react-router-dom";
import { login } from "../firebase";

function LoginLoading(){

    const [loginState , setLoginState ] = useState(0)
    const navigate = useNavigate()

    useEffect(
        () => {
            login( setLoginState , navigate )
        }
        ,
        []
    )

    return <div className="Login-Main-Container">
        <h2> { loginState === 1 ? "Logging In Using" : loginState === 2 ? "Successfully logged in using" : "Processing..." }</h2>
        <CircularProgress color="warning"/>
        <h2> { loginState > 0 && "Hackathon Test Credentials" }</h2>
    </div>
}

export default LoginLoading;