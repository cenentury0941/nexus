import React, { useState } from "react";
import "./DashboardFeedItem.css";
import "../pages/Style.css";

function LoadingItems(props){

    return <div className="Dashboard-Feed-Item No-Background">
        <div className="Horizontal-Divider-1px Margin-0px Margin-Bottom-25px"/>
        <div className="DashboardFeed-ButtonRow">
            <div className="Dashboard-Feed-Title Text-White">
            No Posts Found
            </div>
        </div>
        <div className="Seperator-25px"/>
    </div>
}

export default LoadingItems