import React from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import {Container} from "react-bootstrap";
import useForm from '../../../hooks/useForm';
import Api from '../../../Api/Api';

const Login = ({ state, dispatch }) => {
    const { formData, handleInputChange } = useForm();
    const Auth = async (user = {}, type = "LOCAL") => Api.userApi.loginUser(user, dispatch);



    return (
        <>
            <Container className="">

                <LoginForm handleInputChange={handleInputChange} formData={formData} auth={Auth} />
            </Container>
        </>
    )

}

const mapStateToProps = state => {
    console.log(state);
    return state;
}
export default connect(mapStateToProps)(Login);