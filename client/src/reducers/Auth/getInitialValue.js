import jwt_decode from "jwt-decode";
const getAuth=()=>{
    if(localStorage.getItem("token"))
        return {...jwt_decode(localStorage.getItem("token")).user,isLogged:true}
    return {isLogged:false};
}
export default getAuth;