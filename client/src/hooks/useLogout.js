import React from "react";
import { useDispatch } from "react-redux";
const useLogout=()=>{
    const dispatch=useDispatch();
    return ()=>dispatch({type:"REMOVE_USER"});
}
export default useLogout;