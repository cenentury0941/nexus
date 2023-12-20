import React, { useEffect, useState } from "react";
import "./ResultAnalysis.css";
import AssessmentIcon from '@mui/icons-material/Assessment';
import RatingRow from "./RatingRow";

function ResultAnalysis(props) {

    const dummyData = { conclusion : "Dummy" , positive : "Pos vals" , negative : "Neg vals" , overall : 1 , bias : 1 , diverse : 1 , equitable : 1 }

    const [ data , setData ] = useState(dummyData)

    useEffect( () => {
        if( props.data !== null )
        {
            setData(props.data)
        }
    } , [props.data] )

    return (<div className="Result-Analysis-Container">
            <div className="Result-Heading-1 ">
                <div className="Result-Header-Row">
                <div className="Results-Icon-Container "><AssessmentIcon sx={{width:"100%",height:"100%"}}/></div>
                <div>Analysis Report</div></div>
                </div>
            <div className="Result-Horizontal-Divider"/>
            <div className="Result-Heading-2">Overall Rating</div>
            <RatingRow value={data.overall}/>            
            <div className="Result-Text">
            {data.conclusion}
            </div>
            <div className="Result-Horizontal-Divider"/>
            <div className="Result-Heading-2" style={{color:"green"}}>✓ The positives</div>
            <div className="Result-Text" style={{color:"green"}}>
            {data.positive === "" ? "Nothing to show here :(" : data.positive}
            </div>
            <div className="Result-Horizontal-Divider"/>
            <div className="Result-Heading-2" style={{color:"red"}}>✗ The negatives</div>
            <div className="Result-Text" style={{color:"red"}}>
            {data.negative === "" ? "Nothing to show here :)" : data.negative}
            </div>
            <div className="Result-Horizontal-Divider"/>
            
            <div className="Result-Heading-3">Bias Rating</div>
            <RatingRow value={data.bias}/> 

            <div className="Result-Heading-3">Equitable Rating</div>
            <RatingRow value={data.equitable}/> 

            <div className="Result-Heading-3">Diverse Perspective Rating</div>
            <RatingRow value={data.diverse}/> 

    </div>)
}

export default ResultAnalysis;