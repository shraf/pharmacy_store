import React from 'react';
import RegisterForm from "./RegisterForm";
import {connect} from 'react-redux';
import useForm from '../../../hooks/useForm';
import Api from '../../../Api/Api';

const Register=({state,dispatch})=>{
    const {formData,handleInputChange}=useForm();
    const Signup=(user)=>Api.userApi.registerUser(user,dispatch)
    return (
    <>
        <RegisterForm handleInputChange={handleInputChange} formData={formData} signup={Signup}/>
    </>
    )
}
const mapStateToProps=(state)=>{
    return state;
}
export default connect(mapStateToProps)(Register);