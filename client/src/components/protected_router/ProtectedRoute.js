import React from 'react';
import {Route,Redirect} from "react-router-dom";

const ProtectedRoute=({component:Component,condition,path})=>{
    return(
        <>
            <Route exact path={path} render={(props)=>condition?<Component {...props}/>:<Redirect to="/"/>}/>
        </>
    )
};
export default ProtectedRoute;
