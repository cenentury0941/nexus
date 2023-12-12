import React from "react";
import "./Style.css";
import "./Home.css";

function Home(){
    return <div className="Home-Main-Container">
    <div className="Home-Left-Container">
        <div className="Home-Left-Logo"/>
        <h1 className="Home-Left-Title">Nexus</h1>
        <h2 className="Text-White">An AI driven social media network for<br/>the leaders of tomorrow</h2>
    </div>
        <div className="Home-Right-Container">
        <h2 className="Text-Orange">Welcome to <b>Nexus</b>, a next-gen AI driven social network empowering the unbiased and diverse growth of the leaders of tomorrow.</h2>
        <div className="Spacer-Vertical-5vh"/>
        <div className="Button Button-Light Width-60Pc Height-7pc Font-Size-125pc">Learn More</div>
        <div className="Button Button-Dark Width-60Pc Height-7pc Font-Size-125pc">Explore Nexus</div>
        </div>
    </div>
}

export default Home