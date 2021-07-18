import axios from "axios";
import { extractUserFromToken } from "../components/Auth/util/auth";
import env from "../env";

const loginUser = (user,dispatch) => {
    return new Promise(
        (resolve, reject) =>
            axios.post(`${env.api}/user/login`, user)
                .then(async (res) => {
                    dispatch({ type: "SET_USER", payload: await extractUserFromToken(res.data.token) });
                    resolve(res);
                    return res;
                })
                .catch(err=>reject(err))
    );
};

const registerUser=(user,dispatch)=>{
    return new Promise(
        (resolve, reject) =>
            axios.post(`${env.api}/user/register`,user)
                .then(async (res) => {
                    dispatch({type:"SET_USER",payload:await extractUserFromToken(res.data.token)});
                    resolve(res);
                })
                .catch(err=>reject(err))
    );
}

const registerFacebook=(user,dispatch)=>{
    const url = `${env.api}/user/facebook/register`;
        axios.post(url, user)
            .then(async(res) => dispatch({ type: "SET", payload: await extractUserFromToken(res.data) })
        );
}

const userApi={
    loginUser,
    registerUser,
    registerFacebook
}

export default userApi;