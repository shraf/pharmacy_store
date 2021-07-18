import React from "react";
import { FormControl,Col,InputGroup } from "react-bootstrap";
const ProfileInput = ({ caption, name, value, type,formData,handleInputChange }) => {
    return (
        <>
            <Col xs={12} className="m-2">
            <InputGroup>
                <span className="input-group-text">{caption}</span><FormControl  name={name} value={formData[name]||value} onChange={handleInputChange} type={type} />
                </InputGroup>
            </Col>

        </>
    )
}
export default ProfileInput;