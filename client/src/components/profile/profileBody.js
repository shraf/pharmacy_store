import React from 'react';
import { Row, Col,  Button } from 'react-bootstrap';
import ProfileInput from './profileInput';
import { connect } from 'react-redux';

const ProfileBody = ({ fields, doUpdate, formData, handleInputChange,id,dispatch }) => {
    return (
        <>
            <Row className="m-2">
                {fields.map(field => <ProfileInput formData={formData} handleInputChange={handleInputChange} type={field.type} caption={field.caption} name={field.name} value={field.value} />)}



            </Row>
            <Row className="pl-2">
                <Col xs={6} className="">
                    <Button variant="secondary" className="ml-4" onClick={()=>doUpdate(formData,id)}>

                        Save Changes
                    </Button>
                </Col>
                <Col xs={6} className="text-right">
                    <Button variant="secondary" className="mr-3"  >
                        Close
                    </Button>
                </Col>
            </Row>
        </>
    )
}
const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(ProfileBody);
