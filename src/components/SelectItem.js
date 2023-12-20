import React from "react";
import "./SelectItem.css";
import "../pages/Style.css";

function SelectItem(props){
    return (<div className="Select-Item-Container">
        <div className="Select-Item-Text-1">{props.processing ? "Please wait..." : ( props.error ? "Hmm... Something's wrong" : "Welcome to Nexus Ai!" )}</div>
        <div className={"Select-Item " + (!props.processing && !props.error ? "Animate-Border-Glow" : "") } >
            <div className="Select-item-Header-Row">
                <div className={"Select-item-Header-Profile " + (props.processing ? "Select-Item-Text-Animation1" : "")}/>
                <div className={"Select-item-Header-Text " + (props.processing ? "Select-Item-Text-Animation1" : "")}/>
            </div>
            <div className="Select-Item-Horizontal-Divider"/>

            <div className={"Select-Item-Body-Header " + (props.processing ? "Select-Item-Text-Animation2" : "")}/>
            <div className={"Select-Item-Body-Text1 " + (props.processing ? "Select-Item-Text-Animation3" : "")}/>
            <div className={"Select-Item-Body-Text2 " + (props.processing ? "Select-Item-Text-Animation1" : "")}/>
            <div className={"Select-Item-Body-Text3 " + (props.processing ? "Select-Item-Text-Animation2" : "")}/>

            <div className="Select-Item-Horizontal-Divider"/>
            {props.processing && <div className="Select-Item-Processing"/>}
        </div>
        <div className="Select-Item-Text-2">{props.processing ? "We're processing the text" : (props.error ? props.errorMessage : "Select an item to inspect")}</div>

    </div>)

}

export default SelectItem