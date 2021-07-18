import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import "../../style/style.css";
import "../../background.css";
import SocialAuth from "../socialAuth";
const RegisterForm = ({ formData, handleInputChange, signup }) => {
    return (
        <>

            <Form className="form mr-auto ml-auto rounded border p-5 w-100 mb-4">
                <Row>
                    <Col xs={6}>
                        <Form.Group >
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" value={formData.email ? formData.email : ''} onChange={handleInputChange} id="Email" type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">xxx@yy.zz</Form.Text>
                        </Form.Group>
                       
                        <Form.Group >
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" value={formData.password ? formData.password : ''} onChange={handleInputChange} id="Password" type="password" />
                            <Form.Text className="text-muted">Choose a strong password</Form.Text>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control name="phoneNumber" value={formData.phoneNumber ? formData.phoneNumber : ''} onChange={handleInputChange} id="phone" type="number" />
                            <Form.Text className="text-muted">Choose a strong password</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group >
                            <Form.Label>First name</Form.Label>
                            <Form.Control name="firstname" value={formData.firstname ? formData.firstname : ''} onChange={handleInputChange} id="firstname" type="text" />
                            <Form.Text className="text-muted">Choose a strong password</Form.Text>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Last name</Form.Label>
                            <Form.Control name="lastname" value={formData.lastname ? formData.lastname : ''} onChange={handleInputChange} id="lastname" type="text" />
                            <Form.Text className="text-muted">Choose a strong password</Form.Text>
                        </Form.Group>
<Form.Group className="py-4">
                        <Button className="gen-btn my-2" style={{width:"fit-content"}} onClick={() => signup(formData)}>Sign up</Button>
</Form.Group>
                    </Col>

                </Row>
                <div className="mr-auto ml-auto d-flex flex-column align-items-center">

                    <p className="py-3">Or sign up via:</p>
                    <SocialAuth/>
                </div>
            </Form>
        </>
    )
};
export default RegisterForm;