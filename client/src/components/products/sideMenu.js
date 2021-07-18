import React from 'react';
import { Button, Form, FormControl, FormLabel } from "react-bootstrap";
import useForm from "../../hooks/useForm";
const SideMenu = ({ setQuery }) => {
    const { formData, handleInputChange } = useForm();

    return (
        <div>

            <div className="menu border p-3 m-3" >
                <Form style={{width:"100%"}}>
                    <FormLabel>Search by name</FormLabel>
                    <FormControl value={formData.search?formData.search:""} onChange={handleInputChange} name="search" type="search" />
                    <Button onClick={() => setQuery(formData.search||"")} variant="dark">Search</Button>
                </Form>
            </div>
        </div>
    )
}
export default SideMenu;