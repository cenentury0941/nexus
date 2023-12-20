import React from "react";
import "./RatingRow.css";
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import SentimentNeutralOutlinedIcon from '@mui/icons-material/SentimentNeutralOutlined';
import { Height } from "@mui/icons-material";

function RatingRow(props){
    return (<div className="Rating-Row-Container">
        <div className="Rating-Row-Col">    
            <SentimentVeryDissatisfiedOutlinedIcon color={props.value === 0 ? "error":"disabled"} sx={{height:"70%",width:"100%"}} /><div className={ "Rating-Row-Label " + (props.value !== 0 ? "Disabled" : "" ) }>Bad</div>
        </div>
        <div className="Rating-Row-Col">
        <SentimentNeutralOutlinedIcon color={props.value === 1 ? "warning":"disabled"} sx={{height:"70%",width:"100%"}} /><div className={ "Rating-Row-Label " + (props.value !== 1 ? "Disabled" : "" ) }>Neutral</div>        
        </div>
        <div className="Rating-Row-Col">
        <SentimentVerySatisfiedOutlinedIcon color={props.value === 2 ? "success":"disabled"} sx={{height:"70%",width:"100%"}} /><div className={ "Rating-Row-Label " + (props.value !== 2 ? "Disabled" : "" ) }>Good</div>
        </div>
    </div>)
}

export default RatingRow