import React from 'react';
import { Form, Button } from 'react-bootstrap';
import "../../style/style.css";

import SocialAuth from '../socialAuth';

 const LoginForm=({handleInputChange,formData,auth})=>{
    
return(
    <>

    <Form className="form mr-auto ml-auto rounded border p-5">

        <Form.Group >
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" value={formData.email?formData.email:''} onChange={handleInputChange} id="Email" type="email" placeholder="Enter email"/>
            <Form.Text className="text-muted">xxx@yy.zz</Form.Text>
        </Form.Group>
        <Form.Group >
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" value={formData.password?formData.password:''} onChange={handleInputChange} id="Password" type="password"/>
            <Form.Text className="text-muted">Choose a strong password</Form.Text>
        </Form.Group>
        <Button className="gen-btn" onClick={()=>auth(formData)}>Log in</Button>

        <Form.Group>
            <p className="py-3">Or log in via:</p>
            <SocialAuth/>
        </Form.Group>
    </Form>
    </>
)
};
export default LoginForm;