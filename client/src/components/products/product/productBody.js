import React from 'react';
import { Button, Col,Row } from "react-bootstrap";
import {FcCancel} from "react-icons/fc";
const ProductBody = ({ image, dispatchers, isAddedToCart }) => {
    const Btn = () => {
        return (isAddedToCart ?
            <Button onClick={dispatchers.remove} className="my-2" variant="success">Remove from cart <FcCancel/></Button>:
             <Button onClick={dispatchers.add} className="my-2" variant="dark">Add to cart</Button>);
    }

    return (<>
        <div className="p-2 m-5">
        <Row>
            <Col xs={12} style={{ height: "390px" }}>
                <img style={{ maxWidth: "490px", objectFit: "contain", height: "100%" }}
                    src={`data:image/jpeg;base64,${image}`} />
            </Col>
            <Col xs={12}>
        <Btn/>
        </Col>
        </Row>
        </div>
    </>
    )
}
export default ProductBody;