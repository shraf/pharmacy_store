import React, { useState, useRef } from 'react';
import { Modal, Form, Button, InputGroup } from "react-bootstrap";
const NewItemModal = ({ type, onSubmit, formData, onHide, update }) => {
    const [display, setDisplay] = useState("d-none");
    const formRef = useRef();
    const onClick = () => {
        const data = new FormData(formRef.current);
        if (type == "item")
            data.append("category", formData.category);
        onSubmit(data)
            .then(res => {
                onHide();
                update("add", { _id: res.data, name: data.get("name") })
            })
            .catch(err => {
                console.log(err);
                setDisplay("")
            });
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Add new {type}</Modal.Title>
            </Modal.Header>
            <Form className="p-3" ref={formRef}>
                <Form.Group className="py-3">
                    <p>{type} name</p>
                    <Form.Control type="text" name={`name`} />
                </Form.Group>

                {type == "item" ? (<><p>Price</p>
                    <Form.Control className="py-3" type="number" name={`price`} />
                    <InputGroup className="py-3">
                        <Form.Control as="textarea" name="discription" />
                    </InputGroup></>) : ""}

                <Form.Group>
                    <Form.File
                        type="file"
                        className="custom-file-label h-auto position-relative"
                        id="inputGroupFile01"
                        name={`file`}

                    />
                </Form.Group>
            </Form>
            <Modal.Footer>
                <Button variant="dark" className="mr-auto" onClick={onClick}>Submit</Button>
            </Modal.Footer>
            <div className={`err-msg ${display}`} onClick={() => setDisplay("d-none")} >
                <h2 className="h-100vh text-white" >Failed to add the item</h2>
            </div>
        </>
    )
}

export default NewItemModal;