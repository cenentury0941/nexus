import React from "react";
import "./DashboardFeedItem.css";
import "../pages/Style.css";

function DashboardFeedItem(props){

    const index = props.index
    const data = props.data[1]
    const date = new Date(parseInt(data["id"]))

    return <div className="Dashboard-Feed-Item">
        <div className="Dashboard-Feed-Row Padding-All-25px">
            <div className="Dashboard-Feed-Profile"/>
            <div className="Dashboard-Feed-UserName">{data["username"]}</div>
            <div className="Dashboard-Feed-Date">{date.toDateString()}</div>
        </div>
        <div className="Horizontal-Divider-1px Margin-0px Margin-Bottom-25px"/>
        <div className="Dashboard-Feed-Row Padding-Horizontal-25px">
            <div className="Dashboard-Feed-Title">{data["title"]}</div>
        </div>
        <div className="Dashboard-Feed-Row Padding-Horizontal-25px">
            <div className="Dashboard-Feed-Content">
                { data["content"].split("\n").map( (item) => { return <p className="Dashboard-Feed-Block">{item}</p> } ) }
            </div>
        </div>
        
        <div className="Horizontal-Divider-1px Margin-25px"/>
        <div className="Seperator-70px"/>
    </div>
}

export default DashboardFeedItem