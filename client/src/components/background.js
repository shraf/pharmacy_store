import React from 'react';
import "./background.css";
import bg from "../volodymyr-hryshchenko-e8YFkjN2CzY-unsplash.jpg"
const Background=()=>{
    return(
        <>
        <img id="bg" src={bg}/>
        <div className="background"></div>
        </>
    )
}
export default Background;