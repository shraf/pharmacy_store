import { FormControl, Modal,Button } from 'react-bootstrap';
import React from 'react';
import useForm from '../../hooks/useForm';

const NumberModal = ({ show, onSubmit }) => {
    const { formData, handleInputChange } = useForm();


    return (
        
        <>
            <Modal.Dialog hidden={!show} >

                <Modal.Header closeButton>
                    <Modal.Title>Enter your number</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Enter your number to complete register process</p>

                    <FormControl name="phone"
                     value={formData.phone ? formData.phone : ""} onChange={handleInputChange} />
                    <Button onClick={()=>onSubmit(formData.phone)}>Continue</Button>
                </Modal.Body>
            </Modal.Dialog>
        </>
    )
}
export default NumberModal;