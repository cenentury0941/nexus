import React from "react";
import "./DashboardFeedItem.css";
import "../pages/Style.css";

function DashboardFeedItem(){
    return <div className="Dashboard-Feed-Item">
        <div className="Dashboard-Feed-Row Padding-All-25px">
            <div className="Dashboard-Feed-Profile"/>
            <div className="Dashboard-Feed-UserName">User Name</div>
            <div className="Dashboard-Feed-Date">01/01/69</div>
        </div>
        <div className="Horizontal-Divider-1px Margin-0px Margin-Bottom-25px"/>
        <div className="Dashboard-Feed-Row Padding-Horizontal-25px">
            <div className="Dashboard-Feed-Title">Content Title Section</div>
        </div>
        <div className="Dashboard-Feed-Row Padding-Horizontal-25px">
            <div className="Dashboard-Feed-Content">
            <p className="Dashboard-Feed-Block">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>            
            <p className="Dashboard-Feed-Block">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            </div>
        </div>
        
        <div className="Horizontal-Divider-1px Margin-25px"/>
        <div className="Seperator-70px"/>
    </div>
}

export default DashboardFeedItem