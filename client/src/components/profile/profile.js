import axios from 'axios';
import React,{useState} from 'react';
import env from '../../env';
import { connect } from 'react-redux';

import ProfileBody from './profileBody';
import { Container } from 'react-bootstrap';
import { AiFillLike } from "react-icons/ai";
import useForm from "../../hooks/useForm";
import { extractUserFromToken } from "../Auth/util/auth";

const Profile = ({ user,dispatch }) => {
    const { formData, handleInputChange } = useForm();

    const [display,setDisplay]=useState("none");
    const fields = [
        {
            type: "email",
            name: "email",
            caption: "Change your email",
            value: user.user.email
        },
        {
            type: "number",
            name: "phoneNumber",
            caption: "Change phone number",
            value: user.user.phoneNumber
        },
        {
            type: "password",
            name: "password",
            caption: "New password",
            value: ""
        },
        {
            type: "password",
            name: "rpassword",
            caption: "Re-input new password"
        },
        {
            type: "password",
            name: "opassword",
            caption: "Enter password before submit",
            value: ""
        }

    ]
    const updateProfile = async (user, id) => {
        const res = await axios.put(`${env.api}/user/${id}`, user);
        return new Promise(async function (resolve, reject) {
            resolve(res.data);
            dispatch({ type: "SET_USER", payload: await extractUserFromToken(res.data) })
            toggleDisplay();
        })

    }
    const toggleDisplay=()=>{
        setDisplay(display==="block"?"none":"block");
    }
    return (
        <Container className="">

            <ProfileBody id={user.user.id} dispatch={dispatch} formData={formData} handleInputChange={handleInputChange} fields={fields} doUpdate={updateProfile} />
            <div style={{
                position: 'absolute',
                display:display,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.5)"

            }}>
                <span>
                    <AiFillLike onClick={()=>toggleDisplay()} className="text-success text-center ml-5 my-5" size={70} />
                    <p className="text-white">Updated successfully</p>
                </span>
            </div>
        </Container>
    )
}
const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(Profile);
