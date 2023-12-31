import React, { useState } from "react";
import "./SearchBox.css";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useNavigate } from "react-router-dom";

function SearchBox(){

    const navigate = useNavigate()
    const [ searchQuery , setSearchQuery ] = useState("")

    const search = () => {
      if( searchQuery === "" )
      {
        return
      }
      navigate( "/search?query=" + searchQuery )
    }

    return <div className="SearchBox-Container">
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", boxShadow:"0px 0px 0px gray" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color:"#D4145A", fontWeight:"500" }}
        placeholder="Looking for something?"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={searchQuery}
        onChange={ (target) => {setSearchQuery(target.currentTarget.value)} }
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={search}>
        <SearchIcon />
      </IconButton>
    </Paper>
    </div>
}

export default SearchBox;