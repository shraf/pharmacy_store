import { React, useState } from 'react';
import Axios from "axios";
import {   Button } from 'react-bootstrap';
import "../style/style.css";
import "../background.css";
import env from "../../env";
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import FacebookLogin from 'react-facebook-login';
import NumberModal from './NumberModal';
import { connect } from 'react-redux';
import { extractUserFromToken } from "./util/auth";
import Api from '../../Api/Api';

const SocialAuth = ({ state, dispatch }) => {
    const [tokenInfo, setTokenInfo] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [facebook_res, setFacebook_res] = useState({});
    const responseFacebook = async (res) => {
        const data = { accessToken: res.accessToken, id: res.id };
        const tokenInfo = (await Axios.post(`${env.api}/user/facebook/login`, data)).data;
        await setTokenInfo(tokenInfo);
        await setFacebook_res(res);
        if (tokenInfo.is_signed) {
            dispatch({type:"SET_USER",payload:await extractUserFromToken(tokenInfo.token)})
         }
        else
            setShowModal(true);
    }

    const registerFacebook = async (phone) => {
        console.log("registering facebook");
        console.log(tokenInfo);
        const user = {
            firstname: facebook_res.first_name,
            lastname: facebook_res.lastName,
            email: facebook_res.email,
            facebook_id: facebook_res.id,
            phoneNumber: phone

        };
        Api.userApi.registerFacebook(user.email,dispatch);
    }
return (
    <>
        <NumberModal show={showModal} onSubmit={registerFacebook} />

        <FacebookLogin
            appId="281106223385175"

            fields="first_name,last_name,email,picture"
            onClick={() => console.log("dsad")}
            callback={responseFacebook} />,
        <Button className="social-btn border-0"><FaFacebook size={30} /></Button>
        <Button className="social-btn border-0"><FaGoogle size={30} /></Button>
    </>

)
}
const mapStateToProps = state => {
    console.log(state);
    return state;
}
export default connect(mapStateToProps)(SocialAuth);
